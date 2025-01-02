import { areaRadial } from 'd3'
import { RadialAreaMetaData } from './types'
import { Meta, getMeta } from './meta'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'
import { applyDefaultColorIfNeeded } from '../../core/color/color'
import { Canvas } from '../../d3QuickStart'
import {
  QsRadialArea,
  QsRadialAreaConfig,
  QsRadialAreaData,
  QsRadialAreaTransitionData,
} from './qsTypes'

interface RadialAreaConfigStrict {
  [key: string]: QsEnumCurve | number | undefined | string
  curve: QsEnumCurve
  x: number
  y: number
}

interface DrawArgs {
  data: QsRadialAreaData
}

const addDefaultsToConfig = (
  customConfig?: QsRadialAreaConfig
): RadialAreaConfigStrict => {
  const defaults: RadialAreaConfigStrict = {
    curve: QsEnumCurve.LINEAR,
    x: 50,
    y: 50,
    color: 'steelblue',
  }

  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const area = (
  canvas: Canvas,
  data: QsRadialAreaData,
  customConfig?: QsRadialAreaConfig
): QsRadialArea => {
  const config: RadialAreaConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
  }
  return draw(canvas, args, config)
}

export const qsRadialAreaGenerator = {
  area,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAreaConfigStrict
): QsRadialArea => {
  const { outerData: dataOuter, innerData: dataInner, color } = args.data
  const { x, y, curve } = config
  const meta: Meta = getMeta(canvas, dataOuter, dataInner)

  const radialArea = areaRadial<RadialAreaMetaData>()
    .angle((d) => d.angle)
    .outerRadius((d) => d.outer)
    .innerRadius((d) => d.inner)
    .curve(constantsCurves[curve])

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', radialArea(meta.areaData))
    .attr('fill', applyDefaultColorIfNeeded({ color }))
    .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
  return {
    element: group.selectAll('path'),
    transition: (data: QsRadialAreaTransitionData) => {
      const {
        innerData: dataInner,
        outerData: dataOuter,
        color: newColor,
      } = data.data
      const meta = getMeta(canvas, dataOuter, dataInner)
      const args = addTransitionDefaults(data.transitionArgs)

      group
        .selectAll(`.${meta.class}`)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', radialArea(meta.areaData))
        .attr('fill', applyDefaultColorIfNeeded({ color, newColor }))
    },
  }
}
