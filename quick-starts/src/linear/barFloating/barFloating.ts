import { Selection, range } from 'd3'
import { QsCanvas } from '../../d3QuickStart'

import { getMeta, Meta } from './getMeta'
import { DrawArgs, QsBarFloatingConfigStrict } from './types'
import { Orientation } from '../../core/enums'

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
  transition: (data: number[][]) => void
}

const addDefaultsToConfig = (
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
  canvas: QsCanvas,
  data: number[][],
  customConfig?: QsBarFloatingConfig
): QsBarsFloating => {
  const args: DrawArgs = { data, orientation: Orientation.HORIZONTAL }
  const config: QsBarFloatingConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: QsCanvas,
  data: number[][],
  customConfig?: QsBarFloatingConfig
): QsBarsFloating => {
  const args: DrawArgs = { data, orientation: Orientation.VERTICAL }
  const config: QsBarFloatingConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearBarFloatingGenerator = {
  horizontal,
  vertical,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: QsBarFloatingConfigStrict
): QsBarsFloating => {
  const { orientation } = args
  const meta: Meta[] = getMeta(canvas, args, config)

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

  const transition = (data: number[][]) => {
    const args: DrawArgs = { data, orientation }
    const meta: Meta[] = getMeta(canvas, args, config)
    if (orientation === Orientation.VERTICAL)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('width', (d) => d.barData.width)
        .attr('x', (d) => d.barData.x)
    else
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
  }
  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: number[][]) => transition(data),
  }
}
