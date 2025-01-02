import { lineRadial } from 'd3'
import { Meta, getMeta } from './meta'
import { Canvas } from '../../d3QuickStart'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'
import { applyDefaultColorIfNeeded } from '../../core/color/color'
import {
  QsRadialLineConfig,
  QsRadialLine,
  QsRadialLineTransitionData,
  QsRadialLineData,
} from './qsTypes'

interface RadialLineConfigStrict {
  [key: string]: number | QsEnumCurve | undefined
  x: number
  y: number
  curve: QsEnumCurve
}

interface DrawArgs {
  data: QsRadialLineData
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
  canvas: Canvas,
  data: QsRadialLineData,
  customConfig?: QsRadialLineConfig
): QsRadialLine => {
  const config: RadialLineConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const radialLine = {
  line,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialLineConfigStrict
): QsRadialLine => {
  const { x, y, curve } = config
  const { color } = args.data
  const meta: Meta = getMeta(canvas, args.data)

  const radialLine = lineRadial().curve(constantsCurves[curve])
  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', radialLine(meta.lineData))
    .attr('fill', 'none')
    .attr('stroke', applyDefaultColorIfNeeded({ color }))
    .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
  return {
    element: group.selectAll(`.${meta.class}`),
    transition: (data: QsRadialLineTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const meta: Meta = getMeta(canvas, data.data)
      const { color: newColor } = data.data
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', radialLine(meta.lineData))
        .attr('stroke', applyDefaultColorIfNeeded({ color, newColor }))
    },
  }
}
