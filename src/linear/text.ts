import { scaleLinear } from 'd3'
import { Canvas, CanvasConfigStrict } from '../d3QuickStart'
import { Selection } from 'd3-selection'

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

export interface StrictTextConfig {
  [key: string]: number | string | undefined
  font: string
  fontSize: number
  fill: string
  stroke: string
  alignmentBaseline: string
  textAnchor: string
  angle: number
}

interface TextArgs {
  x: number
  y: number
  text: string
}

export class Text {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGSVGElement, unknown, HTMLElement, any>
  config: StrictTextConfig
 
  updateConfig(customConfig: TextConfig) {
    if(customConfig)
      Object.keys(customConfig).forEach(key => (this.config[key] = customConfig[key]))
  }
  constructor(canvas: Canvas, customeConfig: TextConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup
    this.config = {
      font: 'sans-serif',
      fontSize: 4,
      fill: 'black',
      stroke: '',
      alignmentBaseline: 'middle',
      textAnchor: 'middle',
      angle: 0
    }
    this.updateConfig(customeConfig)
  }

  text(data: TextArgs[]) {
    const { font, fontSize, stroke, fill, alignmentBaseline, textAnchor } = this.config
    const { displayAreaWidth, displayAreaHeight } = this.canvasConfig
    const xScale = scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth])
    const yScale = scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight])

    const text = this.canvasDisplayGroup.append('g')
    text
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('font', font)
      .attr('fill', fill)
      .attr('stroke', stroke)
      .attr('font-size', `${yScale(fontSize)}px`)
      .attr('transform', d => {
        return `translate(${xScale(d.x)}, ${yScale(d.y)})rotate(${0})`
      })
      .style('text-anchor', textAnchor)
      .style('alignment-baseline', alignmentBaseline)
      .text(d => d.text)
    return { text: text.selectAll('text') }
  }
}
