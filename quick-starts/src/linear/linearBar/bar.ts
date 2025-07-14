import { Canvas } from '../../core/canvas/canvas'
import { getCalculatedData, CalculatedData } from './calculatedData'
import { BarConfig, DrawArgs } from './types'
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
    const args: DrawArgs = { data, orientation: Orientation.HORIZONTAL }
    const config: BarConfig = addDefaultsToConfig<BarConfig>(
      { ...linearBarConfig },
      customConfig,
      { ...canvas.configStore.linear.barConfig() }
    )
    return draw(canvas, args, config)
  },
  vertical: (
    canvas: Canvas,
    data: QsBarData[],
    customConfig?: QsBarConfig
  ): QsBars => {
    const args: DrawArgs = { data, orientation: Orientation.VERTICAL }
    const config: BarConfig = addDefaultsToConfig<BarConfig>(
      { ...linearBarConfig },
      customConfig,
      { ...canvas.configStore.linear.barConfig() }
    )
    return draw(canvas, args, config)
  },
}

const draw = (canvas: Canvas, args: DrawArgs, config: BarConfig): QsBars => {
  const { orientation } = args
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    args,
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
