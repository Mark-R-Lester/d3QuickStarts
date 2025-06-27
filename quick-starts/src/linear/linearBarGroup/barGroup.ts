import { BarGroupConfig } from './types'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { Canvas } from '../../core/canvas/canvas'
import {
  QsBarGroupConfig,
  QsBarGroups,
  QsBarGroupTransitionData,
} from './qsTypes'
import { linearBarGroupConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

interface DrawArgs {
  data: number[][]
}

export const linearBarGroup = {
  group: (
    canvas: Canvas,
    data: number[][],
    customConfig?: QsBarGroupConfig
  ): QsBarGroups => {
    const config: BarGroupConfig = addDefaultsToConfig<BarGroupConfig>(
      { ...linearBarGroupConfig },
      customConfig,
      { ...canvas.configStore.linear.barGroupConfig() }
    )
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: BarGroupConfig
): QsBarGroups => {
  const { data } = args
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )
  const { className, dotClassName } = generateClassName('linearBarGrouped')
  const { className: classNameGroup, dotClassName: dotClassNameGroup } =
    generateClassName('linearBarGroup')

  const group = canvas.canvasDataGroup.append('g')
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

  return {
    element: barGroups.selectAll(dotClassName),
    transition: (data: QsBarGroupTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data.data,
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
