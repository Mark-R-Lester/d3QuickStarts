import { Selection, range } from 'd3'
import {
  QsCanvas,
  QsColorDomainRange,
  QsColorName,
  QsTransitionArgs,
} from '../../d3QuickStart'
import { getMeta, Meta } from './meta'
import { DrawArgs, QsBarConfigStrict, QsBarArgs } from './types'
import { GlobalDefaults, Orientation } from '../../core/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
export { QsBarArgs as QsBarBoundries } from './types'

export interface QsBarConfig {
  [key: string]: number | QsColorName | QsColorDomainRange | undefined
  padding?: number
  color?: QsColorName | QsColorDomainRange
}

export interface QsBarTransitionData {
  data: QsBarArgs[]
  config?: QsBarConfig
  transitionArgs?: QsTransitionArgs
}

export interface QsBars {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsBarTransitionData) => void
}

const addDefaultsToConfig = (customConfig?: QsBarConfig): QsBarConfigStrict => {
  const defauls: QsBarConfigStrict = {
    padding: 8,
    color: { colorName: GlobalDefaults.DEFAULT_BAR_COLOR },
  }
  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}
const horizontal = (
  canvas: QsCanvas,
  data: QsBarArgs[],
  customConfig?: QsBarConfig
): QsBars => {
  const args: DrawArgs = { data, orientation: Orientation.HORIZONTAL }
  const config: QsBarConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: QsCanvas,
  data: QsBarArgs[],
  customConfig?: QsBarConfig
): QsBars => {
  const args: DrawArgs = { data, orientation: Orientation.VERTICAL }
  const config: QsBarConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const qsLinearBarGenerator = {
  horizontal,
  vertical,
}

const draw = (
  canvas: QsCanvas,
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
    else
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
  }
  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: QsBarTransitionData) => transition(data),
  }
}
