import { scaleBand, scaleOrdinal, range, stack, ScaleOrdinal, Series } from 'd3'
import { Canvas } from '../../core/canvas/canvas'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/math/conversion'
import { BarData, BarGroupConfig } from './types'

export interface CalculatedData {
  groupId: string
  barData: BarData[]
}

export const getCalculatedData = (
  canvas: Canvas,
  data: number[][],
  config: BarGroupConfig
): CalculatedData[] => {
  const { displayAreaWidth } = canvas.config
  const { yDataScale } = canvas.scales
  const { padding } = config
  const calculatedData: CalculatedData[] = []

  const colors = scaleOrdinal()
    .domain(toStrings(range([...config.colorRange].length)))
    .range(config.colorRange)

  const xBandScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, displayAreaWidth])
    .paddingInner(padding / 200)
    .paddingOuter(padding / 200)

  const y = (d: number[]): number => yDataScale(d[1] - d[0])
  const x = (outer: number, inner: string): number => {
    //TODO requires error handling
    const bandVal = xBandScale(inner)
    if (bandVal)
      return bandVal + (xBandScale.bandwidth() / data[0].length) * outer
    return 0
  }

  const height = (d: number[]) => yDataScale(0) - yDataScale(d[1] - d[0])
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
    data[0].map((d, i) => i.toString())
  )(data as Iterable<{ [key: string]: number }>)

  stackedData.forEach((d, outer) => {
    const barIds = d.map(() => `barGrouped${uuidv4()}`)
    const data: BarData[] = d.map((d, inner): BarData => {
      return {
        id: barIds[inner],
        x: x(outer, inner.toString()),
        y: y(d),
        height: height(d),
        width: width(),
        fillColor: getColor(inner, colors),
      }
    })
    calculatedData.push({
      groupId: `group${outer}`,
      barData: data,
    })
  })
  return calculatedData
}
