import { Canvas } from '../../canvas/canvas'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { DrawArgs, PointsConfig } from './types'
import { Orientation } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsPointData,
  QsPoints,
  QsPointsConfig,
  QsPointsTransitionData,
} from './qsTypes'
import { linearPointsConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'

export const linearPoint = {
  horizontal: (
    canvas: Canvas,
    data: QsPointData[],
    customConfig?: QsPointsConfig
  ): QsPoints => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.HORIZONTAL,
    }
    const config: PointsConfig = addDefaultsToConfig<PointsConfig>(
      { ...linearPointsConfig },
      customConfig,
      { ...canvas.configStore.linear.pointsConfig() }
    )
    return draw(canvas, args, config)
  },
  vertical: (
    canvas: Canvas,
    data: QsPointData[],
    customConfig?: QsPointsConfig
  ): QsPoints => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.VERTICAL,
    }
    const config: PointsConfig = addDefaultsToConfig<PointsConfig>(
      { ...linearPointsConfig },
      customConfig,
      { ...canvas.configStore.linear.pointsConfig() }
    )
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: PointsConfig
): QsPoints => {
  const { scaleType } = config
  const { orientation } = args

  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    args,
    config
  )

  const group = canvas.displayGroup.append('g')

  group
    .selectAll('circle')
    .data(calculatedData)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('cy', (d) => d.pointData.y)
    .attr('cx', (d) => d.pointData.x)
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-width', (d) => d.strokeWidth)

  const transition = (data: QsPointsTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = { data: data.data, orientation }
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      drawArgs,
      config
    )

    group
      .selectAll(`.${calculatedData[0].class}`)
      .data(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr(orientation === Orientation.VERTICAL ? 'cx' : 'cy', (d) =>
        orientation === Orientation.VERTICAL ? d.pointData.x : d.pointData.y
      )
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => d.fillColor)
      .attr('fill-opacity', (d) => d.fillOpacity)
      .attr('stroke', (d) => d.strokeColor)
      .attr('stroke-opacity', (d) => d.strokeOpacity)
      .attr('stroke-width', (d) => d.strokeWidth)
  }
  return {
    element: group.selectAll(`.${calculatedData[0].class}`),
    transition: (data: QsPointsTransitionData) => transition(data),
  }
}
