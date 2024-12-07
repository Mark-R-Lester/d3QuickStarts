import {
  scaleLinear,
  curveLinear,
  CurveFactory,
  area as d3area,
  Selection,
} from 'd3'
import { Canvas } from '../../canvas/canvas'
import { AreaData, getMeta, Meta } from './getMeta'
import { QsAreaData } from './types'

export { QsAreaData } from './types'
export interface QsAreaConfig {
  [key: string]: CurveFactory | string | undefined
  curve?: CurveFactory
  color?: string
}

export interface QsArea {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsAreaData) => void
}

interface AreaConfigStrict {
  [key: string]: CurveFactory | string | undefined
  curve: CurveFactory
  color: string
}

interface DrawArgs {
  data: QsAreaData
}

const addDefaultsToConfig = (customConfig?: QsAreaConfig): AreaConfigStrict => {
  const defaults: AreaConfigStrict = {
    curve: curveLinear,
    color: 'red',
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const horizontal = (
  canvas: Canvas,
  data: QsAreaData,
  customConfig?: QsAreaConfig
): QsArea => {
  const args: DrawArgs = {
    data: { lowerData: data.lowerData, higherData: data.higherData },
  }
  const config: AreaConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearAreaGenerator = {
  horizontal,
}

function draw(
  canvas: Canvas,
  args: DrawArgs,
  config: AreaConfigStrict
): QsArea {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaHeight,
    displayAreaWidth,
  } = canvas.config
  const { curve, color } = config
  const meta: Meta = getMeta(canvas, args.data)

  const xScale = scaleLinear()
    .domain([0, Math.max(...meta.areaData.map((d) => d.x))])
    .range([0, displayAreaWidth])
  const yScale = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0
        ? highestViewableValue
        : Math.max(...meta.areaData.map((d) => d.y1)),
    ])
    .range([displayAreaHeight, 0])

  const area = d3area<AreaData>()
    .x((d) => xScale(d.x))
    .y1((d) => yScale(d.y1))
    .y0((d) => yScale(d.y0))
    .curve(curve)

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', area(meta.areaData))
    .attr('fill', color)
  return {
    element: group.select(`.${meta.class}`),
    transition: (data: QsAreaData) => {
      const meta: Meta = getMeta(canvas, data)
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', area(meta.areaData))
    },
  }
}
