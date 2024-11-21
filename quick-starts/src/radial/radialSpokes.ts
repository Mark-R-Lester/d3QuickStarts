import { Canvas, CanvasConfigStrict } from '../canvas/canvas'
import { Selection } from 'd3-selection'
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

interface RadialSpokeArgs {
  data: number[][]
  minimised: boolean
}

const configuration: RadialSpokesConfigStrict = {
  radius: 100,
  innerRadius: 0,
  x: 50,
  y: 50,
  colour: 'black',
  strokeWidth: 0.4,
}

const updateConfig = (customConfig?: RadialSpokesConfig) => {
  if (customConfig)
    Object.keys(customConfig).forEach(
      (key) => (configuration[key] = customConfig[key])
    )
}

const spokes = (
  canvas: Canvas,
  data: number[][],
  config?: RadialSpokesConfig
) => {
  updateConfig(config)
  const args: RadialSpokeArgs = { data, minimised: false }
  return draw(canvas, args, configuration)
}

const spokesMinimised = (
  canvas: Canvas,
  data: number[][],
  config?: RadialSpokesConfig
) => {
  updateConfig(config)
  const args: RadialSpokeArgs = { data, minimised: true }
  return draw(canvas, args, configuration)
}

export const radialSpokesGenerator = {
  spokes,
  spokesMinimised,
}

const draw = (
  canvas: Canvas,
  args: RadialSpokeArgs,
  config: RadialSpokesConfigStrict
) => {
  const { radius, innerRadius, x, y, colour, strokeWidth } = config
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { data, minimised } = args
  const xCenter = (displayAreaWidth / 100) * x
  const yCenter = (displayAreaHeight / 100) * y
  const meta: any[] = []

  data.map((d, i) => {
    const angle = ((Math.PI * 2) / data.length) * i
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
      lineDataMin: [
        [innerX, innerY],
        [innerX, innerY],
      ],
    }
  })

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
    .attr('d', (d) => radialLine(minimised ? d.lineDataMin : d.lineData))
    .attr('stroke', colour)
    .attr('fill-opacity', '0')
    .attr('stroke-width', strokeWidth)

  return {
    spokes: group.selectAll(`.${meta[0].class}`),
    group,
    meta,
    maximise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta.map((d) => d.lineData))
        .transition()
        .duration(3000)
        .attr('d', radialLine)
    },
    minimise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta.map((d) => d.lineDataMin))
        .transition()
        .duration(3000)
        .attr('d', radialLine)
    },
  }
}
