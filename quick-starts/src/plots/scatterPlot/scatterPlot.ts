import { Canvas } from '../../d3QuickStart'
import {
  QsScatterPlotConfig,
  QsScatterPlot,
  QsPlottedPointData,
} from './qsTypes'

interface ScatterPlotConfigStrict {
  [key: string]: number | number | undefined
  defaultRadius: number
  defaultOpacity: number
}

const addDefaultsToConfig = (
  customConfig?: QsScatterPlotConfig
): ScatterPlotConfigStrict => {
  const defaults: ScatterPlotConfigStrict = {
    defaultRadius: 2,
    defaultOpacity: 1,
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
  const { xDataScalePlotted, yDataScalePlotted, genralPercentScale } =
    canvas.scales
  const { defaultRadius, defaultOpacity } = config
  const dataPoints = canvas.displayGroup.append('g')

  dataPoints
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'linePoint')
    .attr('cx', (d) => xDataScalePlotted(d.x))
    .attr('cy', (d) => yDataScalePlotted(d.y))
    .attr('r', (d) => genralPercentScale(d.radius ? d.radius : defaultRadius))
    .attr('opacity', (d) =>
      genralPercentScale(d.opacity ? d.opacity : defaultOpacity)
    )
  return { element: dataPoints }
}
