import { Orientation, ScaleType } from '../../core/enums/enums'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { Canvas } from '../../d3QuickStart'
import {
  QsLineData,
  QsLineConfig,
  QsLine,
  DrawArgs,
  LineConfigStrict,
  Meta,
  QsLineTransitionData,
} from './types'
import { getMeta as getVerticalMeta } from './metaVertical'
import { getMeta as getHorizontalMeta } from './metaHorizontal'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { applyDefaultColorIfNeeded } from '../../core/color/color'

export { QsLineData, QsLineConfig, QsLineTransitionData, QsLine } from './types'

const addDefaultsToConfig = (customConfig?: QsLineConfig): LineConfigStrict => {
  const defauls: LineConfigStrict = {
    curve: QsEnumCurve.LINEAR,
  }

  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}

export const vertical = (
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
}

export const verticalBanded = (
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
}

export const horizontal = (
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
}

export const horizontalBanded = (
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
}

export const qsLinearLineGenerator = {
  horizontal,
  vertical,
  horizontalBanded,
  verticalBanded,
}

export const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: LineConfigStrict
): QsLine => {
  const { scaleType, orientation } = args
  const { color } = args.data
  const meta: Meta =
    orientation === Orientation.HORIZONTAL
      ? getHorizontalMeta(canvas, args, config)
      : getVerticalMeta(canvas, args, config)

  const { lineFunction, lineData } = meta
  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
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
    const meta: Meta =
      orientation === Orientation.HORIZONTAL
        ? getHorizontalMeta(canvas, drawArgs, config)
        : getVerticalMeta(canvas, drawArgs, config)

    group
      .selectAll(`.${meta.class}`)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('d', lineFunction(meta.lineData))
      .attr('stroke', applyDefaultColorIfNeeded({ color, newColor }))
  }
  return {
    element: group.select(`.${meta.class}`),
    transition: (data: QsLineTransitionData) => transition(data),
  }
}
