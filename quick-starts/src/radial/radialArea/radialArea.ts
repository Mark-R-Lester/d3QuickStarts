import { areaRadial } from 'd3'
import { RadialAreaConfigStrict, RadialAreaCalculatedDataData } from './types'
import { CalculatedData, getCalculatedData } from './calculatedData'
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
    fillColor: 'steelblue',
  }

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
  const { outerData: dataOuter, innerData: dataInner, fillColor } = args.data
  const { curve } = config
  const calculatedData: CalculatedData = getCalculatedData(
    canvas,
    dataOuter,
    config,
    dataInner
  )

  const radialArea = areaRadial<RadialAreaCalculatedDataData>()
    .angle((d) => d.angle)
    .outerRadius((d) => d.outer)
    .innerRadius((d) => d.inner)
    .curve(constantsCurves[curve])

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', calculatedData.class)
    .attr('id', calculatedData.id)
    .attr('d', radialArea(calculatedData.areaData))
    .attr('fill', applyDefaultColorIfNeeded({ color: fillColor }))
    .attr('transform', `translate(${calculatedData.x}, ${calculatedData.y})`)
  return {
    element: group.selectAll('path'),
    transition: (data: QsRadialAreaTransitionData) => {
      const { innerData, outerData, fillColor: newColor } = data.data
      const calculatedData = getCalculatedData(
        canvas,
        outerData,
        config,
        innerData
      )
      const args = addTransitionDefaults(data.transitionArgs)

      group
        .selectAll(`.${calculatedData.class}`)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('d', radialArea(calculatedData.areaData))
        .attr('fill', applyDefaultColorIfNeeded({ color: fillColor, newColor }))
    },
  }
}
