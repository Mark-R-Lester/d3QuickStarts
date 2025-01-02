import { Selection } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { getMeta, Meta } from './meta'
import { DrawArgs } from './types'
import { GlobalDefaults, Orientation } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsBarConfig,
  QsBarConfigStrict,
  QsBarData,
  QsBars,
  QsBarTransitionData,
} from './qsTypes'

const addDefaultsToConfig = (customConfig?: QsBarConfig): QsBarConfigStrict => {
  const defauls: QsBarConfigStrict = {
    padding: 8,
    defaultColor: GlobalDefaults.DEFAULT_COLOR,
    colorScaleData: undefined,
  }
  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}
const horizontal = (
  canvas: Canvas,
  data: QsBarData[],
  customConfig?: QsBarConfig
): QsBars => {
  const args: DrawArgs = { data, orientation: Orientation.HORIZONTAL }
  const config: QsBarConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: Canvas,
  data: QsBarData[],
  customConfig?: QsBarConfig
): QsBars => {
  const args: DrawArgs = { data, orientation: Orientation.VERTICAL }
  const config: QsBarConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearBar = {
  horizontal,
  vertical,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: QsBarConfigStrict
): QsBars => {
  const { orientation } = args
  const meta: Meta[] = getMeta(canvas, args, config)

  const group: Selection<SVGGElement, unknown, HTMLElement, any> =
    canvas.displayGroup.append('g')
  group
    .selectAll('.bar')
    .data(meta)
    .enter()
    .append('rect')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('x', (d) => d.barData.x)
    .attr('y', (d) => d.barData.y)
    .attr('width', (d) => d.barData.width)
    .attr('height', (d) => d.barData.height)
    .attr('fill', (d) => d.barData.color)

  const transition = (data: QsBarTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = { data: data.data, orientation }
    const meta: Meta[] = getMeta(canvas, drawArgs, config)

    if (orientation === Orientation.VERTICAL)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('width', (d) => d.barData.width)
        .attr('x', (d) => d.barData.x)
        .attr('fill', (d) => d.barData.color)
    else
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
        .attr('fill', (d) => d.barData.color)
  }
  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: QsBarTransitionData) => transition(data),
  }
}
