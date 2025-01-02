import { interpolate, arc as d3arc } from 'd3'
import { RadialConfigStrict } from './types'
import { Meta, getMeta, updateMeta } from './meta'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { GlobalDefaults } from '../../core/enums/enums'
import { Canvas } from '../../d3QuickStart'
import {
  QsRadialConfig,
  QsRadial,
  QsRadialTransitionData,
  QsRadialData,
} from './qsTypes'

interface DrawArgs {
  data: QsRadialData[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialConfig
): RadialConfigStrict => {
  const defaults: RadialConfigStrict = {
    outerRadius: 100,
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,
    x: 50,
    y: 50,
    defaultColor: GlobalDefaults.DEFAULT_COLOR,
    colorScaleData: undefined,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const radial = (
  canvas: Canvas,
  data: QsRadialData[],
  customConfig?: QsRadialConfig
): QsRadial => {
  const args: DrawArgs = { data }
  const config: RadialConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const qsRadialGenerator = {
  radial,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialConfigStrict
): QsRadial => {
  const { data } = args
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
      const args = addTransitionDefaults(data.transitionArgs)
      meta = updateMeta(canvas, data.data, config, meta)

      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .attr('d', (d) => arc(d.arcData))
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('fill', (d) => d.arcData.color)
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
