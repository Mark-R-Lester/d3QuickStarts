import { area as d3area } from 'd3'
import { AreaData, getCalculatedData, CalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { constantsCurves } from '../../core/constants/constants'
import { Canvas } from '../../d3QuickStart'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import {
  QsArea,
  QsAreaConfig,
  QsAreaData,
  QsAreaTransitionData,
} from './qsTypes'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
} from '../../core/enums/enums'
import { AreaConfigStrict } from './types'

interface DrawArgs {
  data: QsAreaData
}

const addDefaultsToConfig = (customConfig?: QsAreaConfig): AreaConfigStrict => {
  const defaults: AreaConfigStrict = {
    curve: QsEnumCurve.LINEAR,
    strokeLineJoin: QsEnumLineJoin.ROUND,
    strokeLineCap: QsEnumLineCap.ROUND,
    defaultFillColor: GlobalDefaultColors.AREA_FILL_COLOR,
    defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
    defaultStrokeColor: GlobalDefaultColors.AREA_STROKE_COLOR,
    defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
    defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const linearArea = {
  horizontal: (
    canvas: Canvas,
    data: QsAreaData,
    customConfig?: QsAreaConfig
  ): QsArea => {
    const args: DrawArgs = {
      data,
    }
    const config: AreaConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
}

function draw(
  canvas: Canvas,
  args: DrawArgs,
  config: AreaConfigStrict
): QsArea {
  const { curve } = config
  const calculatedData: CalculatedData = getCalculatedData(
    canvas,
    args.data,
    config
  )

  const area = d3area<AreaData>()
    .x((d) => d.x)
    .y1((d) => d.y1)
    .y0((d) => d.y0)
    .curve(constantsCurves[curve])

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .datum(calculatedData)
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('d', (d) => area(d.areaData))
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-linejoin', QsEnumLineJoin.ROUND)
    .attr('stroke-linecap', QsEnumLineCap.ROUND)
  return {
    element: group.select(`.${calculatedData.class}`),
    transition: (data: QsAreaTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData = getCalculatedData(
        canvas,
        data.data,
        config
      )

      group
        .selectAll(`.${calculatedData.class}`)
        .datum(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', area(calculatedData.areaData))
        .attr('fill', (d) => d.fillColor)
        .attr('fill-opacity', (d) => d.fillOpacity)
        .attr('stroke', (d) => d.strokeColor)
        .attr('stroke-width', (d) => d.strokeWidth)
        .attr('stroke-opacity', (d) => d.strokeOpacity)
    },
  }
}
