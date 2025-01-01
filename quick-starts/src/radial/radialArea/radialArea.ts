import { areaRadial, Selection } from 'd3'
import { RadialAreaMetaData } from './types'
import { Meta, getMeta } from './meta'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'
import { applyDefaultColorIfNeeded } from '../../core/color/color'
import { Canvas } from '../../d3QuickStart'

export interface QsRadialAreaConfig {
  [key: string]: QsEnumCurve | number | undefined | string
  curve?: QsEnumCurve
  x?: number
  y?: number
}

export interface QsRadialAreaTransitionData {
  data: QsRadialAreaData
  config?: QsRadialAreaConfig
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialArea {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialAreaTransitionData) => void
}

export interface QsRadialAreaData {
  [key: string]: number[] | string | undefined
  outerData: number[]
  innerData?: number[]
  color?: string
}

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
