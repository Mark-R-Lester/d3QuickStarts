import { Selection } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { Meta, getMeta } from './getMeta'
import { DrawArgs } from './types'
import { Orientation, ScaleType } from '../../core/enums'

export interface QsPointsConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
}

export interface QsPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[]) => void
}

interface PointsConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
}

const addDefaultsToConfig = (
  customConfig?: QsPointsConfig
): PointsConfigStrict => {
  const defaults: PointsConfigStrict = {
    radius: 3,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const horizontal = (
  canvas: Canvas,
  data: number[],
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
  canvas: Canvas,
  data: number[],
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
  canvas: Canvas,
  data: number[],
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
  canvas: Canvas,
  data: number[],
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

export const linearPointGenerator = {
  horizontal,
  horizontalBanded,
  vertical,
  verticalBanded,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: PointsConfigStrict
): QsPoints => {
  const { radius } = config
  const { orientation, scaleType } = args

  const meta: Meta[] = getMeta(canvas, args, radius)
  const group = canvas.displayGroup.append('g')

  group
    .selectAll('circle')
    .data(meta)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('cy', (d) => d.pointData[1])
    .attr('cx', (d) => d.pointData[0])
    .attr('r', (d) => d.radius)
  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: number[]) => {
      const args: DrawArgs = { data, orientation, scaleType }
      const meta: Meta[] = getMeta(canvas, args, radius)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('cy', (d) => d.pointData[1])
        .attr('r', (d) => d.radius)
    },
  }
}
