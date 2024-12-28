import { line as d3line, Selection } from 'd3'
import { QsCanvas, QsTransitionArgs } from '../../d3QuickStart'
import { DrawArgs, LineConfigStrict } from './types'
import { Meta, getMeta } from './meta'
import { Orientation, ScaleType } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'

export interface QsLineConfig {
  [key: string]: QsEnumCurve | undefined
  curve?: QsEnumCurve
}

export interface QsLineTransitionData {
  data: number[]
  transitionArgs?: QsTransitionArgs
}

export interface QsLine {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsLineTransitionData) => void
}

const addDefaultsToConfig = (customConfig?: QsLineConfig): LineConfigStrict => {
  const defauls: LineConfigStrict = {
    curve: QsEnumCurve.LINEAR,
  }

  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}

const horizontal = (
  canvas: QsCanvas,
  data: number[],
  customConfig?: QsLineConfig
): QsLine => {
  const args: DrawArgs = {
    data,
    orientation: Orientation.HORIZONTAL,
    scaleType: ScaleType.LINEAR,
  }
  const config: LineConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: QsCanvas,
  data: number[],
  customConfig?: QsLineConfig
): QsLine => {
  const args: DrawArgs = {
    data,
    orientation: Orientation.VERTICAL,
    scaleType: ScaleType.LINEAR,
  }
  const config: LineConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalBanded = (
  canvas: QsCanvas,
  data: number[],
  customConfig?: QsLineConfig
): QsLine => {
  const args: DrawArgs = {
    data,
    orientation: Orientation.HORIZONTAL,
    scaleType: ScaleType.BANDED,
  }
  const config: LineConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const verticalBanded = (
  canvas: QsCanvas,
  data: number[],
  customConfig?: QsLineConfig
): QsLine => {
  const args: DrawArgs = {
    data,
    orientation: Orientation.VERTICAL,
    scaleType: ScaleType.BANDED,
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

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: LineConfigStrict
): QsLine => {
  const { orientation, scaleType } = args
  const { curve } = config
  const meta: Meta = getMeta(canvas, args, config)
  const { dataScale, spacingScale, bandingAdjustment, lineData } = meta

  const line = d3line()
    .x((d) =>
      orientation === Orientation.VERTICAL
        ? dataScale(d[0])
        : spacingScale(d[0]) + bandingAdjustment
    )
    .y((d) =>
      orientation === Orientation.VERTICAL
        ? spacingScale(d[1]) + bandingAdjustment
        : dataScale(d[1])
    )
    .curve(constantsCurves[curve])

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', line(lineData))
    .attr('stroke', 'black')
    .attr('fill-opacity', '0')

  const transition = (
    data: QsLineTransitionData,
    orientation: Orientation,
    scaleType: ScaleType
  ) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = {
      data: data.data,
      orientation: orientation,
      scaleType: scaleType,
    }
    const meta: Meta = getMeta(canvas, drawArgs, config)
    group
      .selectAll(`.${meta.class}`)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('d', line(meta.lineData))
  }
  return {
    element: group.select(`.${meta.class}`),
    transition: (data: QsLineTransitionData) =>
      transition(data, orientation, scaleType),
  }
}
