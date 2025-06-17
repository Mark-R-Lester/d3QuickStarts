import { line as d3line } from 'd3'
import {
  Canvas,
  QsLinePlot,
  QsPlottedLineConfig,
  QsPlottedLineData,
} from '../../d3QuickStart'
import { PlottedLineConfigStrict } from './types'
import { plottedLineConfig } from '../../core/config/configDefaults'
import { constantsCurves } from '../../core/constants/constants'
import { CalculatedData, getCalculatedData } from './calculatedData'

const addDefaultsToConfig = (
  customConfig?: QsPlottedLineConfig
): PlottedLineConfigStrict => {
  const defaults: PlottedLineConfigStrict = { ...plottedLineConfig }
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
    customConfig?: QsPlottedLineConfig
  ): QsLinePlot => {
    const config: PlottedLineConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsPlottedLineData,
  config: PlottedLineConfigStrict
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
