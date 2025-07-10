import { BarStackedConfig, CalculatedData } from './types'
import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../core/canvas/canvas'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsBarStackedConfig,
  QsBarStack,
  QsBarStackedTransitionData,
  QsBarStackedData,
} from './qsTypes'
import { linearBarStackConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const linearBarStack = {
  stack: (
    canvas: Canvas,
    data: QsBarStackedData,
    customConfig?: QsBarStackedConfig
  ): QsBarStack => {
    const config: BarStackedConfig = addDefaultsToConfig<BarStackedConfig>(
      { ...linearBarStackConfig },
      customConfig,
      { ...canvas.configStore.linear.barStackConfig() }
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  args: QsBarStackedData,
  config: BarStackedConfig
): QsBarStack => {
  const { data } = args

  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )
  const { fillOpacity, strokeColor, strokeWidth, strokeOpacity } = config
  const { className, dotClassName } = generateClassName('linearBarStacked')
  const { className: classNameStack, dotClassName: dotClassNameStack } =
    generateClassName('linearBarStack')

  const group = canvas.canvasDataGroup.append('g')
  const barStacks = group
    .selectAll(dotClassNameStack)
    .data(calculatedData)
    .enter()
    .append('g')
    .attr('class', classNameStack)
    .attr('id', (d) => d.groupId)
    .attr('fill', (d, i) => d.barData[i].fillColor)
  barStacks
    .selectAll(dotClassName)
    .data((d) => d.barData)
    .enter()
    .append('rect')
    .attr('class', className)
    .attr('id', (d) => d.id)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('height', (d) => d.height)
    .attr('width', (d) => d.width)
    .attr('fill-opacity', fillOpacity)
    .attr('stroke', strokeColor)
    .attr('stroke-opacity', strokeOpacity)
    .attr('stroke-width', strokeWidth)

  return {
    element: barStacks.selectAll(dotClassName),
    transition: (data: QsBarStackedTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data.data.data,
        config
      )

      const bars = canvas.canvasGroup
        .selectAll(dotClassName)
        .data(calculatedData)
      bars
        .selectAll(dotClassNameStack)
        .data((d) => d.barData)
        .attr('x', (d) => d.x)
        .attr('width', (d) => d.width)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('y', (d) => d.y)
        .attr('height', (d) => d.height)
    },
  }
}
