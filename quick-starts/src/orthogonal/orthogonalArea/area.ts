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
import { orthogonalAreaConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'

import { generateClassName } from '../../core/generateClassName'
import { Canvas } from '../../canvas/types'

export const orthogonalArea = {
  horizontal: (
    canvas: Canvas,
    data: QsAreaData,
    customConfig?: QsAreaConfig
  ): QsArea => {
    const config: AreaConfig = addDefaultsToConfig<AreaConfig>(
      orthogonalAreaConfig,
      customConfig,
      canvas.configStore.orthogonal.areaConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (canvas: Canvas, data: QsAreaData, config: AreaConfig): QsArea => {
  const { curve } = config
  const calculatedData: CalculatedData = getCalculatedData(canvas, data, config)
  const { className, dotClassName } = generateClassName('orthogonalArea')

  const area = d3area<AreaData>()
    .x((d) => d.x)
    .y1((d) => d.y1)
    .y0((d) => d.y0)
    .curve(constantsCurves[curve])

  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
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

  const transition = (transitionData: QsAreaTransitionData = { data }) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    const calculatedData: CalculatedData = getCalculatedData(
      canvas,
      transitionData.data,
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
  }
  return {
    element: group.select(dotClassName),
    transition,
  }
}
