import { BarGroupConfig } from './types'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { Canvas } from '../../canvas/types'
import {
  QsBarGroupConfig,
  QsBarGroupedData,
  QsBarGroups,
  QsBarGroupTransitionData,
} from './qsTypes'
import { orthogonalBarGroupConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const orthogonalBarGroup = {
  group: (
    canvas: Canvas,
    data: QsBarGroupedData,
    customConfig?: QsBarGroupConfig
  ): QsBarGroups => {
    const config: BarGroupConfig = addDefaultsToConfig<BarGroupConfig>(
      orthogonalBarGroupConfig,
      customConfig,
      canvas.configStore.orthogonal.barGroupConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsBarGroupedData,
  config: BarGroupConfig
): QsBarGroups => {
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data.data,
    config
  )
  const { fillOpacity, strokeColor, strokeWidth, strokeOpacity } = config
  const { className, dotClassName } = generateClassName('orthogonalBarGrouped')
  const { className: classNameGroup, dotClassName: dotClassNameGroup } =
    generateClassName('orthogonalBarGroup')

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

  const transition = (transitionData: QsBarGroupTransitionData = { data }) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      transitionData.data.data,
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
  }

  return {
    element: barGroups.selectAll(dotClassName),
    transition,
  }
}
