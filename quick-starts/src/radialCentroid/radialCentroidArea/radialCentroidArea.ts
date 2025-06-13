import { areaRadial } from 'd3'
import { AreaData, CalculatedData, RadialAreaConfigStrict } from './types'
import { getCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'
import { Canvas } from '../../d3QuickStart'
import {
  QsRadialArea,
  QsRadialAreaConfig,
  QsRadialAreaData,
  QsRadialAreaTransitionData,
} from './qsTypes'
import { radialCentroidAreaConfig } from '../../core/config'

interface DrawArgs {
  data: QsRadialAreaData
}

const addDefaultsToConfig = (
  customConfig?: QsRadialAreaConfig
): RadialAreaConfigStrict => {
  const defaults: RadialAreaConfigStrict = { ...radialCentroidAreaConfig }

  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const radialArea = {
  area: (
    canvas: Canvas,
    data: QsRadialAreaData,
    customConfig?: QsRadialAreaConfig
  ): QsRadialArea => {
    const config: RadialAreaConfigStrict = addDefaultsToConfig(customConfig)
    const args: DrawArgs = {
      data,
    }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAreaConfigStrict
): QsRadialArea => {
  const { data } = args
  const { curve } = config
  const calculatedData: CalculatedData = getCalculatedData(canvas, data, config)

  const radialArea = areaRadial<AreaData>()
    .angle((d) => d.angle)
    .outerRadius((d) => d.outer)
    .innerRadius((d) => d.inner)
    .curve(constantsCurves[curve])

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .datum(calculatedData)
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('d', (d) => radialArea(d.areaData))
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-linejoin', QsEnumLineJoin.ROUND)
    .attr('stroke-linecap', QsEnumLineCap.ROUND)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
  return {
    element: group.selectAll('path'),
    transition: (data: QsRadialAreaTransitionData) => {
      const calculatedData = getCalculatedData(canvas, data.data, config)
      const args = addTransitionDefaults(data.transitionArgs)

      group
        .selectAll(`.${calculatedData.class}`)
        .datum(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', (d) => radialArea(d.areaData))
        .attr('fill', (d) => d.fillColor)
        .attr('fill-opacity', (d) => d.fillOpacity)
        .attr('stroke', (d) => d.strokeColor)
        .attr('stroke-width', (d) => d.strokeWidth)
        .attr('stroke-opacity', (d) => d.strokeOpacity)
    },
  }
}
