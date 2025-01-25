import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
} from '../../core/enums/enums'
import { Canvas } from '../../d3QuickStart'
import {
  CalculatedData,
  getCalculatedData,
  ScatterPlotConfigStrict,
} from './calculatedData'
import {
  QsScatterPlotConfig,
  QsScatterPlot,
  QsPlottedPointData,
} from './qsTypes'

const addDefaultsToConfig = (
  customConfig?: QsScatterPlotConfig
): ScatterPlotConfigStrict => {
  const defaults: ScatterPlotConfigStrict = {
    defaultRadius: 3,
    defaultFillColor: GlobalDefaultColors.POINT_FILL,
    defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
    defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
    defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
    defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const plottedPoint = {
  points: (
    canvas: Canvas,
    data: QsPlottedPointData[],
    customConfig?: QsScatterPlotConfig
  ): QsScatterPlot => {
    const config: ScatterPlotConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsPlottedPointData[],
  config: ScatterPlotConfigStrict
): QsScatterPlot => {
  const dataPoints = canvas.displayGroup.append('g')
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  dataPoints
    .selectAll('circle')
    .data(calculatedData)
    .enter()
    .append('circle')
    .attr('class', 'linePoint')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-width', (d) => d.strokeWidth)

  return { element: dataPoints }
}
