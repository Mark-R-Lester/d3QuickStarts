import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  range,
  stack,
  ScaleOrdinal,
  Series,
} from 'd3'
import { Canvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { findMax, findMaxSum } from '../../core/max'
import { BarData, BarGroupConfigStrict } from './types'
import { Grouping } from '../../core/enums'

export interface Meta {
  groupId: string
  groupClass: string
  barData: BarData[]
}

export const getMeta = (
  canvas: Canvas,
  data: number[][],
  config: BarGroupConfigStrict,
  grouping: Grouping
): Meta[] => {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaWidth,
    displayAreaHeight,
  } = canvas.config
  const { padding } = config
  const isGrouped = grouping === Grouping.GROUPED

  const meta: Meta[] = []

  const colors = scaleOrdinal()
    .domain(toStrings(range([...config.colorRange].length)))
    .range(config.colorRange)

  const yScale = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0
        ? highestViewableValue
        : isGrouped
          ? findMax(data)
          : findMaxSum(data),
    ])
    .range([displayAreaHeight, 0])

  const xBandScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, displayAreaWidth])
    .paddingInner(padding / 200)
    .paddingOuter(padding / 200)

  const y = (d: number[]): number =>
    isGrouped ? yScale(d[1] - d[0]) : yScale(d[1])
  const x = (outer: number, inner: string): number => {
    //TODO requires error handling
    const bandVal = xBandScale(inner)
    if (bandVal)
      return isGrouped
        ? bandVal + (xBandScale.bandwidth() / data[0].length) * outer
        : bandVal
    return 0
  }

  const height = (d: number[]) =>
    isGrouped ? yScale(0) - yScale(d[1] - d[0]) : yScale(d[0]) - yScale(d[1])
  const width = () =>
    isGrouped ? xBandScale.bandwidth() / data[0].length : xBandScale.bandwidth()

  const getColor = (
    i: number,
    colorScale: ScaleOrdinal<string, unknown, never>
  ): string => {
    let c: string | unknown = colorScale(i.toString())
    //TODO if c is not a string throw.
    return typeof c == 'string' ? c : '#cbc9e2'
  }

  const stackedData: Series<{ [key: string]: number }, string>[] = stack().keys(
    data.map((d, i) => i.toString())
  )(data as Iterable<{ [key: string]: number }>)

  stackedData.forEach((d, outer) => {
    const barIds = d.map(() => `bar${uuidv4()}`)
    const data: BarData[] = d.map((d, inner): BarData => {
      return {
        id: barIds[inner],
        class: 'bar',
        x: x(outer, inner.toString()),
        y: y(d),
        height: height(d),
        width: width(),
        color: getColor(inner, colors),
      }
    })
    meta.push({
      groupId: `group${outer}`,
      groupClass: 'bargroup',
      barData: data,
    })
  })
  return meta
}
