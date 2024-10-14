import { Canvas, CanvasConfigStrict } from "../canvas/canvas"
import { scaleLinear, curveLinear, CurveFactory, line as d3line } from 'd3'
import { Selection } from 'd3-selection'
import { Coordinate } from "../core/types"
import { findMaxCoordinateX, findMaxCoordinateY } from "../core/max"

export interface LinePlotConfig {
  [key: string]: CurveFactory | undefined
  curve?: CurveFactory
}

export interface StrictLinePlotConfig {
  [key: string]: CurveFactory | undefined
  curve: CurveFactory
}

export class LinePlot {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGSVGElement, unknown, HTMLElement, any>
  config: StrictLinePlotConfig

  constructor(canvas: Canvas, customConfig: LinePlotConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {
      curve: curveLinear
    }
    this.updateConfig(customConfig)
  }

  updateConfig(customConfig: LinePlotConfig) {
    if(customConfig)
      Object.keys(customConfig).forEach(key => (this.config[key] = customConfig[key]))
  }

  line(coordinates: Coordinate[]) {
    const { curve } = this.config
    const { displayAreaWidth, displayAreaHeight } = this.canvasConfig
    const xScale = scaleLinear()
      .domain([0, findMaxCoordinateX(coordinates)])
      .range([0, displayAreaWidth])
    const yScale = scaleLinear()
      .domain([0, findMaxCoordinateY(coordinates)])
      .range([displayAreaHeight, 0])
    let line = d3line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(curve)

    let lineGroup = this.canvasDisplayGroup.append('g')
    lineGroup
      .append('path')
      .attr('class', 'line')
      .attr('d', line(coordinates.map(coordinate => [coordinate.x, coordinate.y])))
      .attr('stroke', 'black')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('fill-opacity', '0')
      .attr('stroke-width', 1.5)
    return { line: lineGroup.select('.line') }
  }
}
