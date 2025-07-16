import { Canvas } from '../../core/canvas/canvas'
import { getCalculatedData, CalculatedData } from './calculatedData'
import { BarConfig } from './types'
import { Orientation } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsBarConfig, QsBarData, QsBars, QsBarTransitionData } from './qsTypes'
import { linearBarConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { customRectangle } from '../../core/customShapes/customRectangle'

export const linearBar = {
  horizontal: (
    canvas: Canvas,
    data: QsBarData[],
    customConfig?: QsBarConfig
  ): QsBars => {
    const config: BarConfig = addDefaultsToConfig<BarConfig>(
      linearBarConfig,
      customConfig,
      canvas.configStore.linear.barConfig()
    )
    return draw(canvas, data, Orientation.HORIZONTAL, config)
  },
  vertical: (
    canvas: Canvas,
    data: QsBarData[],
    customConfig?: QsBarConfig
  ): QsBars => {
    const config: BarConfig = addDefaultsToConfig<BarConfig>(
      linearBarConfig,
      customConfig,
      canvas.configStore.linear.barConfig()
    )
    return draw(canvas, data, Orientation.VERTICAL, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsBarData[],
  orientation: Orientation,
  config: BarConfig
): QsBars => {
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    orientation,
    config
  )
  const { className, dotClassName } = generateClassName('linearBars')

  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('path')
    .attr('d', (d) => customRectangle(d.barData.rectangleParams))
    .attr('class', className)
    .attr('id', (d) => d.id)
    .attr('fill', (d) => d.barData.fillColor)
    .attr('fill-opacity', (d) => d.barData.fillOpacity)
    .attr('stroke', (d) => d.barData.strokeColor)
    .attr('stroke-opacity', (d) => d.barData.strokeOpacity)
    .attr('stroke-width', (d) => d.barData.strokeWidth)

  const transition = (transitionData: QsBarTransitionData = { data }) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)

    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      transitionData.data,
      orientation,
      config
    )

    if (orientation === Orientation.VERTICAL)
      group
        .selectAll(dotClassName)
        .data(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', (d) => customRectangle(d.barData.rectangleParams))
        .attr('fill', (d) => d.barData.fillColor)
        .attr('fill-opacity', (d) => d.barData.fillOpacity)
        .attr('stroke', (d) => d.barData.strokeColor)
        .attr('stroke-opacity', (d) => d.barData.strokeOpacity)
        .attr('stroke-width', (d) => d.barData.strokeWidth)
    else
      group
        .selectAll(dotClassName)
        .data(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', (d) => customRectangle(d.barData.rectangleParams))
        .attr('fill', (d) => d.barData.fillColor)
        .attr('fill-opacity', (d) => d.barData.fillOpacity)
        .attr('stroke', (d) => d.barData.strokeColor)
        .attr('stroke-opacity', (d) => d.barData.strokeOpacity)
        .attr('stroke-width', (d) => d.barData.strokeWidth)
  }
  return {
    element: group.selectAll(dotClassName),
    transition: (data: QsBarTransitionData) => transition(data),
  }
}
