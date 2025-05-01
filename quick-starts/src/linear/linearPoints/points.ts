import { Canvas, QsScaleType } from '../../d3QuickStart'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { DrawArgs, PointsConfigStrict } from './types'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
  Orientation,
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
    scaleType: QsScaleType.LINEAR,
    defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
    defaultFillColor: GlobalDefaultColors.POINT_FILL,
    defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
    defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
    defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
    defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
    fillColorScaleData: undefined,
    strokeColorScaleData: undefined,
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
