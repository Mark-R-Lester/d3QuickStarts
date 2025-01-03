import { Orientation, ScaleType } from '../../core/enums/enums'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { Canvas } from '../../d3QuickStart'
import { DrawArgs, LineConfigStrict, CalculatedData } from './types'
import { getCalculatedData as getVerticalCalculatedData } from './calculatedDataVertical'
import { getCalculatedData as getHorizontalCalculatedData } from './calculatedDataHorizontal'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { applyDefaultColorIfNeeded } from '../../core/color/color'
import {
  QsLineConfig,
  QsLineData,
  QsLine,
  QsLineTransitionData,
} from './qsTypes'

const addDefaultsToConfig = (customConfig?: QsLineConfig): LineConfigStrict => {
  const defauls: LineConfigStrict = {
    curve: QsEnumCurve.LINEAR,
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
  const { color } = args.data
  const calculatedData: CalculatedData =
    orientation === Orientation.HORIZONTAL
      ? getHorizontalCalculatedData(canvas, args, config)
      : getVerticalCalculatedData(canvas, args, config)

  const { lineFunction, lineData } = calculatedData
  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', calculatedData.class)
    .attr('id', calculatedData.id)
    .attr('d', lineFunction(lineData))
    .attr('fill', 'none')
    .attr('stroke', applyDefaultColorIfNeeded({ color }))

  const transition = (data: QsLineTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = {
      data: data.data,
      scaleType,
      orientation,
    }
    const { color: newColor } = data.data
    const calculatedData: CalculatedData =
      orientation === Orientation.HORIZONTAL
        ? getHorizontalCalculatedData(canvas, drawArgs, config)
        : getVerticalCalculatedData(canvas, drawArgs, config)

    group
      .selectAll(`.${calculatedData.class}`)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('d', lineFunction(calculatedData.lineData))
      .attr('stroke', applyDefaultColorIfNeeded({ color, newColor }))
  }
  return {
    element: group.select(`.${calculatedData.class}`),
    transition: (data: QsLineTransitionData) => transition(data),
  }
}
