import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  ScaleOrdinal,
  range,
  scaleSequential,
  interpolateRgbBasis,
  ColorCommonInstance,
  ScaleSequential,
} from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { BarData, DrawArgs, QsBarConfigStrict, QsBarArgs } from './types'
import { Orientation } from '../../core/enums'
import { QsEnumColorScale } from '../../core/qsEnums'
import { getScaledColor } from './getColour'

export interface Meta {
  class: string
  id: string
  barData: BarData
}

export const getMeta = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: QsBarConfigStrict
): Meta[] => {
  const { padding, color } = config
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

  const height = (d: QsBarArgs) =>
    isVertical
      ? bandWidthScale.bandwidth()
      : heightScale(d.upperBoundry - findLowerBoundry(d.lowerBoundry))
  const width = (d: QsBarArgs) =>
    isVertical
      ? heightScale(d.upperBoundry - findLowerBoundry(d.lowerBoundry))
      : bandWidthScale.bandwidth()

  const x = (d: QsBarArgs, i: number) =>
    isVertical
      ? heightScale(findLowerBoundry(d.lowerBoundry))
      : barSpaceing(d, i)
  const y = (d: QsBarArgs, i: number) =>
    isVertical
      ? barSpaceing(d, i)
      : displayAreaHeight - heightScale(d.upperBoundry)

  const barSpaceing = (d: QsBarArgs, i: number) => {
    const adjustmentToCorrectD3 =
      (bandStepScale.step() - bandWidthScale.bandwidth()) / 2
    //TODO requires error handling
    const bandStep = bandStepScale(i.toString())
    if (bandStep) return bandStep + adjustmentToCorrectD3
    return 0
  }

  const myrange: (string | ColorCommonInstance)[] = ['blue']
  interpolateRgbBasis(myrange)
  color.range
  color.domain

  let sequentialColorScale: ScaleSequential<string, never> | undefined
  let oridinalColorScale: ScaleOrdinal<string, unknown, never> | undefined

  const createSequentialColorScale = ():
    | ScaleSequential<string, never>
    | undefined => {
    const hasValues: boolean =
      color.range !== undefined && color.domain !== undefined
    if (
      typeof color.range !== 'string' &&
      typeof color.domain !== 'string' &&
      hasValues
    ) {
      return scaleSequential(color.domain, interpolateRgbBasis(color.range))
    }
  }

  const createOridinalColorScale = ():
    | ScaleOrdinal<string, unknown, never>
    | undefined => {
    if (color.range)
      return scaleOrdinal()
        .domain(toStrings(typeof color.domain !== 'string' ? color.domain : []))
        .range(color.range)
  }

  if (color.type === QsEnumColorScale.SEQUENTIAL) {
    sequentialColorScale = createSequentialColorScale()
  } else {
    oridinalColorScale = createOridinalColorScale()
  }

  data.forEach((d, i) => {
    const barData: BarData = {
      x: x(d, i),
      y: y(d, i),
      height: height(d),
      width: width(d),
      color: getScaledColor({
        data: d,
        color,
        sequentialColorScale,
        oridinalColorScale,
      }),
    }
    meta.push({
      class: 'bar',
      id: `bar-${uuidv4()}`,
      barData,
    })
  })
  return meta
}
