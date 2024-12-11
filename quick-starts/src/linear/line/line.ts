import { curveLinear, CurveFactory, line as d3line, Selection } from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { DrawArgs } from './types'
import { Meta, getMeta } from './meta'
import { Orientation, ScaleType } from '../../core/enums'

export interface QsLineConfig {
  [key: string]: CurveFactory | undefined
  curve?: CurveFactory
}

export interface QsLine {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[]) => void
}

interface LineConfigStrict {
  [key: string]: CurveFactory | undefined
  curve: CurveFactory
}

const addDefaultsToConfig = (customConfig?: QsLineConfig): LineConfigStrict => {
  const defauls: LineConfigStrict = {
    curve: curveLinear,
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
    .curve(curve)

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', line(lineData))
    .attr('stroke', 'black')
    .attr('fill-opacity', '0')

  const transition = (
    data: number[],
    orientation: Orientation,
    scaleType: ScaleType
  ) => {
    const args: DrawArgs = {
      data,
      orientation: orientation,
      scaleType: scaleType,
    }
    const meta: Meta = getMeta(canvas, args, config)
    group
      .selectAll(`.${meta.class}`)
      .transition()
      .duration(3000)
      .attr('d', line(meta.lineData))
  }
  return {
    element: group.select(`.${meta.class}`),
    transition: (data: number[]) => transition(data, orientation, scaleType),
  }
}
