import { Canvas } from '../../canvas/canvas'
import { range, Selection } from 'd3'
import { Meta, QsBarConfigStrict } from './types'
import { getMeta } from './getMeta'

export interface QsBarConfig {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding?: number
  colorDomain?: number[]
  colorRange?: Iterable<unknown>
}

export interface QsBars {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transitionHorizontal: (data: number[]) => void
  transitionVertical: (data: number[]) => void
}

interface DrawArgs {
  data: number[]
  horizontal: boolean
}

const updateConfig = (customConfig?: QsBarConfig): QsBarConfigStrict => {
  const defaults: QsBarConfigStrict = {
    padding: 8,
    colorDomain: range(4),
    colorRange: ['purple'],
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}
const vertical = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsBarConfig
): QsBars => {
  const args: DrawArgs = { data, horizontal: false }
  const config: QsBarConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontal = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsBarConfig
): QsBars => {
  const args: DrawArgs = { data, horizontal: true }
  const config: QsBarConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearBarGenerator = {
  horizontal,
  vertical,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: QsBarConfigStrict
): QsBars => {
  const { data, horizontal } = args

  const meta: Meta[] = getMeta(canvas, data, config, horizontal)

  const group = canvas.displayGroup.append('g')
  group
    .selectAll(`.${meta[0].class}`)
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
    transitionHorizontal: (data: number[]) => {
      const meta: Meta[] = getMeta(canvas, data, config, true)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(1000)
        .attr('width', (d) => d.barData.width)
        .attr('x', (d) => d.barData.x)
    },
    transitionVertical: (data: number[]) => {
      const meta: Meta[] = getMeta(canvas, data, config, false)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(1000)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
    },
  }
}
