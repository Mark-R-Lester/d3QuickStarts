import { getCalculatedData, CalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/orthogonal/canvasOrthogonal'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { RadialPointsConfig } from './types'
import {
  QsRadialPointData,
  QsRadialPointsConfig,
  QsRadialPoints,
  QsRadialPointsTransitionData,
} from './qsTypes'
import { radialCentroidPointsConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const radialPoint = {
  points: (
    canvas: Canvas,
    data: QsRadialPointData[],
    customConfig?: QsRadialPointsConfig
  ): QsRadialPoints => {
    const config: RadialPointsConfig = addDefaultsToConfig<RadialPointsConfig>(
      radialCentroidPointsConfig,
      customConfig,
      canvas.configStore.radialCentroid.pointsConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsRadialPointData[],
  config: RadialPointsConfig
): QsRadialPoints => {
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const { className, dotClassName } = generateClassName('radialCentroidPoints')
  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('circle')
    .attr('class', className)
    .attr('id', (d) => d.id)
    .attr('cx', (d) => d.coordinate.x)
    .attr('cy', (d) => d.coordinate.y)
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

  const transition = (
    transitionData: QsRadialPointsTransitionData = { data }
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      transitionData.data,
      config
    )
    group
      .selectAll(dotClassName)
      .data(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('cx', (d) => d.coordinate.x)
      .attr('cy', (d) => d.coordinate.y)
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => d.fillColor)
      .attr('fill', (d) => d.fillColor)
      .attr('fill-opacity', (d) => d.fillOpacity)
      .attr('stroke', (d) => d.strokeColor)
      .attr('stroke-opacity', (d) => d.strokeOpacity)
      .attr('stroke-width', (d) => d.strokeWidth)
  }
  return {
    element: group.selectAll(dotClassName),
    transition,
  }
}
