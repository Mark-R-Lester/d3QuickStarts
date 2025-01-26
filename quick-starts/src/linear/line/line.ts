import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
  Orientation,
  ScaleType,
} from '../../core/enums/enums'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import { Canvas } from '../../d3QuickStart'
import { DrawArgs, LineConfigStrict, CalculatedData } from './types'
import { getCalculatedData as getVerticalCalculatedData } from './calculatedDataVertical'
import { getCalculatedData as getHorizontalCalculatedData } from './calculatedDataHorizontal'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsLineConfig,
  QsLineData,
  QsLine,
  QsLineTransitionData,
} from './qsTypes'

const addDefaultsToConfig = (customConfig?: QsLineConfig): LineConfigStrict => {
  const defauls: LineConfigStrict = {
    curve: QsEnumCurve.LINEAR,
    strokeLineJoin: QsEnumLineJoin.ROUND,
    strokeLineCap: QsEnumLineCap.ROUND,
    defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
    defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
    defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
  }

  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}

export const linearLine = {
  vertical: (
    canvas: Canvas,
    data: QsLineData,
    customConfig?: QsLineConfig
  ): QsLine => {
    const args: DrawArgs = {
      data,
      scaleType: ScaleType.LINEAR,
      orientation: Orientation.VERTICAL,
    }
    const config: LineConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  verticalBanded: (
    canvas: Canvas,
    data: QsLineData,
    customConfig?: QsLineConfig
  ): QsLine => {
    const args: DrawArgs = {
      data,
      scaleType: ScaleType.BANDED,
      orientation: Orientation.VERTICAL,
    }
    const config: LineConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  horizontal: (
    canvas: Canvas,
    data: QsLineData,
    customConfig?: QsLineConfig
  ): QsLine => {
    const args: DrawArgs = {
      data,
      scaleType: ScaleType.LINEAR,
      orientation: Orientation.HORIZONTAL,
    }
    const config: LineConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  horizontalBanded: (
    canvas: Canvas,
    data: QsLineData,
    customConfig?: QsLineConfig
  ): QsLine => {
    const args: DrawArgs = {
      data,
      scaleType: ScaleType.BANDED,
      orientation: Orientation.HORIZONTAL,
    }
    const config: LineConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
}

export const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: LineConfigStrict
): QsLine => {
  const { scaleType, orientation } = args
  const calculatedData: CalculatedData =
    orientation === Orientation.HORIZONTAL
      ? getHorizontalCalculatedData(canvas, args, config)
      : getVerticalCalculatedData(canvas, args, config)
  const { strokeLineJoin, strokeLineCap } = config

  console.log('calculatedData', calculatedData)

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .datum(calculatedData)
    .attr('class', (d) => d.class)
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
      scaleType,
      orientation,
    }
    const calculatedData: CalculatedData =
      orientation === Orientation.HORIZONTAL
        ? getHorizontalCalculatedData(canvas, drawArgs, config)
        : getVerticalCalculatedData(canvas, drawArgs, config)

    group
      .selectAll(`.${calculatedData.class}`)
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
    element: group.select(`.${calculatedData.class}`),
    transition: (data: QsLineTransitionData) => transition(data),
  }
}
