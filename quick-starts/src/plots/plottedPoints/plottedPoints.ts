import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { plottedPointsConfig } from '../../core/config/configDefaults'
import { generateClassName } from '../../core/generateClassName'
import { Canvas } from '../../d3QuickStart'
import { CalculatedData, getCalculatedData } from './calculatedData'
import {
  QsPlottedPointsConfig,
  QsPlottedPoints,
  QsPlottedPointsData,
  QsPlottedPointsTransitionData,
} from './qsTypes'
import { PlottedPointsConfig } from './types'

const addDefaultsToConfig = (
  customConfig?: QsPlottedPointsConfig
): PlottedPointsConfig => {
  const defaults: PlottedPointsConfig = plottedPointsConfig
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
    const config: PlottedPointsConfig = addDefaultsToConfig(customConfig)
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsPlottedPointsData[],
  config: PlottedPointsConfig
): QsPlottedPoints => {
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const { className, dotClassName } = generateClassName('plottedPoints')
  const group = canvas.displayGroup.append('g')

  group
    .selectAll('circle')
    .data(calculatedData)
    .enter()
    .append('circle')
    .attr('class', className)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-width', (d) => d.strokeWidth)

  const transition = (data: QsPlottedPointsTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      data.data,
      config
    )

    group
      .selectAll(dotClassName)
      .data(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => d.fillColor)
      .attr('fill-opacity', (d) => d.fillOpacity)
      .attr('stroke', (d) => d.strokeColor)
      .attr('stroke-opacity', (d) => d.strokeOpacity)
      .attr('stroke-width', (d) => d.strokeWidth)
  }

  return { element: group.selectAll(dotClassName), transition }
}
