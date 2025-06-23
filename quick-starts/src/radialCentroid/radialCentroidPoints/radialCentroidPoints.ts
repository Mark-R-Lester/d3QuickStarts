import { getCalculatedData, CalculatedData } from './calculatedData'
import { Canvas } from '../../core/canvas/canvas'
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

interface DrawArgs {
  data: QsRadialPointData[]
}

export const radialPoint = {
  points: (
    canvas: Canvas,
    data: QsRadialPointData[],
    customConfig?: QsRadialPointsConfig
  ): QsRadialPoints => {
    const config: RadialPointsConfig = addDefaultsToConfig<RadialPointsConfig>(
      { ...radialCentroidPointsConfig },
      customConfig,
      { ...canvas.configStore.radialCentroid.pointsConfig() }
    )
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialPointsConfig
): QsRadialPoints => {
  const { data } = args
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const dataPoints = canvas.displayGroup.append('g')
  dataPoints
    .selectAll('circle')
    .data(calculatedData)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
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
  return {
    element: dataPoints.selectAll('circle'),
    transition: (data: QsRadialPointsTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data.data,
        config
      )
      dataPoints
        .selectAll(`.${calculatedData[0].class}`)
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
    },
  }
}
