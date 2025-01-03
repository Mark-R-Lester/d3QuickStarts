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
import { RadialLineConfigStrict } from './types'

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

export const radialLine = {
  line: (
    canvas: Canvas,
    data: QsRadialLineData,
    customConfig?: QsRadialLineConfig
  ): QsRadialLine => {
    const config: RadialLineConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsRadialLineData,
  config: RadialLineConfigStrict
): QsRadialLine => {
  const { curve } = config
  const { color } = data
  const meta: Meta = getMeta(canvas, data, config)

  const radialLine = lineRadial().curve(constantsCurves[curve])
  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', radialLine(meta.lineData))
    .attr('fill', 'none')
    .attr('stroke', applyDefaultColorIfNeeded({ color }))
    .attr('transform', `translate(${meta.x}, ${meta.y})`)
  return {
    element: group.selectAll(`.${meta.class}`),
    transition: (data: QsRadialLineTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const meta: Meta = getMeta(canvas, data.data, config)
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
