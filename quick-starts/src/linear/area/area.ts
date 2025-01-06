import { CurveFactory, area as d3area } from 'd3'
import { AreaData, getCalculatedData, CalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { applyDefaultColorIfNeeded } from '../../core/color/color'
import { constantsCurves } from '../../core/constants/constants'
import { Canvas } from '../../d3QuickStart'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import {
  QsArea,
  QsAreaConfig,
  QsAreaData,
  QsAreaTransitionData,
} from './qsTypes'

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
  const { fillColor } = args.data
  const calculatedData: CalculatedData = getCalculatedData(canvas, args.data)

  const area = d3area<AreaData>()
    .x((d) => d.x)
    .y1((d) => d.y1)
    .y0((d) => d.y0)
    .curve(constantsCurves[curve])

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', calculatedData.class)
    .attr('id', calculatedData.id)
    .attr('d', area(calculatedData.areaData))
    .attr('fill', applyDefaultColorIfNeeded({ color: fillColor }))
  return {
    element: group.select(`.${calculatedData.class}`),
    transition: (data: QsAreaTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData = getCalculatedData(
        canvas,
        data.data
      )
      const { fillColor: newColor } = data.data

      group
        .selectAll(`.${calculatedData.class}`)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', area(calculatedData.areaData))
        .attr('fill', applyDefaultColorIfNeeded({ color: fillColor, newColor }))
    },
  }
}
