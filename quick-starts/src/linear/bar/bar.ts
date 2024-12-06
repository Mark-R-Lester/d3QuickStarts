import { Canvas } from '../../canvas/canvas'
import { range, Selection } from 'd3'
import { Meta, QsBarConfigStrict, DrawArgs } from './types'
import { getMeta } from './getMeta'
import { Orientation } from '../../core/enums'

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
  transition: (data: number[]) => void
}

const addDefaultsToConfig = (customConfig?: QsBarConfig): QsBarConfigStrict => {
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
  const args: DrawArgs = { data, orientation: Orientation.VERTICAL }
  const config: QsBarConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontal = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsBarConfig
): QsBars => {
  const args: DrawArgs = { data, orientation: Orientation.HORIZONTAL }
  const config: QsBarConfigStrict = addDefaultsToConfig(customConfig)
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
  const { data, orientation: orientation } = args

  const meta: Meta[] = getMeta(canvas, args, config)

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

  const transition = (data: number[]) => {
    const args: DrawArgs = { data, orientation }
    const meta: Meta[] = getMeta(canvas, args, config)
    group.selectAll(`.${meta[0].class}`).data(meta).transition().duration(1000)
    if (orientation === Orientation.VERTICAL) {
      console.log('----------------------------')
      console.log('bar transition horizontal', data, orientation)
      console.log('bar transition horizontal', meta)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(1000)
        .attr('width', (d) => d.barData.width)
        .attr('x', (d) => d.barData.x)
    } else {
      console.log('----------------------------')
      console.log('bar transition vertical', data, orientation)
      console.log('bar transition vertical', meta)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(1000)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
    }
  }

  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: number[]) => transition(data),
  }
}
