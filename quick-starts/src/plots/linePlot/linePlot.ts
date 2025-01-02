import { scaleLinear, line as d3line } from 'd3'
import { QsCoordinate } from '../../core/types/qsTypes'
import { qsFindMaxCoordinateX, qsFindMaxCoordinateY } from '../../core/max'
import { Canvas } from '../../d3QuickStart'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'
import { QsLinePlotConfig, QsLinePlot } from './qsTypes'

interface LinePlotConfigStrict {
  [key: string]: QsEnumCurve | undefined
  curve: QsEnumCurve
}

interface DrawArgs {
  data: QsCoordinate[]
}

const addDefaultsToConfig = (
  customConfig?: QsLinePlotConfig
): LinePlotConfigStrict => {
  const defaults: LinePlotConfigStrict = {
    curve: QsEnumCurve.LINEAR,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const line = (
  canvas: Canvas,
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
  canvas: Canvas,
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
    .curve(constantsCurves[curve])

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
