import { schemePurples, Selection } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { BarData, BarGroupConfigStrict } from './types'
import { getMeta } from './getMeta'
import { Grouping } from '../../core/enums'

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

interface DrawArgs {
  data: number[][]
  grouping: Grouping
}

interface Meta {
  groupId: string
  groupClass: string
  barData: BarData[]
}

const addDefaultsToConfig = (
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
  const config: BarGroupConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data, grouping: Grouping.GROUPED }
  return draw(canvas, args, config)
}

const stacked = (
  canvas: Canvas,
  data: number[][],
  customConfig?: QsBarGroupsConfig
): QsBarGroups => {
  const config: BarGroupConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data, grouping: Grouping.STACKED }
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
  const { data, grouping } = args

  const meta: Meta[] = getMeta(canvas, data, config, grouping)

  const group = canvas.displayGroup.append('g')
  const barGroups = group
    .selectAll('.bargroup')
    .data(meta)
    .enter()
    .append('g')
    .attr('class', (d) => d.groupClass)
    .attr('id', (d) => d.groupId)
    .attr('fill', (d, i) => d.barData[i].color)
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
      const meta: Meta[] = getMeta(canvas, data, config, grouping)
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
