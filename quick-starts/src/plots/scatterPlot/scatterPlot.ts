import { scaleLinear } from 'd3'
import { QsCoordinateEnhanced } from '../../core/types/qsTypes'
import { qsFindMaxCoordinateX, qsFindMaxCoordinateY } from '../../core/max'
import { Canvas } from '../../d3QuickStart'
import { QsScatterPlotConfig, QsScatterPlot } from './qsTypes'

interface ScatterPlotConfigStrict {
  [key: string]: string | undefined
}

interface DrawArgs {
  data: QsCoordinateEnhanced[]
}

const configuration: ScatterPlotConfigStrict = {}

export const plottedPoint = {
  points: (
    canvas: Canvas,
    data: QsCoordinateEnhanced[],
    config?: QsScatterPlotConfig
  ): QsScatterPlot => {
    const args: DrawArgs = { data }
    return draw(canvas, args, configuration)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: ScatterPlotConfigStrict
): QsScatterPlot => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { data } = args

  const xScale = scaleLinear()
    .domain([0, qsFindMaxCoordinateX(data)])
    .range([0, displayAreaWidth])
  const yScale = scaleLinear()
    .domain([0, qsFindMaxCoordinateY(data)])
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
  return { element: dataPoints }
}
