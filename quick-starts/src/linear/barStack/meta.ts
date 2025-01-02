import { scaleBand, scaleOrdinal, range, stack, ScaleOrdinal, Series } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { BarData, BarStackedConfigStrict } from './types'

export interface Meta {
  groupId: string
  stackClass: string
  barData: BarData[]
}

export const getMeta = (
  canvas: Canvas,
  data: number[][],
  config: BarStackedConfigStrict
): Meta[] => {
  const { displayAreaWidth } = canvas.config
  const { yDataScale } = canvas.scales
  const { padding } = config

  const meta: Meta[] = []

  const colors = scaleOrdinal()
    .domain(toStrings(range([...config.colorRange].length)))
    .range(config.colorRange)

  const xBandScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, displayAreaWidth])
    .paddingInner(padding / 200)
    .paddingOuter(padding / 200)

  const y = (d: number[]): number => yDataScale(d[1])
  const x = (inner: string): number => {
    //TODO requires error handling
    const bandVal = xBandScale(inner)
    if (bandVal) return bandVal
    return 0
  }

  const height = (d: number[]) => yDataScale(d[0]) - yDataScale(d[1])
  const width = () => xBandScale.bandwidth()

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
    const barIds = d.map(() => `${`barStacked${uuidv4()}`}`)
    const data: BarData[] = d.map((d, inner): BarData => {
      return {
        id: barIds[inner],
        class: `${'barStacked'}`,
        x: x(inner.toString()),
        y: y(d),
        height: height(d),
        width: width(),
        color: getColor(inner, colors),
      }
    })
    meta.push({
      groupId: `stack${outer}`,
      stackClass: `${'barStack'}`,
      barData: data,
    })
  })
  return meta
}
