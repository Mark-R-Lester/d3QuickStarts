import { Canvas } from '../canvas/canvas'
import { line } from 'd3'
import { v4 as uuidv4 } from 'uuid'

export interface RadialSpokesConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
  innerRadius?: number
  x?: number
  y?: number
  colour?: string
  strokeWidth?: number
}

interface RadialSpokesConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  innerRadius: number
  x: number
  y: number
  colour: string
  strokeWidth: number
}

interface DrawArgs {
  data: number
}

interface Meta {
  class: string
  id: string
  lineData: [number, number][]
}

const updateConfig = (
  customConfig?: RadialSpokesConfig
): RadialSpokesConfigStrict => {
  const defaults: RadialSpokesConfigStrict = {
    radius: 100,
    innerRadius: 0,
    x: 50,
    y: 50,
    colour: 'black',
    strokeWidth: 0.4,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const spokes = (
  canvas: Canvas,
  data: number,
  customConfig?: RadialSpokesConfig
) => {
  const config: RadialSpokesConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

const spokesMinimised = (
  canvas: Canvas,
  data: number,
  customConfig?: RadialSpokesConfig
) => {
  const config: RadialSpokesConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const radialSpokesGenerator = {
  spokes,
  spokesMinimised,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialSpokesConfigStrict
) => {
  const { radius, innerRadius, x, y, colour, strokeWidth } = config
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { data } = args
  const xCenter = (displayAreaWidth / 100) * x
  const yCenter = (displayAreaHeight / 100) * y

  const getMeta = (data: number) => {
    const meta: Meta[] = []
    for (let i = 0; i < data; i++) {
      const angle = ((Math.PI * 2) / data) * i
      const outerHypotenuse = ((displayAreaHeight / 2) * radius) / 100
      const innerHypotenuse = ((displayAreaHeight / 2) * innerRadius) / 100
      const outerX = Math.sin(angle) * outerHypotenuse + xCenter
      const outerY = Math.cos(angle) * outerHypotenuse + yCenter
      const innerX = Math.sin(angle) * innerHypotenuse + xCenter
      const innerY = Math.cos(angle) * innerHypotenuse + yCenter
      meta[i] = {
        class: 'axisSpoke',
        id: `axisSpoke${uuidv4()}`,
        lineData: [
          [innerX, innerY],
          [outerX, outerY],
        ],
      }
    }
    return meta
  }

  const meta: Meta[] = getMeta(data)

  const radialLine = line()
    .x((d) => d[0])
    .y((d) => d[1])

  const group = canvas.displayGroup.append('g')
  group
    .selectAll('path')
    .data(meta)
    .enter()
    .append('path')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('d', (d) => radialLine(d.lineData))
    .attr('stroke', colour)
    .attr('fill-opacity', '0')
    .attr('stroke-width', strokeWidth)

  return {
    spokes: group.selectAll(`.${meta[0].class}`),
    group,
    meta,
    transition: (data: number) => {
      const meta: Meta[] = getMeta(data)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta.map((d) => d.lineData))
        .transition()
        .duration(3000)
        .attr('d', radialLine)
    },
  }
}
