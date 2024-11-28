import { scaleLinear } from 'd3'
import { Canvas } from '../d3QuickStart'

export interface TextConfig {
  [key: string]: number | string | undefined
  font?: string
  fontSize?: number
  fill?: string
  stroke?: string
  alignmentBaseline?: string
  textAnchor?: string
  angle?: number
}

interface TextConfigStrict {
  [key: string]: number | string | undefined
  font: string
  fontSize: number
  fill: string
  stroke: string
  alignmentBaseline: string
  textAnchor: string
  angle: number
}

export interface TextArgs {
  x: number
  y: number
  text: string
}

interface DrawArgs {
  data: TextArgs[]
}

const updateConfig = (customConfig?: TextConfig): TextConfigStrict => {
  const defaults: TextConfigStrict = {
    font: 'sans-serif',
    fontSize: 4,
    fill: 'black',
    stroke: '',
    alignmentBaseline: 'middle',
    textAnchor: 'middle',
    angle: 0,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const text = (canvas: Canvas, data: TextArgs[], customConfig: TextConfig) => {
  const args: DrawArgs = { data }
  const config: TextConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const plottedTextGenerator = {
  text,
}

const draw = (canvas: Canvas, args: DrawArgs, config: TextConfigStrict) => {
  const { font, fontSize, stroke, fill, alignmentBaseline, textAnchor } = config
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const { data } = args

  const xScale = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yScale = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const text = canvas.displayGroup.append('g')
  text
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('font', font)
    .attr('fill', fill)
    .attr('stroke', stroke)
    .attr('font-size', `${yScale(fontSize)}px`)
    .attr('transform', (d) => {
      return `translate(${xScale(d.x)}, ${yScale(d.y)})rotate(${0})`
    })
    .style('text-anchor', textAnchor)
    .style('alignment-baseline', alignmentBaseline)
    .text((d) => d.text)
  return { text: text.selectAll('text') }
}
