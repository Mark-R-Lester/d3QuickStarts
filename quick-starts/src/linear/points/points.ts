import { Selection } from 'd3'
import {
  QsCanvas,
  QsColorScaleData,
  QsTransitionArgs,
} from '../../d3QuickStart'
import { Meta, getMeta } from './meta'
import { DrawArgs, PointsConfigStrict, QsPointData } from './types'
import { GlobalDefaults, Orientation, ScaleType } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'

export interface QsPointsConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  radius?: number
  defaultColor?: string
  colorScaleData?: QsColorScaleData
}

export interface QsPointsTransitionData {
  data: QsPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsPointsTransitionData) => void
}

const addDefaultsToConfig = (
  customConfig?: QsPointsConfig
): PointsConfigStrict => {
  const defaults: PointsConfigStrict = {
    radius: 3,
    defaultColor: GlobalDefaults.DEFAULT_COLOR,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const horizontal = (
  canvas: QsCanvas,
  data: QsPointData[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    orientation: Orientation.HORIZONTAL,
    scaleType: ScaleType.LINEAR,
  }
  const config: PointsConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: QsCanvas,
  data: QsPointData[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    orientation: Orientation.VERTICAL,
    scaleType: ScaleType.LINEAR,
  }
  const config: PointsConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalBanded = (
  canvas: QsCanvas,
  data: QsPointData[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    orientation: Orientation.HORIZONTAL,
    scaleType: ScaleType.BANDED,
  }
  const config: PointsConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const verticalBanded = (
  canvas: QsCanvas,
  data: QsPointData[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    orientation: Orientation.VERTICAL,
    scaleType: ScaleType.BANDED,
  }
  const config: PointsConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const qsLinearPointGenerator = {
  horizontal,
  horizontalBanded,
  vertical,
  verticalBanded,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: PointsConfigStrict
): QsPoints => {
  const { radius } = config
  const { orientation, scaleType } = args

  const meta: Meta[] = getMeta(canvas, args, config)
  const group = canvas.displayGroup.append('g')

  group
    .selectAll('circle')
    .data(meta)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('cy', (d) => d.pointData.y)
    .attr('cx', (d) => d.pointData.x)
    .attr('r', radius)
    .attr('fill', (d) => d.color)

  const transition = (data: QsPointsTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = { data: data.data, orientation, scaleType }
    const meta: Meta[] = getMeta(canvas, drawArgs, config)

    if (orientation === Orientation.VERTICAL)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('cx', (d) => d.pointData.x)
        .attr('fill', (d) => d.color)
    else
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('cy', (d) => d.pointData.y)
        .attr('fill', (d) => d.color)
  }
  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: QsPointsTransitionData) => transition(data),
  }
}
