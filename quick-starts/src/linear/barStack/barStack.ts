import { schemePurples, Selection } from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { BarStackedConfigStrict } from './types'
import { Meta, getMeta } from './meta'

export interface QsBarStackedConfig {
  [key: string]: number | Iterable<String> | undefined
  padding?: number
  colorRange?: Iterable<String>
}

export interface QsBarStack {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[][]) => void
}

interface DrawArgs {
  data: number[][]
}

const addDefaultsToConfig = (
  customConfig?: QsBarStackedConfig
): BarStackedConfigStrict => {
  const defaults: BarStackedConfigStrict = {
    colorRange: schemePurples[4],
    padding: 20,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const stack = (
  canvas: QsCanvas,
  data: number[][],
  customConfig?: QsBarStackedConfig
): QsBarStack => {
  const config: BarStackedConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const qsLinearBarStackGenerator = {
  stack,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: BarStackedConfigStrict
): QsBarStack => {
  const { data } = args

  const meta: Meta[] = getMeta(canvas, data, config)

  const group = canvas.displayGroup.append('g')
  const barStacks = group
    .selectAll(`${'.barStack'}`)
    .data(meta)
    .enter()
    .append('g')
    .attr('class', (d) => d.stackClass)
    .attr('id', (d) => d.groupId)
    .attr('fill', (d, i) => d.barData[i].color)
  barStacks
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
    element: barStacks.selectAll(`${'.barStacked'}`),
    transition: (data: number[][]) => {
      const meta: Meta[] = getMeta(canvas, data, config)
      const bars = canvas.displayGroup.selectAll(`${'.barStack'}`).data(meta)
      bars
        .selectAll(`${'.barStacked'}`)
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
