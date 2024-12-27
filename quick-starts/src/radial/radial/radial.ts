import { QsCanvas } from '../../canvas/canvas'
import { interpolate, range, schemePurples, Selection, arc as d3arc } from 'd3'
import { QsRadialData, RadialConfigStrict } from './types'
import { Meta, getMeta, updateMeta } from './meta'
import { QsColorScale, QsTransitionArgs } from '../../core/types/qsTypes'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { GlobalDefaults } from '../../core/enums/enums'

export { QsRadialData } from './types'

export interface QsRadialConfig {
  [key: string]: number | string | QsColorScale | undefined
  outerRadius?: number
  innerRadius?: number
  padAngle?: number
  cornerRadius?: number
  x?: number
  y?: number
  defaultColor?: string
  colorScale?: QsColorScale
}

export interface QsRadialTransitionData {
  data: QsRadialData[]
  config?: QsRadialConfig
  transitionArgs?: QsTransitionArgs
}

export interface QsRadial {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialTransitionData) => void
}

interface DrawArgs {
  data: QsRadialData[]
  pie: boolean
}

const updateCurrentConfig = (
  currentConfig: RadialConfigStrict,
  newConfig?: QsRadialConfig
): RadialConfigStrict => {
  if (!newConfig) return currentConfig

  Object.keys(newConfig).forEach((key) => (currentConfig[key] = newConfig[key]))
  return currentConfig
}

const addDefaultsToConfig = (
  customConfig?: QsRadialConfig
): RadialConfigStrict => {
  const defaults: RadialConfigStrict = {
    outerRadius: 100,
    innerRadius: 50,
    padAngle: 0,
    cornerRadius: 0,
    x: 50,
    y: 50,
    defaultColor: GlobalDefaults.DEFAULT_BAR_COLOR,
    colorScale: undefined,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const pie = (
  canvas: QsCanvas,
  data: QsRadialData[],
  customConfig?: QsRadialConfig
): QsRadial => {
  const args: DrawArgs = { data, pie: true }
  const config: RadialConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const doughnut = (
  canvas: QsCanvas,
  data: QsRadialData[],
  customConfig?: QsRadialConfig
): QsRadial => {
  const args: DrawArgs = { data, pie: false }
  const config: RadialConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const qsRadialGenerator = {
  pie,
  doughnut,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: RadialConfigStrict
): QsRadial => {
  const { data, pie } = args
  const {
    outerRadius,
    innerRadius,
    padAngle,
    cornerRadius,
    x,
    y,
    colorDomain,
    colorRange,
  } = config

  const transitionArgs: RadialConfigStrict = {
    colorDomain,
    colorRange,
    outerRadius,
    innerRadius,
    cornerRadius,
    padAngle,
    x,
    y,
  }

  let meta: Meta[] = getMeta(canvas, data, transitionArgs)
  const arc: any = d3arc()
  const group = canvas.displayGroup.append('g')

  group
    .selectAll('.arc')
    .data(meta)
    .enter()
    .append('path')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('stroke', 'none')
    .attr('transform', (d) => `translate(${d.xAxis(x)}, ${d.yAxis(y)})`)
    .attr('d', (d) => arc(d.arcData))
    .attr('fill', (d) => d.arcData.color)

  return {
    element: group.selectAll('.arc'),
    transition: (data: QsRadialTransitionData) => {
      const updatedConfig = updateCurrentConfig(config, data.config)
      const args = addTransitionDefaults(data.transitionArgs)
      meta = updateMeta(canvas, data.data, updatedConfig, meta)

      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .attr('d', (d) => arc(d.arcData))
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attrTween('d', (d) => {
          const tweenStart = interpolate(
            d.arcData.startAngle,
            d.arcData.newStartAngle
          )
          const tweenEnd = interpolate(
            d.arcData.endAngle,
            d.arcData.newEndAngle
          )

          return function (t: number) {
            d.arcData.startAngle = tweenStart(t)
            d.arcData.endAngle = tweenEnd(t)

            return arc(d.arcData)
          }
        })
    },
  }
}
