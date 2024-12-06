import {
  scaleLinear,
  curveLinear,
  CurveFactory,
  area as d3area,
  Selection,
} from 'd3'
import { Canvas } from '../../canvas/canvas'
import { getMeta, Meta } from './getMeta'
import { AreaData } from './types'

export { AreaData } from './types'
export interface QsAreaConfig {
  [key: string]: CurveFactory | string | undefined
  curve?: CurveFactory
  color?: string
}

export interface QsArea {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: AreaData) => void
}

interface AreaConfigStrict {
  [key: string]: CurveFactory | string | undefined
  curve: CurveFactory
  color: string
}

interface DrawArgs {
  data: AreaData
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
  data: AreaData,
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
  const meta: Meta[] = getMeta(canvas, args.data)

  const xScale = scaleLinear()
    .domain([0, Math.max(...meta[0].areaData.map((d) => d[0]))])
    .range([0, displayAreaWidth])
  const yScale = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0
        ? highestViewableValue
        : Math.max(...meta[0].areaData.map((d) => d[1])),
    ])
    .range([displayAreaHeight, 0])

  const area = d3area<number[]>()
    .x((d) => xScale(d[0]))
    .y1((d) => yScale(d[1]))
    .y0((d) => yScale(d[2]))
    .curve(curve)

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta[0].class)
    .attr('id', meta[0].id)
    .attr('d', area(meta[0].areaData))
    .attr('fill', color)
  return {
    element: group.select(`.${meta[0].class}`),
    transition: (data: AreaData) => {
      getMeta(canvas, data)
      group
        .selectAll(`.${meta[0].class}`)
        .transition()
        .duration(3000)
        .attr('d', area(meta[0].areaData))
    },
  }
}
