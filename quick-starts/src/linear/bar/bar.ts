import { Selection } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { getCalculatedData, CalculatedData } from './calculatedData'
import { DrawArgs } from './types'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
  Orientation,
} from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsBarConfig,
  BarConfigStrict,
  QsBarData,
  QsBars,
  QsBarTransitionData,
} from './qsTypes'

const addDefaultsToConfig = (customConfig?: QsBarConfig): BarConfigStrict => {
  const defauls: BarConfigStrict = {
    padding: 8,
    defaultFillColor: GlobalDefaultColors.BAR_FILL,
    defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
    defaultStrokeColor: GlobalDefaultColors.BAR_STROKE,
    defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
    defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
    fillColorScaleData: undefined,
    strokeColorScaleData: undefined,
  }
  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}

export const linearBar = {
  horizontal: (
    canvas: Canvas,
    data: QsBarData[],
    customConfig?: QsBarConfig
  ): QsBars => {
    const args: DrawArgs = { data, orientation: Orientation.HORIZONTAL }
    const config: BarConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  vertical: (
    canvas: Canvas,
    data: QsBarData[],
    customConfig?: QsBarConfig
  ): QsBars => {
    const args: DrawArgs = { data, orientation: Orientation.VERTICAL }
    const config: BarConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: BarConfigStrict
): QsBars => {
  const { orientation } = args
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    args,
    config
  )

  const group: Selection<SVGGElement, unknown, HTMLElement, any> =
    canvas.displayGroup.append('g')
  group
    .selectAll('.bar')
    .data(calculatedData)
    .enter()
    .append('rect')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('x', (d) => d.barData.x)
    .attr('y', (d) => d.barData.y)
    .attr('width', (d) => d.barData.width)
    .attr('height', (d) => d.barData.height)
    .attr('fill', (d) => d.barData.fillColor)
    .attr('fill-opacity', (d) => d.barData.fillOpacity)
    .attr('stroke', (d) => d.barData.strokeColor)
    .attr('stroke-opacity', (d) => d.barData.strokeOpacity)
    .attr('stroke-width', (d) => d.barData.strokeWidth)

  const transition = (data: QsBarTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = { data: data.data, orientation }
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
        .attr('width', (d) => d.barData.width)
        .attr('x', (d) => d.barData.x)
        .attr('fill', (d) => d.barData.fillColor)
        .attr('fill-opacity', (d) => d.barData.fillOpacity)
        .attr('stroke', (d) => d.barData.strokeColor)
        .attr('stroke-opacity', (d) => d.barData.strokeOpacity)
        .attr('stroke-width', (d) => d.barData.strokeWidth)
    else
      group
        .selectAll(`.${calculatedData[0].class}`)
        .data(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
        .attr('fill', (d) => d.barData.fillColor)
        .attr('fill-opacity', (d) => d.barData.fillOpacity)
        .attr('stroke', (d) => d.barData.strokeColor)
        .attr('stroke-opacity', (d) => d.barData.strokeOpacity)
        .attr('stroke-width', (d) => d.barData.strokeWidth)
  }
  return {
    element: group.selectAll(`.${calculatedData[0].class}`),
    transition: (data: QsBarTransitionData) => transition(data),
  }
}
