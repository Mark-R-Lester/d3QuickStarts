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

const configuration: TextConfigStrict = {
  font: 'sans-serif',
  fontSize: 4,
  fill: 'black',
  stroke: '',
  alignmentBaseline: 'middle',
  textAnchor: 'middle',
  angle: 0,
}

interface DrawArgs {
  data: TextArgs[]
}

const updateConfig = (customConfig?: TextConfig) => {
  if (customConfig)
    Object.keys(customConfig).forEach(
      (key) => (configuration[key] = customConfig[key])
    )
}

const text = (canvas: Canvas, data: TextArgs[], config: TextConfig) => {
  updateConfig(config)
  const args: DrawArgs = { data }
  return draw(canvas, args, configuration)
}

export const linearTextGenerator = {
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
