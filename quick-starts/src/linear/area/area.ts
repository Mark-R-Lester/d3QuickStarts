import { scaleLinear, CurveFactory, area as d3area, Selection } from 'd3'
import { QsCanvas } from '../../canvas/canvas'
import { AreaData, getMeta, Meta } from './meta'
import { QsAreaData } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { applyDefaultColorIfNeeded } from '../../core/color/color'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'

export { QsAreaData } from './types'
export interface QsAreaConfig {
  [key: string]: CurveFactory | string | undefined
  curve?: QsEnumCurve
}

export interface QsAreaTransitionData {
  data: QsAreaData
  transitionArgs?: QsTransitionArgs
}

export interface QsArea {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsAreaTransitionData) => void
}

interface AreaConfigStrict {
  [key: string]: CurveFactory | string | undefined
  curve: QsEnumCurve
}

interface DrawArgs {
  data: QsAreaData
}

const addDefaultsToConfig = (customConfig?: QsAreaConfig): AreaConfigStrict => {
  const defaults: AreaConfigStrict = {
    curve: QsEnumCurve.LINEAR,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const horizontal = (
  canvas: QsCanvas,
  data: QsAreaData,
  customConfig?: QsAreaConfig
): QsArea => {
  const args: DrawArgs = {
    data,
  }
  const config: AreaConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const qsLinearAreaGenerator = {
  horizontal,
}

function draw(
  canvas: QsCanvas,
  args: DrawArgs,
  config: AreaConfigStrict
): QsArea {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaHeight,
    displayAreaWidth,
  } = canvas.config
  const { curve } = config
  const { color } = args.data
  const meta: Meta = getMeta(canvas, args.data)

  const xScale = scaleLinear()
    .domain([0, Math.max(...meta.areaData.map((d) => d.x))])
    .range([0, displayAreaWidth])
  const yScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([displayAreaHeight, 0])

  const area = d3area<AreaData>()
    .x((d) => xScale(d.x))
    .y1((d) => yScale(d.y1))
    .y0((d) => yScale(d.y0))
    .curve(constantsCurves[curve])

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', area(meta.areaData))
    .attr('fill', applyDefaultColorIfNeeded({ color }))
  return {
    element: group.select(`.${meta.class}`),
    transition: (data: QsAreaTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const meta: Meta = getMeta(canvas, data.data)
      const { color: newColor } = data.data

      group
        .selectAll(`.${meta.class}`)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', area(meta.areaData))
        .attr('fill', applyDefaultColorIfNeeded({ color, newColor }))
    },
  }
}
