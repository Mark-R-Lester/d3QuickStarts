import {
  scaleLinear,
  curveLinear,
  CurveFactory,
  Selection,
  line as d3line,
} from 'd3'
import { QsCoordinate } from '../../core/qsTypes'
import { qsFindMaxCoordinateX, qsFindMaxCoordinateY } from '../../core/max'
import { QsCanvas } from '../../d3QuickStart'

export interface QsLinePlotConfig {
  [key: string]: CurveFactory | undefined
  curve?: CurveFactory
}

export interface QsLinePlot {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}

interface LinePlotConfigStrict {
  [key: string]: CurveFactory | undefined
  curve: CurveFactory
}

interface DrawArgs {
  data: QsCoordinate[]
}

const addDefaultsToConfig = (
  customConfig?: QsLinePlotConfig
): LinePlotConfigStrict => {
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
  canvas: QsCanvas,
  data: QsCoordinate[],
  customConfig?: QsLinePlotConfig
): QsLinePlot => {
  const config: LinePlotConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const qsPlottedLineGenerator = {
  line,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: LinePlotConfigStrict
): QsLinePlot => {
  const { curve } = config
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const { data } = args

  const xScale = scaleLinear()
    .domain([0, qsFindMaxCoordinateX(data)])
    .range([0, displayAreaWidth])
  const yScale = scaleLinear()
    .domain([0, qsFindMaxCoordinateY(data)])
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
  return { element: lineGroup.select('.line') }
}
