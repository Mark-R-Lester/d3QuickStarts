import { BarGroupConfigStrict } from './types'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { Canvas } from '../../d3QuickStart'
import {
  QsBarGroupConfig,
  QsBarGroups,
  QsBarGroupTransitionData,
} from './qsTypes'
import { linearBarGroupConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'

interface DrawArgs {
  data: number[][]
}

export const linearBarGroup = {
  group: (
    canvas: Canvas,
    data: number[][],
    customConfig?: QsBarGroupConfig
  ): QsBarGroups => {
    const config: BarGroupConfigStrict =
      addDefaultsToConfig<BarGroupConfigStrict>(
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
  config: BarGroupConfigStrict
): QsBarGroups => {
  const { data } = args
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const group = canvas.displayGroup.append('g')
  const barGroups = group
    .selectAll('.barGroup')
    .data(calculatedData)
    .enter()
    .append('g')
    .attr('class', (d) => d.groupClass)
    .attr('id', (d) => d.groupId)
    .attr('fill', (d, i) => d.barData[i].fillColor)
  barGroups
    .selectAll('rect')
    .data((d) => d.barData)
    .enter()
    .append('rect')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('height', (d) => d.height)
    .attr('width', (d) => d.width)

  return {
    element: barGroups.selectAll('.barGrouped'),
    transition: (data: QsBarGroupTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data.data,
        config
      )
      const bars = canvas.displayGroup
        .selectAll('.barGroup')
        .data(calculatedData)
      bars
        .selectAll('.barGrouped')
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
