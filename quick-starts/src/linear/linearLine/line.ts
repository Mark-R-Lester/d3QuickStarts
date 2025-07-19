import { Orientation } from '../../core/enums/enums'
import { Canvas } from '../../canvas/linear/canvas'
import { LineConfig, CalculatedData } from './types'
import { getCalculatedData as getVerticalCalculatedData } from './calculatedDataVertical'
import { getCalculatedData as getHorizontalCalculatedData } from './calculatedDataHorizontal'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsLineConfig,
  QsLineData,
  QsLine,
  QsLineTransitionData,
} from './qsTypes'
import { linearLineConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const linearLine = {
  vertical: (
    canvas: Canvas,
    data: QsLineData,
    customConfig?: QsLineConfig
  ): QsLine => {
    const config: LineConfig = addDefaultsToConfig<LineConfig>(
      linearLineConfig,
      customConfig,
      canvas.configStore.linear.lineConfig()
    )
    return draw(canvas, data, Orientation.VERTICAL, config)
  },
  horizontal: (
    canvas: Canvas,
    data: QsLineData,
    customConfig?: QsLineConfig
  ): QsLine => {
    const config: LineConfig = addDefaultsToConfig<LineConfig>(
      linearLineConfig,
      customConfig,
      canvas.configStore.linear.lineConfig()
    )
    return draw(canvas, data, Orientation.HORIZONTAL, config)
  },
}

export const draw = (
  canvas: Canvas,
  data: QsLineData,
  orientation: Orientation,
  config: LineConfig
): QsLine => {
  const calculatedData: CalculatedData =
    orientation === Orientation.HORIZONTAL
      ? getHorizontalCalculatedData(canvas, data, config)
      : getVerticalCalculatedData(canvas, data, config)
  const { strokeLineJoin, strokeLineCap } = config

  const { className, dotClassName } = generateClassName('linearLine')

  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  group
    .append('path')
    .datum(calculatedData)
    .attr('class', className)
    .attr('id', (d) => d.id)
    .attr('d', (d) => d.lineFunction(d.lineData))
    .attr('fill', 'none')
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-linejoin', strokeLineJoin)
    .attr('stroke-linecap', strokeLineCap)

  const transition = (transitionData: QsLineTransitionData = { data }) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)

    const calculatedData: CalculatedData =
      orientation === Orientation.HORIZONTAL
        ? getHorizontalCalculatedData(canvas, transitionData.data, config)
        : getVerticalCalculatedData(canvas, transitionData.data, config)

    group
      .selectAll(dotClassName)
      .datum(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('d', (d) => d.lineFunction(d.lineData))
      .attr('stroke', (d) => d.strokeColor)
      .attr('stroke-width', (d) => d.strokeWidth)
      .attr('stroke-opacity', (d) => d.strokeOpacity)
  }
  return {
    element: group.select(dotClassName),
    transition: (data: QsLineTransitionData) => transition(data),
  }
}
