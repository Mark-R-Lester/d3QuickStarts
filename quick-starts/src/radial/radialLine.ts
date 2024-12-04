import { Canvas } from '../canvas/canvas'
import {
  scaleLinear,
  curveLinear,
  CurveFactory,
  lineRadial,
  Selection,
} from 'd3'

export interface QsRadialLineConfig {
  [key: string]: number | CurveFactory | undefined
  x?: number
  y?: number
  curve?: CurveFactory
}

export interface QsRadialLine {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[]) => void
}

interface RadialLineConfigStrict {
  [key: string]: number | CurveFactory | undefined
  x: number
  y: number
  curve: CurveFactory
}

interface Meta {
  class: string
  id: string
  lineData: Iterable<[number, number]>
}

interface DrawArgs {
  data: number[]
}

const updateConfig = (
  customConfig?: QsRadialLineConfig
): RadialLineConfigStrict => {
  const defaults: RadialLineConfigStrict = {
    curve: curveLinear,
    x: 50,
    y: 50,
  }

  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const line = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsRadialLineConfig
): QsRadialLine => {
  const config: RadialLineConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const radialLineGenerator = {
  line,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialLineConfigStrict
): QsRadialLine => {
  const { x, y, curve } = config
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaHeight,
    displayAreaWidth,
  } = canvas.config
  const { data } = args

  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])
  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const getMeta = (data: number[]): Meta => {
    const dataCopy = data.slice()
    dataCopy.push(data[0])
    return {
      class: 'radialLine',
      id: 'radialLine',
      lineData: dataCopy.map((d, i) => [angleScale(i), radialScale(d)]),
    }
  }

  const meta: Meta = getMeta(data)

  const radialLine = lineRadial().curve(curve)
  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', radialLine(meta.lineData))
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
  return {
    element: group.selectAll(`.${meta.class}`),
    transition: (data: number[]) => {
      const meta: Meta = getMeta(data)
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialLine(meta.lineData))
    },
  }
}
