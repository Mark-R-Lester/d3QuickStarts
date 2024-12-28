import { QsCanvas } from '../../canvas/canvas'
import { curveLinear, lineRadial, Selection } from 'd3'
import { Meta, getMeta } from './meta'
import { QsTransitionArgs } from '../../d3QuickStart'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'

export interface QsRadialLineConfig {
  [key: string]: number | QsEnumCurve | undefined
  x?: number
  y?: number
  curve?: QsEnumCurve
}

export interface QsRadialLineTransitionData {
  data: number[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialLine {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialLineTransitionData) => void
}

interface RadialLineConfigStrict {
  [key: string]: number | QsEnumCurve | undefined
  x: number
  y: number
  curve: QsEnumCurve
}

interface DrawArgs {
  data: number[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialLineConfig
): RadialLineConfigStrict => {
  const defaults: RadialLineConfigStrict = {
    curve: QsEnumCurve.LINEAR,
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

  const radialLine = lineRadial().curve(constantsCurves[curve])
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
    transition: (data: QsRadialLineTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const meta: Meta = getMeta(canvas, data.data)
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', radialLine(meta.lineData))
    },
  }
}
