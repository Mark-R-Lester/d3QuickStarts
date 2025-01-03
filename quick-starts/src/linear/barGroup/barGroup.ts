import { schemePurples } from 'd3'
import { BarGroupConfigStrict } from './types'
import { Meta, getMeta } from './meta'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { Canvas } from '../../d3QuickStart'
import {
  QsBarGroupConfig,
  QsBarGroups,
  QsBarGroupTransitionData,
} from './qsTypes'

interface DrawArgs {
  data: number[][]
}

const addDefaultsToConfig = (
  customConfig?: QsBarGroupConfig
): BarGroupConfigStrict => {
  const defaults: BarGroupConfigStrict = {
    colorRange: schemePurples[4],
    padding: 20,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const linearBarGroup = {
  group: (
    canvas: Canvas,
    data: number[][],
    customConfig?: QsBarGroupConfig
  ): QsBarGroups => {
    const config: BarGroupConfigStrict = addDefaultsToConfig(customConfig)
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
  const meta: Meta[] = getMeta(canvas, data, config)

  const group = canvas.displayGroup.append('g')
  const barGroups = group
    .selectAll('.barGroup')
    .data(meta)
    .enter()
    .append('g')
    .attr('class', (d) => d.groupClass)
    .attr('id', (d) => d.groupId)
    .attr('fill', (d, i) => d.barData[i].color)
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
      const meta: Meta[] = getMeta(canvas, data.data, config)
      const bars = canvas.displayGroup.selectAll('.barGroup').data(meta)
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
