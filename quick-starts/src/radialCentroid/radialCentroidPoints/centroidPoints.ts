import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/types'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsCalculatedDataCentroidPoints, CentroidPointsConfig } from './types'
import {
  QsCentroidPointData,
  QsCentroidPointsConfig,
  QsCentroidPoints,
  QsCentroidPointsTransitionData,
} from './qsTypes'
import { centroidPointsConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const radialPoint = {
  points: (
    canvas: Canvas,
    data: QsCentroidPointData[],
    customConfig?: QsCentroidPointsConfig
  ): QsCentroidPoints => {
    const config: CentroidPointsConfig =
      addDefaultsToConfig<CentroidPointsConfig>(
        centroidPointsConfig,
        customConfig,
        canvas.configStore.centroid.pointsConfig()
      )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsCentroidPointData[],
  config: CentroidPointsConfig
): QsCentroidPoints => {
  const calculatedData: QsCalculatedDataCentroidPoints[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const { className, dotClassName } = generateClassName('centroidPoints')

  const { layer, layerActions } =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = layer.append('g')

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
    transitionData: QsCentroidPointsTransitionData = { data }
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    const calculatedData: QsCalculatedDataCentroidPoints[] = getCalculatedData(
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
    className,
    layerActions,
    calculatedData,
    transition,
  }
}
