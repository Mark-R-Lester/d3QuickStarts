import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  range,
  schemePurples,
  stack,
  ScaleOrdinal,
  Series,
  Selection,
} from 'd3'
import { Canvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { findMax, findMaxSum } from '../../core/max'

export interface QsBarGroupsConfig {
  [key: string]: number | Iterable<String> | undefined
  padding?: number
  colorRange?: Iterable<String>
}

export interface QsBarGroups {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[][]) => void
}

interface BarGroupConfigStrict {
  [key: string]: number | Iterable<String> | undefined
  padding: number
  colorRange: Iterable<String>
}

interface DrawArgs {
  data: number[][]
  grouped: boolean
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
}

const updateConfig = (
  customConfig?: QsBarGroupsConfig
): BarGroupConfigStrict => {
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
  customConfig?: QsBarGroupsConfig
): QsBarGroups => {
  const config: BarGroupConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data, grouped: true }
  return draw(canvas, args, config)
}

const stacked = (
  canvas: Canvas,
  data: number[][],
  customConfig?: QsBarGroupsConfig
): QsBarGroups => {
  const config: BarGroupConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data, grouped: false }
  return draw(canvas, args, config)
}

export const linearBarGroupGenerator = {
  grouped,
  stacked,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: BarGroupConfigStrict
): QsBarGroups => {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaWidth,
    displayAreaHeight,
  } = canvas.config
  const { padding } = config
  const { data, grouped } = args
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

  const yScale = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0
        ? highestViewableValue
        : grouped
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

  const getMeta = (data: number[][]): Meta[] => {
    const meta: Meta[] = []
    const stackedData: Series<{ [key: string]: number }, string>[] =
      stack().keys(data.map((d, i) => i.toString()))(
        data as Iterable<{ [key: string]: number }>
      )

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
      meta.push({
        groupId: `group${outer}`,
        groupClass: 'bargroup',
        barData: data,
      })
    })
    return meta
  }

  const meta: Meta[] = getMeta(data)

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
    .data((d) => d.barData)
    .enter()
    .append('rect')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('height', (d) => d.height)
    .attr('width', (d) => d.width)

  return {
    element: barGroups.selectAll('.bar'),
    transition: (data: number[][]) => {
      const meta: Meta[] = getMeta(data)
      const bars = canvas.displayGroup.selectAll('.bargroup').data(meta)
      bars
        .selectAll('.bar')
        .data((d) => d.barData)
        .attr('x', (d) => d.x)
        .attr('width', (d) => d.width)
        .transition()
        .duration(3000)
        .attr('y', (d) => d.y)
        .attr('height', (d) => d.height)
    },
  }
}
