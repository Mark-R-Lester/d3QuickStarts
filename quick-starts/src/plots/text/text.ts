import { scaleLinear, Selection } from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { QsEnumAlignmentBaseline, QsEnumTextAnchor } from '../../core/qsEnums'

export interface QsTextConfig {
  [key: string]: number | string | undefined
  font?: string
  fontSize?: number
  fill?: string
  stroke?: string
  alignmentBaseline?: QsEnumAlignmentBaseline
  textAnchor?: QsEnumTextAnchor
  angle?: number
}

export interface QsText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}

export interface TextArgs {
  x: number
  y: number
  text: string
}

interface TextConfigStrict {
  [key: string]: number | string | undefined
  font: string
  fontSize: number
  fill: string
  stroke: string
  alignmentBaseline: QsEnumAlignmentBaseline
  textAnchor: QsEnumTextAnchor
  angle: number
}

interface DrawArgs {
  data: TextArgs[]
}

const addDefaultsToConfig = (customConfig?: QsTextConfig): TextConfigStrict => {
  const defaults: TextConfigStrict = {
    font: 'sans-serif',
    fontSize: 4,
    fill: 'black',
    stroke: '',
    alignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
    textAnchor: QsEnumTextAnchor.MIDDLE,
    angle: 0,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const text = (
  canvas: QsCanvas,
  data: TextArgs[],
  customConfig: QsTextConfig
): QsText => {
  const args: DrawArgs = { data }
  const config: TextConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const qsPlottedTextGenerator = {
  text,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: TextConfigStrict
): QsText => {
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
  return { element: text.selectAll('text') }
}
