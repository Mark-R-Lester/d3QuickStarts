import { Canvas, CanvasConfigStrict } from "../canvas/canvas"
import { scaleLinear } from 'd3'
import { Selection } from 'd3-selection'
import { CoordinateEnhanced } from "../core/types"
import { findMaxCoordinateX, findMaxCoordinateY } from "../core/max"

export interface ScatterPlotConfig {
  [key: string]: string | undefined
}

export interface StrictScatterPlotConfig {
  [key: string]: string | undefined
}

export class ScatterPlot {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictScatterPlotConfig

  constructor(canvas: Canvas, customConfig: ScatterPlotConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {}
    this.updateConfig(customConfig)
  }

  updateConfig(customConfig: ScatterPlotConfig) {
    if(customConfig)
      Object.keys(customConfig).forEach(key => (this.config[key] = customConfig[key]))
  }

  addDataPoints(data: CoordinateEnhanced[]) {
    const { displayAreaHeight, displayAreaWidth } = this.canvasConfig;
    const xScale = scaleLinear()
      .domain([0, findMaxCoordinateX(data)])
      .range([0, displayAreaWidth])
    const yScale = scaleLinear()
      .domain([0, findMaxCoordinateY(data)])
      .range([displayAreaHeight, 0])
    const dataPoints = this.canvasDisplayGroup.append('g')
    dataPoints
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'linePoint')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', d => (d.radius ? d.radius : '3'))
      .attr('opacity', d => (d.opacity ? d.opacity / 100 : '1'))
    return { points: dataPoints }
  }
}
