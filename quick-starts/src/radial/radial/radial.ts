import { Canvas } from '../../canvas/canvas'
import { range, schemePurples, Selection } from 'd3'

import { arc } from 'd3'
import { TweenedArcData, QsRadialArgs } from './types'
import { Meta, getMeta, QsRadialTransitionArgs } from './getMeta'

export { QsRadialArgs } from './types'
export { QsRadialTransitionArgs } from './getMeta'

export interface RadialConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  outerRadius?: number
  innerRadius?: number
  padAngle?: number
  cornerRadius?: number
  x?: number
  y?: number
  colorDomain?: string[] | number[]
  colorRange?: Iterable<unknown>
}

export interface QsRadial {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (
    data: QsRadialArgs[],
    transitionArgs: QsRadialTransitionArgs
  ) => void
}

interface RadialConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  outerRadius: number
  innerRadius: number
  padAngle: number
  cornerRadius: number
  x: number
  y: number
  colorDomain: string[] | number[]
  colorRange: Iterable<unknown>
}

interface DrawArgs {
  data: QsRadialArgs[]
  pie: boolean
}

const updateConfig = (customConfig?: RadialConfig): RadialConfigStrict => {
  const defaults: RadialConfigStrict = {
    outerRadius: 100,
    innerRadius: 50,
    padAngle: 0,
    cornerRadius: 0,
    x: 50,
    y: 50,
    colorDomain: range(4),
    colorRange: schemePurples[4],
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const pie = (
  canvas: Canvas,
  data: QsRadialArgs[],
  customConfig?: RadialConfig
): QsRadial => {
  const args: DrawArgs = { data, pie: true }
  const config: RadialConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const doughnut = (
  canvas: Canvas,
  data: QsRadialArgs[],
  customConfig?: RadialConfig
): QsRadial => {
  const args: DrawArgs = { data, pie: false }
  const config: RadialConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const radialGenerator = {
  pie,
  doughnut,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialConfigStrict
): QsRadial => {
  const { data, pie } = args
  const {
    outerRadius,
    innerRadius,
    padAngle,
    cornerRadius,
    x,
    y,
    colorDomain,
    colorRange,
  } = config

  const transitionArgs: QsRadialTransitionArgs = {
    colorDomain,
    colorRange,
    outerRadius,
    innerRadius,
    cornerRadius,
    padAngle,
    isPieDiagram: pie,
    x,
    y,
  }

  const meta: Meta[] = getMeta(canvas, data, transitionArgs)

  const path = arc<TweenedArcData>()
    .cornerRadius((d) => d.cornerRadius)
    .outerRadius((d) => d.outerRadius)
    .innerRadius((d) => d.innerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)
  const group = canvas.displayGroup.append('g')

  const interpolate = (
    d: TweenedArcData,
    t: number,
    minimise: boolean
  ): string | null => {
    t = minimise ? 1 - t : t
    const tweenedData: TweenedArcData = {
      data: d.data,
      cornerRadius: t * d.cornerRadius,
      outerRadius: t * d.outerRadius,
      innerRadius: t * d.innerRadius,
      startAngle: d.startAngle,
      endAngle: d.endAngle,
    }
    return path(tweenedData)
  }

  group
    .selectAll('.arc')
    .data(meta)
    .enter()
    .append('path')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('stroke', 'none')
    .attr('transform', (d) => `translate(${d.xAxis(x)}, ${d.yAxis(y)})`)
    .attr('d', (d) => path(d.arcData))
    .attr('fill', (d) => d.arcData.color)

  return {
    element: group.selectAll('.arc'),
    transition: (
      data: QsRadialArgs[],
      transitionArgs: QsRadialTransitionArgs
    ) => {
      const meta: Meta[] = getMeta(canvas, data, transitionArgs)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .tween('d', (d) => (t) => interpolate(d.arcData, t, true))
    },
  }
}
