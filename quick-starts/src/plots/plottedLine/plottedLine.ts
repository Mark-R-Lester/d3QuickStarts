import { line as d3line } from 'd3'
import { Canvas } from '../../d3QuickStart'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'
import { QsLinePlotConfig, QsLinePlot, QsPlottedLineData } from './qsTypes'
import { CalculatedData, getCalculatedData } from './calculatedData'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
} from '../../core/enums/enums'
import { LinePlotConfigStrict } from './types'

const addDefaultsToConfig = (
  customConfig?: QsLinePlotConfig
): LinePlotConfigStrict => {
  const defaults: LinePlotConfigStrict = {
    curve: QsEnumCurve.LINEAR,
    strokeLineJoin: QsEnumLineJoin.ROUND,
    strokeLineCap: QsEnumLineCap.ROUND,
    defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
    defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
    defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const plottedLine = {
  line: (
    canvas: Canvas,
    data: QsPlottedLineData,
    customConfig?: QsLinePlotConfig
  ): QsLinePlot => {
    const config: LinePlotConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsPlottedLineData,
  config: LinePlotConfigStrict
): QsLinePlot => {
  const { curve, strokeLineJoin, strokeLineCap } = config

  const calculatedData: CalculatedData = getCalculatedData(canvas, data, config)

  let line = d3line()
    .x((d) => d[0])
    .y((d) => d[1])
    .curve(constantsCurves[curve])

  let lineGroup = canvas.displayGroup.append('g')
  lineGroup
    .append('path')
    .datum(calculatedData)
    .attr('class', 'line')
    .attr('d', (d) => line(d.coordinates))
    .attr('fill', 'none')
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-linejoin', strokeLineJoin)
    .attr('stroke-linecap', strokeLineCap)

  return { element: lineGroup.select('.line') }
}
