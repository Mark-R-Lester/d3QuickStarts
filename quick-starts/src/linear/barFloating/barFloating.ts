import { Selection, range } from 'd3'
import { Canvas } from '../../d3QuickStart'

import { getMeta, Meta } from './getMeta'
import { QsBarFloatingConfigStrict } from './types'

export interface QsBarFloatingConfig {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding?: number
  colorDomain?: number[]
  colorRange?: Iterable<unknown>
}

export interface QsBarsFloating {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transitionVertical: (data: number[][]) => void
  transitionHorizontal: (data: number[][]) => void
}

interface DrawArgs {
  data: number[][]
  vertical: boolean
}

const updateConfig = (
  customConfig?: QsBarFloatingConfig
): QsBarFloatingConfigStrict => {
  const defauls: QsBarFloatingConfigStrict = {
    padding: 8,
    colorDomain: range(4),
    colorRange: ['purple'],
  }
  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}
const horizontal = (
  canvas: Canvas,
  data: number[][],
  customConfig?: QsBarFloatingConfig
): QsBarsFloating => {
  const args: DrawArgs = { data, vertical: false }
  const config: QsBarFloatingConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: Canvas,
  data: number[][],
  customConfig?: QsBarFloatingConfig
): QsBarsFloating => {
  const args: DrawArgs = { data, vertical: true }
  const config: QsBarFloatingConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearBarFloatingGenerator = {
  horizontal,
  vertical,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: QsBarFloatingConfigStrict
): QsBarsFloating => {
  const { data, vertical } = args

  const meta: Meta[] = getMeta(canvas, data, config, vertical)

  const group: Selection<SVGGElement, unknown, HTMLElement, any> =
    canvas.displayGroup.append('g')
  group
    .selectAll('.bar')
    .data(meta)
    .enter()
    .append('rect')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('x', (d) => d.barData.x)
    .attr('y', (d) => d.barData.y)
    .attr('width', (d) => d.barData.width)
    .attr('height', (d) => d.barData.height)
    .attr('fill', (d) => d.barData.color)
  return {
    element: group.selectAll(`.${meta[0].class}`),
    transitionHorizontal: (data: number[][]) => {
      const meta: Meta[] = getMeta(canvas, data, config, true)

      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('width', (d) => d.barData.height)
        .attr('x', (d) => d.barData.y)
    },
    transitionVertical: (data: number[][]) => {
      const meta: Meta[] = getMeta(canvas, data, config, false)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
    },
  }
}
