import { plottedPointsConfig } from '../../core/config'
import { Canvas } from '../../d3QuickStart'
import {
  CalculatedData,
  getCalculatedData,
  PlottedPointsConfigStrict,
} from './calculatedData'
import {
  QsPlottedPointsConfig,
  QsPlottedPoints,
  QsPlottedPointsData,
} from './qsTypes'

const addDefaultsToConfig = (
  customConfig?: QsPlottedPointsConfig
): PlottedPointsConfigStrict => {
  const defaults: PlottedPointsConfigStrict = plottedPointsConfig
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const plottedPoint = {
  points: (
    canvas: Canvas,
    data: QsPlottedPointsData[],
    customConfig?: QsPlottedPointsConfig
  ): QsPlottedPoints => {
    const config: PlottedPointsConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsPlottedPointsData[],
  config: PlottedPointsConfigStrict
): QsPlottedPoints => {
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
