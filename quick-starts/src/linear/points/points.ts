import { Canvas } from '../../d3QuickStart'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { DrawArgs, PointsConfigStrict } from './types'
import {
  GlobalDefaultStrings,
  Orientation,
  ScaleType,
} from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsPointData,
  QsPoints,
  QsPointsConfig,
  QsPointsTransitionData,
} from './qsTypes'

const addDefaultsToConfig = (
  customConfig?: QsPointsConfig
): PointsConfigStrict => {
  const defaults: PointsConfigStrict = {
    radius: 3,
    defaultColor: GlobalDefaultStrings.COLOR,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const linearPoint = {
  horizontal: (
    canvas: Canvas,
    data: QsPointData[],
    customConfig?: QsPointsConfig
  ): QsPoints => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.HORIZONTAL,
      scaleType: ScaleType.LINEAR,
    }
    const config: PointsConfigStrict = addDefaultsToConfig(customConfig)
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
      scaleType: ScaleType.LINEAR,
    }
    const config: PointsConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  horizontalBanded: (
    canvas: Canvas,
    data: QsPointData[],
    customConfig?: QsPointsConfig
  ): QsPoints => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.HORIZONTAL,
      scaleType: ScaleType.BANDED,
    }
    const config: PointsConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  verticalBanded: (
    canvas: Canvas,
    data: QsPointData[],
    customConfig?: QsPointsConfig
  ): QsPoints => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.VERTICAL,
      scaleType: ScaleType.BANDED,
    }
    const config: PointsConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: PointsConfigStrict
): QsPoints => {
  const { radius } = config
  const { orientation, scaleType } = args

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
    .attr('r', radius)
    .attr('fill', (d) => d.fillColor)

  const transition = (data: QsPointsTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = { data: data.data, orientation, scaleType }
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      drawArgs,
      config
    )

    if (orientation === Orientation.VERTICAL)
      group
        .selectAll(`.${calculatedData[0].class}`)
        .data(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('cx', (d) => d.pointData.x)
        .attr('fill', (d) => d.fillColor)
    else
      group
        .selectAll(`.${calculatedData[0].class}`)
        .data(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('cy', (d) => d.pointData.y)
        .attr('fill', (d) => d.fillColor)
  }
  return {
    element: group.selectAll(`.${calculatedData[0].class}`),
    transition: (data: QsPointsTransitionData) => transition(data),
  }
}
