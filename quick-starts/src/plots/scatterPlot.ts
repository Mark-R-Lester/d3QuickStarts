import { Canvas } from '../canvas/canvas'
import { scaleLinear } from 'd3'
import { CoordinateEnhanced } from '../core/types'
import { findMaxCoordinateX, findMaxCoordinateY } from '../core/max'

export interface ScatterPlotConfig {
  [key: string]: string | undefined
}

interface ScatterPlotConfigStrict {
  [key: string]: string | undefined
}

interface DrawArgs {
  data: CoordinateEnhanced[]
}

const configuration: ScatterPlotConfigStrict = {}

const updateConfig = (customConfig?: ScatterPlotConfig) => {
  if (customConfig)
    Object.keys(customConfig).forEach(
      (key) => (configuration[key] = customConfig[key])
    )
}

const points = (
  canvas: Canvas,
  data: CoordinateEnhanced[],
  config?: ScatterPlotConfig
) => {
  updateConfig(config)
  const args: DrawArgs = { data }
  return draw(canvas, args, configuration)
}

export const plottedPointGenerator = {
  points,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: ScatterPlotConfigStrict
) => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { data } = args

  const xScale = scaleLinear()
    .domain([0, findMaxCoordinateX(data)])
    .range([0, displayAreaWidth])
  const yScale = scaleLinear()
    .domain([0, findMaxCoordinateY(data)])
    .range([displayAreaHeight, 0])
  const dataPoints = canvas.displayGroup.append('g')
  dataPoints
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'linePoint')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
    .attr('r', (d) => (d.radius ? d.radius : '3'))
    .attr('opacity', (d) => (d.opacity ? d.opacity / 100 : '1'))
  return { points: dataPoints }
}
