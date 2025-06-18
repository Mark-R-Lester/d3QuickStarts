import { BarStackedConfig } from './types'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/canvas'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsBarStackedConfig,
  QsBarStack,
  QsBarStackedTransitionData,
} from './qsTypes'
import { linearBarStackConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'

interface DrawArgs {
  data: number[][]
}

export const linearBarStack = {
  stack: (
    canvas: Canvas,
    data: number[][],
    customConfig?: QsBarStackedConfig
  ): QsBarStack => {
    const config: BarStackedConfig = addDefaultsToConfig<BarStackedConfig>(
      { ...linearBarStackConfig },
      customConfig,
      { ...canvas.configStore.linear.barStackConfig() }
    )
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: BarStackedConfig
): QsBarStack => {
  const { data } = args

  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const group = canvas.displayGroup.append('g')
  const barStacks = group
    .selectAll(`${'.barStack'}`)
    .data(calculatedData)
    .enter()
    .append('g')
    .attr('class', (d) => d.stackClass)
    .attr('id', (d) => d.groupId)
    .attr('fill', (d, i) => d.barData[i].fillColor)
  barStacks
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
    element: barStacks.selectAll(`${'.barStacked'}`),
    transition: (data: QsBarStackedTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data.data,
        config
      )

      const bars = canvas.displayGroup
        .selectAll(`${'.barStack'}`)
        .data(calculatedData)
      bars
        .selectAll(`${'.barStacked'}`)
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
