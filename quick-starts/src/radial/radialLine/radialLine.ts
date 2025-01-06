import { lineRadial } from 'd3'
import { CalculatedData, getCalculatedData } from './calculatedData'
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
  const { strokeColor } = data
  const calculatedData: CalculatedData = getCalculatedData(canvas, data, config)

  const radialLine = lineRadial().curve(constantsCurves[curve])
  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', calculatedData.class)
    .attr('id', calculatedData.id)
    .attr('d', radialLine(calculatedData.lineData))
    .attr('fill', 'none')
    .attr('stroke', applyDefaultColorIfNeeded({ color: strokeColor }))
    .attr('transform', `translate(${calculatedData.x}, ${calculatedData.y})`)
  return {
    element: group.selectAll(`.${calculatedData.class}`),
    transition: (data: QsRadialLineTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData = getCalculatedData(
        canvas,
        data.data,
        config
      )
      const { strokeColor: newColor } = data.data
      group
        .selectAll(`.${calculatedData.class}`)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', radialLine(calculatedData.lineData))
        .attr(
          'stroke',
          applyDefaultColorIfNeeded({ color: strokeColor, newColor })
        )
    },
  }
}
