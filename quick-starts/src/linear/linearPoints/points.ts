import { Canvas } from '../../core/canvas/canvas'
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
import { generateClassName } from '../../core/generateClassName'

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
      linearPointsConfig,
      customConfig,
      canvas.configStore.linear.pointsConfig()
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
      linearPointsConfig,
      customConfig,
      canvas.configStore.linear.pointsConfig()
    )
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: PointsConfig
): QsPoints => {
  const { orientation } = args
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    args,
    config
  )

  const { className, dotClassName } = generateClassName('linearPoints')
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
    .attr('cy', (d) => d.pointData.y)
    .attr('cx', (d) => d.pointData.x)
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-width', (d) => d.strokeWidth)

  const transition = (
    transitionData: QsPointsTransitionData = { data: args.data }
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    const drawArgs: DrawArgs = { data: transitionData.data, orientation }
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      drawArgs,
      config
    )

    group
      .selectAll(dotClassName)
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
    element: group.selectAll(dotClassName),
    transition: (data: QsPointsTransitionData) => transition(data),
  }
}
