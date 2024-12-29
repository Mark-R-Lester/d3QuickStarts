import { getMeta, Meta } from './meta'
import { Selection, scaleLinear } from 'd3'
import {
  QsCanvas,
  QsColorScaleData,
  QsTransitionArgs,
} from '../../d3QuickStart'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsRadialPointData, RadialPointsConfigStrict } from './types'
import { GlobalDefaults } from '../../core/enums/enums'
export { QsRadialPointData } from './types'

export interface QsRadialPointsConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  x?: number
  y?: number
  pointRadius?: number
  defaultColor?: string
  colorScaleData?: QsColorScaleData
}

export interface QsRadialPointsTransitionData {
  data: QsRadialPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialPointsTransitionData) => void
}

interface DrawArgs {
  data: QsRadialPointData[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialPointsConfig
): RadialPointsConfigStrict => {
  const defaults: RadialPointsConfigStrict = {
    x: 50,
    y: 50,
    pointRadius: 1.2,
    defaultColor: GlobalDefaults.DEFAULT_COLOR,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const points = (
  canvas: QsCanvas,
  data: QsRadialPointData[],
  customConfig?: QsRadialPointsConfig
): QsRadialPoints => {
  const config: RadialPointsConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const qsRadialPointGenerator = {
  points,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: RadialPointsConfigStrict
): QsRadialPoints => {
  const { x, y, pointRadius } = config
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { data } = args
  const meta: Meta[] = getMeta(canvas, data, config)

  const xScale = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yScale = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const dataPoints = canvas.displayGroup.append('g')
  dataPoints
    .selectAll('circle')
    .data(meta)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('cx', (d) => d.pointData[0])
    .attr('cy', (d) => d.pointData[1])
    .attr('fill', (d) => d.color)
    .attr('r', yScale(pointRadius))
    .attr('transform', `translate(${xScale(x)}, ${yScale(y)})`)
  return {
    element: dataPoints.selectAll('circle'),
    transition: (data: QsRadialPointsTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const meta: Meta[] = getMeta(canvas, data.data, config)
      dataPoints
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('cx', (d) => d.pointData[0])
        .attr('cy', (d) => d.pointData[1])
        .attr('r', yScale(pointRadius))
        .attr('fill', (d) => d.color)
    },
  }
}
