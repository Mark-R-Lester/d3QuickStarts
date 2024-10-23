import { Canvas, CanvasConfigStrict } from '../canvas/canvas'
import { Selection } from 'd3-selection'
import { scaleLinear } from 'd3-scale'

export interface LegendConfig {
  [key: string]: number | string | undefined
  size?: number
  space?: number
  x?: number
  y?: number
  font?: string
  fill?: string
  stroke?: string
  alignmentBaseline?: string
  textAnchor?: string
  angle?: number
}

interface StrictLegendConfig {
  [key: string]: number | string | undefined
  size: number
  space: number
  x: number
  y: number
  font: string
  fill: string
  stroke: string
  alignmentBaseline: string
  textAnchor: string
  angle: number
}

export interface LegendArgs {
  data: string[][]
  minimised: boolean
}

interface LegendData {
  x: number
  y: number
  tx: number
  ty: number
  width: number
  height: number
  colour: string
  value: string
}

interface LegendMeta {
  dataMin: LegendData[]
  data: LegendData[]
}

export class Legend {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictLegendConfig

  updateConfig(customConfig: LegendConfig) {
    if (customConfig)
      Object.keys(customConfig).forEach(
        (key) => (this.config[key] = customConfig[key])
      )
  }

  constructor(canvas: Canvas, customConfig: LegendConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {
      size: 3,
      space: 10,
      x: 0,
      y: 0,
      font: 'sansserif',
      fill: 'black',
      stroke: '',
      alignmentBaseline: 'middle',
      textAnchor: 'start',
      angle: 0,
    }
    this.updateConfig(customConfig)
  }

  draw(args: LegendArgs) {
    const meta: LegendMeta[] = []
    const { data, minimised } = args
    const { min, max, displayAreaWidth, displayAreaHeight } = this.canvasConfig
    const {
      size,
      space,
      x,
      y,
      textFill,
      textStroke,
      alignmentBaseline,
      textAnchor,
      font,
    } = this.config

    const xScale = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
    const yScale = scaleLinear().domain([0, 100]).range([displayAreaHeight, 0])
    const percentScale = scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight])

    meta.push({
      dataMin: data.map((d, i) => {
        return {
          x: xScale(x),
          y: yScale(y + size + space * i),
          tx: xScale(x + size + space),
          ty: yScale(y + size * 0.5 + space * i),
          width: xScale(size),
          height: xScale(size),
          colour: d[0],
          value: d[1],
        }
      }),
      data: data.map((d, i) => {
        return {
          x: xScale(x),
          y: yScale(y + size + space * i),
          tx: xScale(x + size * 1.3),
          ty: yScale(y + space * i),
          width: xScale(size),
          height: xScale(size),
          colour: d[0],
          value: d[1],
        }
      }),
    })

    const group = this.canvasDisplayGroup.append('g')
    group
      .selectAll('.legend')
      .data(minimised ? meta[0].dataMin : meta[0].data)
      .enter()
      .append('rect')
      .attr('class', 'legend')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .attr('fill', (d) => d.colour)

    group
      .selectAll('text')
      .data(minimised ? meta[0].dataMin : meta[0].data)
      .enter()
      .append('text')
      .attr('font', font)
      .attr('fill', textFill ? textFill : null)
      .attr('stroke', textStroke ? textStroke : null)
      .attr('fontsize', `${percentScale(size)}px`)
      .attr('transform', (d) => {
        return `translate(${d.tx}, ${d.ty})rotate(${0})`
      })
      .style('textanchor', textAnchor)
      .style('alignmentbaseline', alignmentBaseline)
      .text((d) => d.value)

    return {
      element: group.selectAll('.element'),
      group,
      meta,
      minimised: () => {},
      maximised: () => {},
    }
  }

  legend(data: string[][]) {
    return this.draw({ data, minimised: false })
  }

  legendMinimised(data: string[][]) {
    return this.draw({ data, minimised: true })
  }
}
