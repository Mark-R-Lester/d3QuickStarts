import { line } from 'd3'
import { Meta, getMeta } from './meta'
import { Canvas } from '../../d3QuickStart'
import {
  QsRadialSpokesConfig,
  QsRadialSpokes,
  QsRadialSpokesTransitionArgs,
} from './qsTypes'

interface RadialSpokesConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  innerRadius: number
  x: number
  y: number
  color: string
  strokeWidth: number
}

interface DrawArgs {
  data: number
}

const addDefaultsToConfig = (
  customConfig?: QsRadialSpokesConfig
): RadialSpokesConfigStrict => {
  const defaults: RadialSpokesConfigStrict = {
    radius: 100,
    innerRadius: 0,
    x: 50,
    y: 50,
    color: 'black',
    strokeWidth: 0.4,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const spokes = (
  canvas: Canvas,
  data: number,
  customConfig?: QsRadialSpokesConfig
): QsRadialSpokes => {
  const config: RadialSpokesConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const qsRadialSpokesGenerator = {
  spokes,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialSpokesConfigStrict
): QsRadialSpokes => {
  const { radius, innerRadius, x, y, color, strokeWidth } = config

  const { data } = args
  const transitionArgs: QsRadialSpokesTransitionArgs = {
    radius,
    innerRadius,
    x,
    y,
  }

  const meta: Meta[] = getMeta(canvas, data, transitionArgs)

  const radialLine = line()
    .x((d) => d[0])
    .y((d) => d[1])

  const group = canvas.displayGroup.append('g')
  group
    .selectAll('path')
    .data(meta)
    .enter()
    .append('path')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('d', (d) => radialLine(d.lineData))
    .attr('stroke', color)
    .attr('fill-opacity', '0')
    .attr('stroke-width', strokeWidth)

  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: number) => {
      const meta: Meta[] = getMeta(canvas, data, transitionArgs)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta.map((d) => d.lineData))
        .transition()
        .duration(3000)
        .attr('d', radialLine)
    },
  }
}
