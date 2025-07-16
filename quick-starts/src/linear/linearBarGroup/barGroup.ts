import { BarGroupConfig } from './types'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { Canvas } from '../../core/canvas/canvas'
import {
  QsBarGroupConfig,
  QsBarGroupedData,
  QsBarGroups,
  QsBarGroupTransitionData,
} from './qsTypes'
import { linearBarGroupConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const linearBarGroup = {
  group: (
    canvas: Canvas,
    data: QsBarGroupedData,
    customConfig?: QsBarGroupConfig
  ): QsBarGroups => {
    const config: BarGroupConfig = addDefaultsToConfig<BarGroupConfig>(
      linearBarGroupConfig,
      customConfig,
      canvas.configStore.linear.barGroupConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  args: QsBarGroupedData,
  config: BarGroupConfig
): QsBarGroups => {
  const { data } = args
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )
  const { fillOpacity, strokeColor, strokeWidth, strokeOpacity } = config
  const { className, dotClassName } = generateClassName('linearBarGrouped')
  const { className: classNameGroup, dotClassName: dotClassNameGroup } =
    generateClassName('linearBarGroup')

  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  const barGroups = group
    .selectAll(dotClassNameGroup)
    .data(calculatedData)
    .enter()
    .append('g')
    .attr('class', classNameGroup)
    .attr('id', (d) => d.groupId)
    .attr('fill', (d, i) => d.barData[i].fillColor)
  barGroups
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
    element: barGroups.selectAll(dotClassName),
    transition: (data: QsBarGroupTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data.data.data,
        config
      )
      const bars = canvas.canvasGroup
        .selectAll(dotClassNameGroup)
        .data(calculatedData)
      bars
        .selectAll(dotClassName)
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
