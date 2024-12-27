import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  ScaleOrdinal,
  range,
  scaleSequential,
  interpolateRgbBasis,
  ScaleSequential,
} from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { MetaBarData, DrawArgs, QsBarConfigStrict, QsBarData } from './types'
import { Orientation } from '../../core/enums/enums'
import { QsEnumColorScale } from '../../core/enums/qsEnums'
import { getPrecidendedColor, getScaledColor } from '../../core/color/getColor'

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
  const { padding, defaultColor, colorScale } = config
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

  let sequentialColorScale: ScaleSequential<string, never> | undefined
  let ordinalColorScale: any | undefined

  const createSequentialColorScale = ():
    | ScaleSequential<string, never>
    | undefined => {
    if (colorScale) {
      return scaleSequential(
        colorScale.domain,
        interpolateRgbBasis(colorScale.range)
      )
    }
  }

  const createOridinalColorScale = ():
    | ScaleOrdinal<string, unknown, never>
    | undefined => {
    if (colorScale)
      return scaleOrdinal()
        .domain(toStrings(colorScale.domain))
        .range(colorScale.range)
  }

  if (colorScale && colorScale.type === QsEnumColorScale.SEQUENTIAL)
    sequentialColorScale = createSequentialColorScale()
  else ordinalColorScale = createOridinalColorScale()

  data.forEach((d, i) => {
    d.lowerBoundry = findLowerBoundry(d.lowerBoundry)
    const scaledColor: string | unknown | undefined = getScaledColor(
      d.upperBoundry - d.lowerBoundry!,
      sequentialColorScale,
      ordinalColorScale
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
