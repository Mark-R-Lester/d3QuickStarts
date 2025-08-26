import { BarStackedConfig, CalculatedData } from './types'
import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/types'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsBarStackedConfig,
  QsBarStack,
  QsBarStackedTransitionData,
  QsBarStackedData,
} from './qsTypes'
import { orthogonalBarStackConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const orthogonalBarStack = {
  stack: (
    canvas: Canvas,
    data: QsBarStackedData[][],
    customConfig?: QsBarStackedConfig
  ): QsBarStack => {
    const config: BarStackedConfig = addDefaultsToConfig<BarStackedConfig>(
      orthogonalBarStackConfig,
      customConfig,
      canvas.configStore.orthogonal.barStackConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsBarStackedData[][],
  config: BarStackedConfig
): QsBarStack => {
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )
  const { className, dotClassName } = generateClassName('orthogonalBarStacked')
  const { className: classNameStack, dotClassName: dotClassNameStack } =
    generateClassName('orthogonalBarStack')

  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  const barStacks = group
    .selectAll(dotClassNameStack)
    .data(calculatedData)
    .enter()
    .append('g')
    .attr('class', classNameStack)
    .attr('id', (d) => d.groupId)

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
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-width', (d) => d.strokeWidth)

  const transition = (
    transitionData: QsBarStackedTransitionData = { data }
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      transitionData.data,
      config
    )

    const bars = canvas.canvasGroup.selectAll(dotClassName).data(calculatedData)
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
  }

  return {
    element: barStacks.selectAll(dotClassName),
    transition,
  }
}
