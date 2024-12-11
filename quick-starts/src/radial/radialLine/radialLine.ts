import { QsCanvas } from '../../canvas/canvas'
import { curveLinear, CurveFactory, lineRadial, Selection } from 'd3'
import { Meta, getMeta } from './meta'

export interface QsRadialLineConfig {
  [key: string]: number | CurveFactory | undefined
  x?: number
  y?: number
  curve?: CurveFactory
}

export interface QsRadialLine {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[]) => void
}

interface RadialLineConfigStrict {
  [key: string]: number | CurveFactory | undefined
  x: number
  y: number
  curve: CurveFactory
}

interface DrawArgs {
  data: number[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialLineConfig
): RadialLineConfigStrict => {
  const defaults: RadialLineConfigStrict = {
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

const line = (
  canvas: QsCanvas,
  data: number[],
  customConfig?: QsRadialLineConfig
): QsRadialLine => {
  const config: RadialLineConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const qsRadialLineGenerator = {
  line,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: RadialLineConfigStrict
): QsRadialLine => {
  const { x, y, curve } = config
  const { data } = args

  const meta: Meta = getMeta(canvas, data)

  const radialLine = lineRadial().curve(curve)
  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', radialLine(meta.lineData))
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
  return {
    element: group.selectAll(`.${meta.class}`),
    transition: (data: number[]) => {
      const meta: Meta = getMeta(canvas, data)
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialLine(meta.lineData))
    },
  }
}
