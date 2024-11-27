import { scaleLinear, curveLinear, CurveFactory, line as d3line } from 'd3'
import { Coordinate } from '../core/types'
import { findMaxCoordinateX, findMaxCoordinateY } from '../core/max'
import { Canvas } from '../d3QuickStart'

export interface LinePlotConfig {
  [key: string]: CurveFactory | undefined
  curve?: CurveFactory
}

interface LinePlotConfigStrict {
  [key: string]: CurveFactory | undefined
  curve: CurveFactory
}

interface DrawArgs {
  data: Coordinate[]
}

const updateConfig = (customConfig?: LinePlotConfig): LinePlotConfigStrict => {
  const defaults: LinePlotConfigStrict = {
    curve: curveLinear,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const line = (
  canvas: Canvas,
  data: Coordinate[],
  customConfig?: LinePlotConfig
) => {
  const config: LinePlotConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const plottedLineGenerator = {
  line,
}

const draw = (canvas: Canvas, args: DrawArgs, config: LinePlotConfigStrict) => {
  const { curve } = config
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const { data } = args

  const xScale = scaleLinear()
    .domain([0, findMaxCoordinateX(data)])
    .range([0, displayAreaWidth])
  const yScale = scaleLinear()
    .domain([0, findMaxCoordinateY(data)])
    .range([displayAreaHeight, 0])
  let line = d3line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))
    .curve(curve)

  let lineGroup = canvas.displayGroup.append('g')
  lineGroup
    .append('path')
    .attr('class', 'line')
    .attr('d', line(data.map((coordinate) => [coordinate.x, coordinate.y])))
    .attr('stroke', 'black')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('fill-opacity', '0')
    .attr('stroke-width', 1.5)
  return { line: lineGroup.select('.line') }
}
