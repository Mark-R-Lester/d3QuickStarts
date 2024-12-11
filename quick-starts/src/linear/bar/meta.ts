import { scaleLinear, scaleBand, scaleOrdinal, ScaleOrdinal, range } from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { BarData, DrawArgs, QsBarConfigStrict, QsBarBoundries } from './types'
import { Orientation } from '../../core/enums'

export interface Meta {
  class: string
  id: string
  barData: BarData
}

const getColor = (
  i: number,
  colorScale: ScaleOrdinal<string, unknown, never>
): string => {
  let c: string | unknown = colorScale(i.toString())
  //TODO if c is not a string throw.
  return typeof c == 'string' ? c : '#cbc9e2'
}

export const getMeta = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: QsBarConfigStrict
): Meta[] => {
  const { padding, colorDomain, colorRange } = config
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

  const colors = scaleOrdinal().domain(toStrings(colorDomain)).range(colorRange)
  const height = (d: QsBarBoundries) =>
    isVertical
      ? bandWidthScale.bandwidth()
      : heightScale(d.upperBoundry - findLowerBoundry(d.lowerBoundry))
  const width = (d: QsBarBoundries) =>
    isVertical
      ? heightScale(d.upperBoundry - findLowerBoundry(d.lowerBoundry))
      : bandWidthScale.bandwidth()

  const x = (d: QsBarBoundries, i: number) =>
    isVertical
      ? heightScale(findLowerBoundry(d.lowerBoundry))
      : barSpaceing(d, i)
  const y = (d: QsBarBoundries, i: number) =>
    isVertical
      ? barSpaceing(d, i)
      : displayAreaHeight - heightScale(d.upperBoundry)

  const barSpaceing = (d: QsBarBoundries, i: number) => {
    const adjustmentToCorrectD3 =
      (bandStepScale.step() - bandWidthScale.bandwidth()) / 2
    //TODO requires error handling
    const bandStep = bandStepScale(i.toString())
    if (bandStep) return bandStep + adjustmentToCorrectD3
    return 0
  }

  data.forEach((d, i) => {
    const barData: BarData = {
      x: x(d, i),
      y: y(d, i),
      height: height(d),
      width: width(d),
      color: getColor(i, colors),
    }
    meta.push({
      class: 'bar',
      id: `bar-${uuidv4()}`,
      barData,
    })
  })
  return meta
}
