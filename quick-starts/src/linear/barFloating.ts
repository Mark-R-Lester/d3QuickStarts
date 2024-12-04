import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  NumberValue,
  ScaleOrdinal,
  Selection,
  range,
} from 'd3'
import { Canvas } from '../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../core/conversion'
import { findMax } from '../core/max'

export interface QsBarFloatingConfig {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding?: number
  colorDomain?: number[]
  colorRange?: Iterable<unknown>
}

export interface QsBarsFloating {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[][]) => void
}

interface QsBarFloatingConfigStrict {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding: number
  colorDomain: number[]
  colorRange: Iterable<unknown>
}

interface DrawArgs {
  data: number[][]
  vertical: boolean
}

interface BarData {
  x: number
  y: number
  height: number
  width: number
  color: string
}
interface Meta {
  class: string
  id: string
  barData: BarData
}

const updateConfig = (
  customConfig?: QsBarFloatingConfig
): QsBarFloatingConfigStrict => {
  const defauls: QsBarFloatingConfigStrict = {
    padding: 8,
    colorDomain: range(4),
    colorRange: ['purple'],
  }
  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}
const horizontal = (
  canvas: Canvas,
  data: number[][],
  customConfig?: QsBarFloatingConfig
): QsBarsFloating => {
  const args: DrawArgs = { data, vertical: false }
  const config: QsBarFloatingConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: Canvas,
  data: number[][],
  customConfig?: QsBarFloatingConfig
): QsBarsFloating => {
  const args: DrawArgs = { data, vertical: true }
  const config: QsBarFloatingConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearBarFloatingGenerator = {
  horizontal,
  vertical,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: QsBarFloatingConfigStrict
): QsBarsFloating => {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaWidth,
    displayAreaHeight,
  } = canvas.config
  const { padding, colorDomain, colorRange } = config
  const { data, vertical } = args
  const colors = scaleOrdinal().domain(toStrings(colorDomain)).range(colorRange)

  const bandStepScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, vertical ? displayAreaHeight : displayAreaWidth])
  const bandWidthScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, vertical ? displayAreaHeight : displayAreaWidth])
    .padding(padding / 100)
  const heightScale = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0 ? highestViewableValue : findMax(data),
    ])
    .range([0, vertical ? displayAreaWidth : displayAreaHeight])

  const barSpaceing = (d: NumberValue[], i: number) => {
    const adjustmentToCorrectD3 =
      (bandStepScale.step() - bandWidthScale.bandwidth()) / 2
    //TODO requires error handling
    const bandStep = bandStepScale(i.toString())
    if (bandStep) return bandStep + adjustmentToCorrectD3
    return 0
  }
  const x = (d: NumberValue[], i: number) =>
    vertical ? heightScale(d[0]) : barSpaceing(d, i)
  const y = (d: NumberValue[], i: number) =>
    vertical ? barSpaceing(d, i) : displayAreaHeight - heightScale(d[1])
  const height = (d: number[]) =>
    vertical ? bandWidthScale.bandwidth() : heightScale(d[1] - d[0])
  const width = (d: number[]) =>
    vertical ? heightScale(d[1] - d[0]) : bandWidthScale.bandwidth()

  const getColor = (
    i: number,
    colorScale: ScaleOrdinal<string, unknown, never>
  ): string => {
    let c: string | unknown = colorScale(i.toString())
    //TODO if c is not a string throw.
    return typeof c == 'string' ? c : '#cbc9e2'
  }

  const getMeta = (data: number[][]): Meta[] => {
    const meta: Meta[] = []
    data.forEach((d, i) => {
      const barData: BarData = {
        x: x(d, i),
        y: y(d, i),
        height: height(d),
        width: width(d),
        color: getColor(i, colors),
      }
      meta.push({
        class: 'bar',
        id: `bar-${uuidv4()}`,
        barData,
      })
    })
    return meta
  }
  const meta: Meta[] = getMeta(data)

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
  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: number[][]) => {
      const meta: Meta[] = getMeta(data)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
    },
  }
}
