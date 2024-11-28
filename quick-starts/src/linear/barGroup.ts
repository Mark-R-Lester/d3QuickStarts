import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  range,
  schemePurples,
  stack,
  ScaleOrdinal,
  Series,
} from 'd3'
import { Canvas } from '../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../core/conversion'
import { findMax, findMaxSum } from '../core/max'

export interface BarGroupConfig {
  [key: string]: number | Iterable<String> | undefined
  padding?: number
  colorRange?: Iterable<String>
}

interface BarGroupConfigStrict {
  [key: string]: number | Iterable<String> | undefined
  padding: number
  colorRange: Iterable<String>
}

interface DrawArgs {
  data: number[][]
  grouped: boolean
  minimised: boolean
}

interface BarData {
  id: string
  class: string
  x: number
  y: number
  height: number
  width: number
}

interface Meta {
  groupId: string
  groupClass: string
  barData: BarData[]
  barDataMin: BarData[]
}

const updateConfig = (customConfig?: BarGroupConfig): BarGroupConfigStrict => {
  const defaults: BarGroupConfigStrict = {
    colorRange: schemePurples[4],
    padding: 20,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const grouped = (
  canvas: Canvas,
  data: number[][],
  customConfig?: BarGroupConfig
) => {
  const config: BarGroupConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data, grouped: true, minimised: false }
  return draw(canvas, args, config)
}

const stacked = (
  canvas: Canvas,
  data: number[][],
  customConfig?: BarGroupConfig
) => {
  const config: BarGroupConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data, grouped: false, minimised: false }
  return draw(canvas, args, config)
}

export const linearBarGroupGenerator = {
  grouped,
  stacked,
}

const draw = (canvas: Canvas, args: DrawArgs, config: BarGroupConfigStrict) => {
  const { min, max, displayAreaWidth, displayAreaHeight } = canvas.config
  const { padding } = config
  const { data, grouped, minimised } = args
  const colors = scaleOrdinal()
    .domain(toStrings(range([...config.colorRange].length)))
    .range(config.colorRange)

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

  const meta: Meta[] = []

  const yScale = scaleLinear()
    .domain([min, max !== 0 ? max : grouped ? findMax(data) : findMaxSum(data)])
    .range([displayAreaHeight, 0])

  const xBandScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, displayAreaWidth])
    .paddingInner(padding / 200)
    .paddingOuter(padding / 200)

  const y = (d: number[]): number =>
    grouped ? yScale(d[1] - d[0]) : yScale(d[1])
  const x = (outer: number, inner: string): number => {
    //TODO requires error handling
    const bandVal = xBandScale(inner)
    if (bandVal)
      return grouped
        ? bandVal + (xBandScale.bandwidth() / data[0].length) * outer
        : bandVal
    return 0
  }

  const height = (d: number[]) =>
    grouped ? yScale(0) - yScale(d[1] - d[0]) : yScale(d[0]) - yScale(d[1])
  const width = () =>
    grouped ? xBandScale.bandwidth() / data[0].length : xBandScale.bandwidth()

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
      }
    })
    const dataMin: BarData[] = d.map((d, inner): BarData => {
      return {
        id: barIds[inner],
        class: 'bar',
        x: x(outer, inner.toString()),
        y: yScale(0),
        height: 0,
        width: width(),
      }
    })
    meta.push({
      groupId: `group${outer}`,
      groupClass: 'bargroup',
      barData: data,
      barDataMin: dataMin,
    })
  })

  const group = canvas.displayGroup.append('g')
  const barGroups = group
    .selectAll('.bargroup')
    .data(meta)
    .enter()
    .append('g')
    .attr('class', (d) => d.groupClass)
    .attr('id', (d) => d.groupId)
    .attr('fill', (d, i) => getColor(i, colors))
  barGroups
    .selectAll('rect')
    .data((d) => (minimised ? d.barDataMin : d.barData))
    .enter()
    .append('rect')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('height', (d) => d.height)
    .attr('width', (d) => d.width)

  return {
    bars: barGroups.selectAll('.bar'),
    barGroups,
    group,
    meta,
    minimise: () => {
      const bars = canvas.displayGroup.selectAll('.bargroup').data(meta)
      bars
        .selectAll('.bar')
        .data((d) => d.barDataMin)
        .attr('x', (d) => d.x)
        .attr('width', (d) => d.width)
        .transition()
        .duration(3000)
        .attr('y', (d) => d.y)
        .attr('height', (d) => d.height)
    },
  }
}
