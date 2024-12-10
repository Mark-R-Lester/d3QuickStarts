import { QsCanvas } from '../../canvas/canvas'
import { arc as d3arc, Selection } from 'd3'
import { Meta, QsRadialAxisTransitionArgs, getMeta } from './getMeta'

export { QsRadialAxisTransitionArgs } from './getMeta'

export interface QsRadialAxisConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
  fontSize?: number
  x?: number
  y?: number
  axisAngle?: number
  gap?: number
  colour?: string
  strokeWidth?: number
}

export interface QsRadialAxis {
  textElement:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  ringsElement:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (
    data: number[],
    radialAxisTransitionArgs: QsRadialAxisTransitionArgs
  ) => void
}

interface RadialAxisConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  fontSize: number
  x: number
  y: number
  axisAngle: number
  gap: number
  colour: string
  strokeWidth: number
}

interface DrawArgs {
  data: number[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialAxisConfig
): RadialAxisConfigStrict => {
  const defaults: RadialAxisConfigStrict = {
    radius: 100,
    fontSize: 4,
    x: 50,
    y: 50,
    axisAngle: 0,
    gap: 15,
    colour: 'black',
    strokeWidth: 0.3,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const rings = (
  canvas: QsCanvas,
  data: number[],
  customConfig?: QsRadialAxisConfig
): QsRadialAxis => {
  const config: RadialAxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const radialAxisGenerator = {
  rings,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: RadialAxisConfigStrict
): QsRadialAxis => {
  const { radius, fontSize, x, y, axisAngle, gap, colour, strokeWidth } = config
  const { data } = args

  const radialAxisTransitionArgs: QsRadialAxisTransitionArgs = {
    radius,
    axisAngle,
    gap,
  }

  const meta: Meta[] = getMeta(canvas, data, radialAxisTransitionArgs)

  const arc = d3arc()
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)
  const group = canvas.displayGroup.append('g')
  group
    .selectAll(`.${meta[0].ringClass}`)
    .data(meta)
    .enter()
    .append('path')
    .attr('class', (d) => d.ringClass)
    .attr('id', (d) => d.ringId)
    .attr('d', (d) => arc(d.ringData))
    .attr('stroke', colour)
    .attr('stroke-width', strokeWidth)
    .attr('transform', (d) => `translate(${d.xAxis(x)}, ${d.yAxis(y)})`)
  group
    .selectAll('text')
    .data(meta)
    .enter()
    .append('text')
    .attr('class', (d) => d.textClass)
    .attr('id', (d) => d.textId)
    .attr('fill', colour)
    .attr('font-size', (d) => `${d.yAxis(fontSize)}px`)
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .attr(
      'transform',
      (d) => `translate(${d.ringData.textLocation})rotate(${0})`
    )
    .text((d) => d.ringData.text)

  return {
    textElement: group.selectAll('text'),
    ringsElement: group.selectAll('ring'),
    transition: (
      data: number[],
      radialAxisTransitionArgs: QsRadialAxisTransitionArgs
    ) => {
      const meta: Meta[] = getMeta(canvas, data, radialAxisTransitionArgs)
      group
        .selectAll(`.${meta[0].ringClass}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('stroke-width', strokeWidth)
        .attr('d', (d) => arc(d.ringData))
      group
        .selectAll(`.${meta[0].textClass}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('font-size', (d) => `${d.yAxis(fontSize)}px`)
        .attr('transform', (d) => {
          return `translate(${d.ringData.textLocation})`
        })
    },
  }
}
