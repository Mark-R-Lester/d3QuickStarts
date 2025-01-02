import { scaleBand, ScaleOrdinal, range, ScaleSequential } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { MetaBarData, DrawArgs } from './types'
import { Orientation } from '../../core/enums/enums'

import {
  getPrecidendedColor,
  getScaledColor,
  getColorScale,
} from '../../core/color/color'
import { QsBarConfigStrict, QsBarData } from './qsTypes'

export interface Meta {
  class: string
  id: string
  barData: MetaBarData
}

export const getMeta = (
  canvas: Canvas,
  args: DrawArgs,
  config: QsBarConfigStrict
): Meta[] => {
  const { padding, defaultColor, colorScaleData } = config
  const { data, orientation } = args
  const isVertical = orientation === Orientation.VERTICAL
  const findLowerBoundry = (lowerBoundry: number | undefined) =>
    lowerBoundry !== undefined ? lowerBoundry : 0

  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const { xDataScale, yDataScaleInverted } = canvas.scales
  const meta: Meta[] = []

  const bandStepScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, isVertical ? displayAreaHeight : displayAreaWidth])
  const bandWidthScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, isVertical ? displayAreaHeight : displayAreaWidth])
    .padding(padding / 100)

  const height = (d: QsBarData) =>
    isVertical
      ? bandWidthScale.bandwidth()
      : yDataScaleInverted(d.upperBoundry - d.lowerBoundry!)
  const width = (d: QsBarData) =>
    isVertical
      ? xDataScale(d.upperBoundry - d.lowerBoundry!)
      : bandWidthScale.bandwidth()

  const x = (d: QsBarData, i: number) =>
    isVertical ? xDataScale(d.lowerBoundry!) : barSpaceing(d, i)
  const y = (d: QsBarData, i: number) =>
    isVertical
      ? barSpaceing(d, i)
      : displayAreaHeight - yDataScaleInverted(d.upperBoundry)

  const barSpaceing = (d: QsBarData, i: number) => {
    const adjustmentToCorrectD3 =
      (bandStepScale.step() - bandWidthScale.bandwidth()) / 2
    //TODO requires error handling
    const bandStep = bandStepScale(i.toString())
    if (bandStep) return bandStep + adjustmentToCorrectD3
    return 0
  }

  let colorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (colorScaleData) colorScale = getColorScale(colorScaleData)

  data.forEach((d, i) => {
    d.lowerBoundry = findLowerBoundry(d.lowerBoundry)
    const scaledColor: string | unknown | undefined = getScaledColor(
      d.upperBoundry - d.lowerBoundry!,
      colorScale
    )

    const barData: MetaBarData = {
      x: x(d, i),
      y: y(d, i),
      height: height(d),
      width: width(d),
      color: getPrecidendedColor(d.color, defaultColor, scaledColor),
    }
    meta.push({
      class: 'bar',
      id: `bar-${uuidv4()}`,
      barData,
    })
  })
  return meta
}
