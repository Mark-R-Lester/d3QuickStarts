import { Selection } from 'd3'
import { Canvas } from '../../core/canvas/canvas'
import { getCalculatedData, CalculatedData } from './calculatedData'
import { BarConfig, DrawArgs } from './types'
import { Orientation } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsBarConfig, QsBarData, QsBars, QsBarTransitionData } from './qsTypes'
import { linearBarConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

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

  const group: Selection<SVGGElement, unknown, HTMLElement, any> =
    canvas.canvasDataGroup.append('g')
  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('rect')
    .attr('class', className)
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
        .selectAll(dotClassName)
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
        .selectAll(dotClassName)
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
    element: group.selectAll(dotClassName),
    transition: (data: QsBarTransitionData) => transition(data),
  }
}
