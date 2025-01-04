import { line as d3line } from 'd3'
import { QsCoordinate } from '../../core/types/qsTypes'
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

export const plottedLine = {
  line: (
    canvas: Canvas,
    data: QsCoordinate[],
    customConfig?: QsLinePlotConfig
  ): QsLinePlot => {
    const config: LinePlotConfigStrict = addDefaultsToConfig(customConfig)
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: LinePlotConfigStrict
): QsLinePlot => {
  const { curve } = config
  const { xDataScalePlotted, yDataScalePlotted } = canvas.scales
  const { data } = args

  let line = d3line()
    .x((d) => xDataScalePlotted(d[0]))
    .y((d) => yDataScalePlotted(d[1]))
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
