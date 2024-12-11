import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  range,
  stack,
  ScaleOrdinal,
  Series,
} from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { BarData, BarGroupConfigStrict } from './types'

export interface Meta {
  groupId: string
  groupClass: string
  barData: BarData[]
}

export const getMeta = (
  canvas: QsCanvas,
  data: number[][],
  config: BarGroupConfigStrict
): Meta[] => {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaWidth,
    displayAreaHeight,
  } = canvas.config
  const { padding } = config
  const meta: Meta[] = []

  const colors = scaleOrdinal()
    .domain(toStrings(range([...config.colorRange].length)))
    .range(config.colorRange)

  const yScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([displayAreaHeight, 0])

  const xBandScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, displayAreaWidth])
    .paddingInner(padding / 200)
    .paddingOuter(padding / 200)

  const y = (d: number[]): number => yScale(d[1] - d[0])
  const x = (outer: number, inner: string): number => {
    //TODO requires error handling
    const bandVal = xBandScale(inner)
    if (bandVal)
      return bandVal + (xBandScale.bandwidth() / data[0].length) * outer

    return 0
  }

  const height = (d: number[]) => yScale(0) - yScale(d[1] - d[0])
  const width = () => xBandScale.bandwidth() / data[0].length

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
    const barIds = d.map(() => `barGrouped${uuidv4()}`)
    const data: BarData[] = d.map((d, inner): BarData => {
      return {
        id: barIds[inner],
        class: 'barGrouped',
        x: x(outer, inner.toString()),
        y: y(d),
        height: height(d),
        width: width(),
        color: getColor(inner, colors),
      }
    })
    meta.push({
      groupId: `group${outer}`,
      groupClass: 'barGroup',
      barData: data,
    })
  })
  return meta
}
