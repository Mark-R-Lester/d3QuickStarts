import { CurveFactory, area as d3area } from 'd3'
import { AreaData, getMeta, Meta } from './meta'
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
  const { color } = args.data
  const meta: Meta = getMeta(canvas, args.data)

  const area = d3area<AreaData>()
    .x((d) => d.x)
    .y1((d) => d.y1)
    .y0((d) => d.y0)
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
