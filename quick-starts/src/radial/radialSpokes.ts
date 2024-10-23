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

export interface StrictRadialSpokesConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  innerRadius: number
  x: number
  y: number
  colour: string
  strokeWidth: number
}

export class RadialSpokes {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictRadialSpokesConfig

  updateConfig(customConfig: RadialSpokesConfig) {
    if (customConfig)
      Object.keys(customConfig).forEach(
        (key) => (this.config[key] = customConfig[key])
      )
  }
  constructor(canvas: Canvas, customConfig: RadialSpokesConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup
    this.config = {
      radius: 100,
      innerRadius: 0,
      x: 50,
      y: 50,
      colour: 'black',
      strokeWidth: 0.4,
    }
    this.updateConfig(customConfig)
  }

  spokes(data: number[][], shrunken: boolean) {
    const { radius, innerRadius, x, y, colour, strokeWidth } = this.config
    const { displayAreaHeight, displayAreaWidth } = this.canvasConfig
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

    const group = this.canvasDisplayGroup.append('g')
    group
      .selectAll('path')
      .data(meta)
      .enter()
      .append('path')
      .attr('class', (d) => d.class)
      .attr('id', (d) => d.id)
      .attr('d', (d) => radialLine(shrunken ? d.lineDataMin : d.lineData))
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

  spokesMinimised(data: number[][]) {
    return this.spokes(data, true)
  }
}
