import { line as d3line } from 'd3'
import { PlottedLineConfig } from './types'
import { plottedLineConfig } from '../../core/config/configDefaults'
import { constantsCurves } from '../../core/constants/constants'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import {
  QsLinePlot,
  QsPlottedLineConfig,
  QsPlottedLineData,
  QsPlottedLineTransitionData,
} from './qsTypes'
import { Canvas } from '../../core/canvas/canvas'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { generateClassName } from '../../core/generateClassName'

export const plottedLine = {
  line: (
    canvas: Canvas,
    data: QsPlottedLineData,
    customConfig?: QsPlottedLineConfig
  ): QsLinePlot => {
    const config: PlottedLineConfig = addDefaultsToConfig<PlottedLineConfig>(
      plottedLineConfig,
      customConfig,
      canvas.configStore.plotted.lineConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsPlottedLineData,
  config: PlottedLineConfig
): QsLinePlot => {
  const { curve, strokeLineJoin, strokeLineCap } = config

  const calculatedData: CalculatedData = getCalculatedData(canvas, data, config)
  const { className, dotClassName } = generateClassName('plottedLine')

  let line = d3line()
    .x((d) => d[0])
    .y((d) => d[1])
    .curve(constantsCurves[curve])

  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  group
    .append('path')
    .datum(calculatedData)
    .attr('class', className)
    .attr('d', (d) => line(d.coordinates))
    .attr('fill', 'none')
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-linejoin', strokeLineJoin)
    .attr('stroke-linecap', strokeLineCap)

  const transition = (data: QsPlottedLineTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const calculatedData: CalculatedData = getCalculatedData(
      canvas,
      data.data,
      config
    )

    group
      .selectAll(dotClassName)
      .datum(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('d', (d) => line(d.coordinates))
      .attr('stroke', (d) => d.strokeColor)
      .attr('stroke-width', (d) => d.strokeWidth)
      .attr('stroke-opacity', (d) => d.strokeOpacity)
  }

  return { element: group.select(dotClassName), transition }
}
