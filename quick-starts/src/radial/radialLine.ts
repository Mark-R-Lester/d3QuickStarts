import { Canvas } from '../canvas/canvas'
import { scaleLinear, curveLinear, CurveFactory, lineRadial } from 'd3'

export interface RadialLineConfig {
  [key: string]: number | CurveFactory | undefined
  x?: number
  y?: number
  curve?: CurveFactory
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
  lineDataMin: Iterable<[number, number]>
  lineData: Iterable<[number, number]>
}

interface DrawArgs {
  data: number[]
  minimised: boolean
}

const configuration: RadialLineConfigStrict = {
  curve: curveLinear,
  x: 50,
  y: 50,
}

const updateConfig = (customConfig?: RadialLineConfig) => {
  if (customConfig)
    Object.keys(customConfig).forEach(
      (key) => (configuration[key] = customConfig[key])
    )
}

const line = (canvas: Canvas, data: number[], config?: RadialLineConfig) => {
  updateConfig(config)
  const args: DrawArgs = { data, minimised: false }
  return draw(canvas, args, configuration)
}

const lineMinimised = (
  canvas: Canvas,
  data: number[],
  config?: RadialLineConfig
) => {
  updateConfig(config)
  const args: DrawArgs = { data, minimised: true }
  return draw(canvas, args, configuration)
}

export const radialLineGenerator = {
  line,
  lineMinimised,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialLineConfigStrict
) => {
  const { x, y, curve } = config
  const { min, max, displayAreaHeight, displayAreaWidth } = canvas.config
  const { data, minimised } = args

  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([min, max])
    .range([0, displayAreaHeight / 2])
  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const dataCopy = data.slice()
  dataCopy.push(data[0])

  const meta: Meta = {
    class: 'radialLine',
    id: 'radialLine',
    lineDataMin: dataCopy.map((d, i) => [angleScale(i), 0]),
    lineData: dataCopy.map((d, i) => [angleScale(i), radialScale(d)]),
  }

  const radialLine = lineRadial().curve(curve)
  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', radialLine(minimised ? meta.lineDataMin : meta.lineData))
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
  return {
    line: group.selectAll(`.${meta.class}`),
    group,
    meta,
    maximise: () => {
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialLine(meta.lineData))
    },
    minimise: () => {
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialLine(meta.lineDataMin))
    },
  }
}
