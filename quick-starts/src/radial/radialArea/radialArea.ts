import { Canvas } from '../../canvas/canvas'
import { CurveFactory, curveLinear, areaRadial, Selection } from 'd3'
import { RadialAreaData } from './types'
import { Meta, getMeta } from './getMeta'

export interface QsRadialAreaConfig {
  [key: string]: CurveFactory | number | undefined | string
  curve?: CurveFactory
  x?: number
  y?: number
  color?: string
}

export interface QsRadialArea {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialAreaData) => void
}

export interface QsRadialAreaData {
  [key: string]: number[] | undefined
  outerData: number[]
  innerData?: number[]
}

interface RadialAreaConfigStrict {
  [key: string]: CurveFactory | number | undefined | string
  curve: CurveFactory
  x: number
  y: number
  color: string
}

interface DrawArgs {
  data: QsRadialAreaData
}

const addDefaultsToConfig = (
  customConfig?: QsRadialAreaConfig
): RadialAreaConfigStrict => {
  const defaults: RadialAreaConfigStrict = {
    curve: curveLinear,
    x: 50,
    y: 50,
    color: 'steelblue',
  }

  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const area = (
  canvas: Canvas,
  data: QsRadialAreaData,
  customConfig?: QsRadialAreaConfig
): QsRadialArea => {
  const config: RadialAreaConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
  }
  return draw(canvas, args, config)
}

export const radialAreaGenerator = {
  area,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAreaConfigStrict
): QsRadialArea => {
  const { outerData: dataOuter, innerData: dataInner } = args.data
  const { x, y, curve, color } = config
  const meta: Meta = getMeta(canvas, dataOuter, dataInner)

  const radialArea = areaRadial<RadialAreaData>()
    .angle((d) => d.angle)
    .outerRadius((d) => d.outer)
    .innerRadius((d) => d.inner)
    .curve(curve)

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', radialArea(meta.areaData))
    .attr('fill', color)
    .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
  return {
    element: group.selectAll('path'),
    transition: (data: QsRadialAreaData) => {
      const { innerData: dataInner, outerData: dataOuter } = data
      const meta = getMeta(canvas, dataOuter, dataInner)
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialArea(meta.areaData))
    },
  }
}
