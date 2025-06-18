import { line as d3line } from 'd3'
import { PlottedLineConfig } from './types'
import { plottedLineConfig } from '../../core/config/configDefaults'
import { constantsCurves } from '../../core/constants/constants'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { QsLinePlot, QsPlottedLineConfig, QsPlottedLineData } from './qsTypes'
import { Canvas } from '../../canvas/canvas'

export const plottedLine = {
  line: (
    canvas: Canvas,
    data: QsPlottedLineData,
    customConfig?: QsPlottedLineConfig
  ): QsLinePlot => {
    const config: PlottedLineConfig = addDefaultsToConfig<PlottedLineConfig>(
      { ...plottedLineConfig },
      customConfig,
      { ...canvas.configStore.plotted.lineConfig() }
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsPlottedLineData,
  config: PlottedLineConfig
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
