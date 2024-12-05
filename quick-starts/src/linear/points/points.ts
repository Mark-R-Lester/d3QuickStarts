import { scaleLinear, scaleBand, NumberValue, range, Selection } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { Meta, getMeta } from './getMeta'

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

interface DrawArgs {
  data: number[]
  vertical: boolean
  banded: boolean
}

const updateConfig = (customConfig?: QsPointsConfig): PointsConfigStrict => {
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
    vertical: false,
    banded: false,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: false,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalBanded = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: true,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const verticalBanded = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: true,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
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
  const { data, vertical, banded } = args

  const meta: Meta[] = getMeta(canvas, data, vertical, banded, radius)
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
      const meta: Meta[] = getMeta(canvas, data, vertical, banded, radius)
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
