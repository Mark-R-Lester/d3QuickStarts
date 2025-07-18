import { area as d3area } from 'd3'
import { getCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { constantsCurves } from '../../core/constants/constants'
import { QsEnumLineCap, QsEnumLineJoin } from '../../core/enums/qsEnums'
import {
  QsArea,
  QsAreaConfig,
  QsAreaData,
  QsAreaTransitionData,
} from './qsTypes'
import { AreaConfig, AreaData, CalculatedData } from './types'
import { linearAreaConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { Canvas } from '../../core/canvas/canvas'
import { generateClassName } from '../../core/generateClassName'

interface DrawArgs {
  data: QsAreaData
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
    const config: AreaConfig = addDefaultsToConfig<AreaConfig>(
      { ...linearAreaConfig },
      customConfig,
      { ...canvas.configStore.linear.areaConfig() }
    )
    return draw(canvas, args, config)
  },
}

function draw(canvas: Canvas, args: DrawArgs, config: AreaConfig): QsArea {
  const { curve } = config
  const calculatedData: CalculatedData = getCalculatedData(
    canvas,
    args.data,
    config
  )

  const { className, dotClassName } = generateClassName('linearArea')

  const area = d3area<AreaData>()
    .x((d) => d.x)
    .y1((d) => d.y1)
    .y0((d) => d.y0)
    .curve(constantsCurves[curve])

  const group = canvas.canvasDataGroup.append('g')
  group
    .append('path')
    .datum(calculatedData)
    .attr('class', className)
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
    element: group.select(dotClassName),
    transition: (data: QsAreaTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData = getCalculatedData(
        canvas,
        data.data,
        config
      )

      group
        .selectAll(dotClassName)
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
