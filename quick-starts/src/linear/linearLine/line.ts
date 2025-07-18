import { Orientation } from '../../core/enums/enums'
import { Canvas } from '../../core/canvas/canvas'
import { DrawArgs, LineConfig, CalculatedData } from './types'
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
    const args: DrawArgs = {
      data,
      orientation: Orientation.VERTICAL,
    }
    const config: LineConfig = addDefaultsToConfig<LineConfig>(
      { ...linearLineConfig },
      customConfig,
      { ...canvas.configStore.linear.lineConfig() }
    )
    return draw(canvas, args, config)
  },
  horizontal: (
    canvas: Canvas,
    data: QsLineData,
    customConfig?: QsLineConfig
  ): QsLine => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.HORIZONTAL,
    }
    const config: LineConfig = addDefaultsToConfig<LineConfig>(
      { ...linearLineConfig },
      customConfig,
      { ...canvas.configStore.linear.lineConfig() }
    )
    return draw(canvas, args, config)
  },
}

export const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: LineConfig
): QsLine => {
  const { orientation } = args
  const calculatedData: CalculatedData =
    orientation === Orientation.HORIZONTAL
      ? getHorizontalCalculatedData(canvas, args, config)
      : getVerticalCalculatedData(canvas, args, config)
  const { strokeLineJoin, strokeLineCap } = config

  const { className, dotClassName } = generateClassName('linearLine')

  const group = canvas.canvasDataGroup.append('g')
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

  const transition = (data: QsLineTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = {
      data: data.data,
      orientation,
    }
    const calculatedData: CalculatedData =
      orientation === Orientation.HORIZONTAL
        ? getHorizontalCalculatedData(canvas, drawArgs, config)
        : getVerticalCalculatedData(canvas, drawArgs, config)

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
