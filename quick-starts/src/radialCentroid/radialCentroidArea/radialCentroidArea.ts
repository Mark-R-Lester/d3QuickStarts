import { areaRadial } from 'd3'
import { AreaData, CalculatedData, RadialAreaConfig } from './types'
import { getCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsEnumLineCap, QsEnumLineJoin } from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'
import { Canvas } from '../../core/canvas/canvas'
import {
  QsRadialArea,
  QsRadialAreaConfig,
  QsRadialAreaData,
  QsRadialAreaTransitionData,
} from './qsTypes'
import { radialCentroidAreaConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

interface DrawArgs {
  data: QsRadialAreaData
}

export const radialArea = {
  area: (
    canvas: Canvas,
    data: QsRadialAreaData,
    customConfig?: QsRadialAreaConfig
  ): QsRadialArea => {
    const config: RadialAreaConfig = addDefaultsToConfig<RadialAreaConfig>(
      { ...radialCentroidAreaConfig },
      customConfig,
      { ...canvas.configStore.radialCentroid.areaConfig() }
    )
    const args: DrawArgs = {
      data,
    }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAreaConfig
): QsRadialArea => {
  const { data } = args
  const { curve } = config
  const calculatedData: CalculatedData = getCalculatedData(canvas, data, config)

  const radialArea = areaRadial<AreaData>()
    .angle((d) => d.angle)
    .outerRadius((d) => d.outer)
    .innerRadius((d) => d.inner)
    .curve(constantsCurves[curve])

  const { className, dotClassName } = generateClassName('radialCentroidArea')
  const group = canvas.canvasDataGroup.append('g')
  group
    .append('path')
    .datum(calculatedData)
    .attr('class', className)
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
    element: group.selectAll(dotClassName),
    transition: (data: QsRadialAreaTransitionData) => {
      const calculatedData = getCalculatedData(canvas, data.data, config)
      const args = addTransitionDefaults(data.transitionArgs)

      group
        .selectAll(dotClassName)
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
