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

interface LinePlotConfigStrict {
  [key: string]: QsEnumCurve | number | string | undefined
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}

const addDefaultsToConfig = (
  customConfig?: QsLinePlotConfig
): LinePlotConfigStrict => {
  const defaults: LinePlotConfigStrict = {
    curve: QsEnumCurve.LINEAR,
    strokeLineJoin: QsEnumLineJoin.ROUND,
    strokeLineCap: QsEnumLineCap.ROUND,
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

  const calculatedData: CalculatedData = getCalculatedData(canvas, data)

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
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('opacity', (d) => d.opacity)
    .attr('stroke-linejoin', strokeLineJoin)
    .attr('stroke-linecap', strokeLineCap)
    .attr('fill-opacity', '0')

  return { element: lineGroup.select('.line') }
}
