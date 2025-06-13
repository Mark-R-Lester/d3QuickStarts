import { interpolate, arc as d3arc } from 'd3'
import { RadialConfigStrict } from './types'
import {
  CalculatedData,
  getCalculatedData,
  updateCalculatedData,
} from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
} from '../../core/enums/enums'
import { Canvas } from '../../d3QuickStart'
import {
  QsRadialConfig,
  QsRadial,
  QsRadialTransitionData,
  QsRadialData,
} from './qsTypes'
import { radialArcConfig } from '../../canvas/config'

interface DrawArgs {
  data: QsRadialData[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialConfig
): RadialConfigStrict => {
  const defaults: RadialConfigStrict = radialArcConfig
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const radialArc = {
  radial: (
    canvas: Canvas,
    data: QsRadialData[],
    customConfig?: QsRadialConfig
  ): QsRadial => {
    const args: DrawArgs = { data }
    const config: RadialConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialConfigStrict
): QsRadial => {
  const { data } = args

  let calculatedData: CalculatedData[] = getCalculatedData(canvas, data, config)
  const arc: any = d3arc()
  const group = canvas.displayGroup.append('g')

  group
    .selectAll('.arc')
    .data(calculatedData)
    .enter()
    .append('path')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('stroke', 'none')
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
    .attr('d', (d) => arc(d.arcData))
    .attr('fill', (d) => d.arcData.fillColor)
    .attr('fill-opacity', (d) => d.arcData.fillOpacity)
    .attr('stroke', (d) => d.arcData.strokeColor)
    .attr('stroke-opacity', (d) => d.arcData.strokeOpacity)
    .attr('stroke-width', (d) => d.arcData.strokeWidth)

  return {
    element: group.selectAll('.arc'),
    transition: (data: QsRadialTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      calculatedData = updateCalculatedData(
        canvas,
        data.data,
        config,
        calculatedData
      )

      group
        .selectAll(`.${calculatedData[0].class}`)
        .data(calculatedData)
        .attr('d', (d) => arc(d.arcData))
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('fill', (d) => d.arcData.fillColor)
        .attr('fill-opacity', (d) => d.arcData.fillOpacity)
        .attr('stroke', (d) => d.arcData.strokeColor)
        .attr('stroke-opacity', (d) => d.arcData.strokeOpacity)
        .attr('stroke-width', (d) => d.arcData.strokeWidth)
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
