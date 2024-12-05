import { Canvas } from '../../canvas/canvas'
import { CurveFactory, curveLinear, areaRadial, Selection } from 'd3'
import { RadialAreaData } from './types'
import { Meta, getMeta } from './getMeta'

export interface QsRadialAreaConfig {
  [key: string]: CurveFactory | number | undefined
  curve?: CurveFactory
  x?: number
  y?: number
}

export interface QsRadialArea {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialAreaArgs) => void
}

export interface QsRadialAreaArgs {
  [key: string]: number[] | undefined
  dataOuter: number[]
  dataInner?: number[]
}

interface RadialAreaConfigStrict {
  [key: string]: CurveFactory | number | undefined
  curve: CurveFactory
  x: number
  y: number
}

interface DrawArgs {
  dataOuter: number[]
  dataInner?: number[]
}

const updateConfig = (
  customConfig?: QsRadialAreaConfig
): RadialAreaConfigStrict => {
  const defaults: RadialAreaConfigStrict = {
    curve: curveLinear,
    x: 50,
    y: 50,
  }

  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const area = (
  canvas: Canvas,
  data: QsRadialAreaArgs,
  customConfig?: QsRadialAreaConfig
): QsRadialArea => {
  const config: RadialAreaConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    dataOuter: data.dataOuter,
    dataInner: data.dataInner,
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
  const { dataOuter, dataInner } = args
  const { x, y, curve } = config
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
    .attr('fill', 'red')
    .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
  return {
    element: group.selectAll('path'),
    transition: (args: QsRadialAreaArgs) => {
      const { dataInner, dataOuter } = args
      const meta = getMeta(canvas, dataOuter, dataInner)
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialArea(meta.areaData))
    },
  }
}
