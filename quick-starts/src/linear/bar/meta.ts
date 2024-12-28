import {
  scaleLinear,
  scaleBand,
  ScaleOrdinal,
  range,
  ScaleSequential,
} from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { MetaBarData, DrawArgs, QsBarConfigStrict, QsBarData } from './types'
import { Orientation } from '../../core/enums/enums'

import {
  getPrecidendedColor,
  getScaledColor,
  getColorScale,
} from '../../core/color/color'

export interface Meta {
  class: string
  id: string
  barData: MetaBarData
}

export const getMeta = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: QsBarConfigStrict
): Meta[] => {
  const { padding, defaultColor, colorScaleData } = config
  const { data, orientation } = args
  const isVertical = orientation === Orientation.VERTICAL
  const findLowerBoundry = (lowerBoundry: number | undefined) =>
    lowerBoundry !== undefined ? lowerBoundry : 0

  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaWidth,
    displayAreaHeight,
  } = canvas.config

  const meta: Meta[] = []

  const bandStepScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, isVertical ? displayAreaHeight : displayAreaWidth])
  const bandWidthScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, isVertical ? displayAreaHeight : displayAreaWidth])
    .padding(padding / 100)
  const heightScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, isVertical ? displayAreaWidth : displayAreaHeight])

  const height = (d: QsBarData) =>
    isVertical
      ? bandWidthScale.bandwidth()
      : heightScale(d.upperBoundry - d.lowerBoundry!)
  const width = (d: QsBarData) =>
    isVertical
      ? heightScale(d.upperBoundry - d.lowerBoundry!)
      : bandWidthScale.bandwidth()

  const x = (d: QsBarData, i: number) =>
    isVertical ? heightScale(d.lowerBoundry!) : barSpaceing(d, i)
  const y = (d: QsBarData, i: number) =>
    isVertical
      ? barSpaceing(d, i)
      : displayAreaHeight - heightScale(d.upperBoundry)

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

  console.log('colorScaleData', colorScaleData)
  if (colorScaleData) colorScale = getColorScale(colorScaleData)
  console.log('The color scale', colorScale)

  data.forEach((d, i) => {
    d.lowerBoundry = findLowerBoundry(d.lowerBoundry)
    const scaledColor: string | unknown | undefined = getScaledColor(
      d.upperBoundry - d.lowerBoundry!,
      colorScale
    )
    console.log('The scaled Color', scaledColor)
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
