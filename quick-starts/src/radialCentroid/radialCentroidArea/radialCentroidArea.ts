import { areaRadial, lineRadial } from 'd3'
import {
  AreaData,
  QsCalculatedDataCentroidArea,
  RadialAreaConfig,
} from './types'
import { getCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsEnumLayerType,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import { constantsCurves } from '../../core/constants/constants'
import { Canvas } from '../../canvas/types'
import {
  QsRadialArea,
  QsRadialAreaConfig,
  QsRadialAreaData,
  QsRadialAreaTransitionData,
} from './qsTypes'
import { radialCentroidAreaConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const radialArea = {
  area: (
    canvas: Canvas,
    data: QsRadialAreaData,
    customConfig?: QsRadialAreaConfig
  ): QsRadialArea => {
    const config: RadialAreaConfig = addDefaultsToConfig<RadialAreaConfig>(
      radialCentroidAreaConfig,
      customConfig,
      canvas.configStore.radialCentroid.areaConfig()
    )

    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsRadialAreaData,
  config: RadialAreaConfig
): QsRadialArea => {
  const { curve } = config
  const calculatedData: QsCalculatedDataCentroidArea = getCalculatedData(
    canvas,
    data,
    config
  )

  const radialArea = areaRadial<AreaData>()
    .angle((d) => d.angle)
    .outerRadius((d) => d.outer)
    .innerRadius((d) => d.inner)
    .curve(constantsCurves[curve])

  const radialLine = lineRadial<AreaData>()
    .angle((d) => d.angle)
    .radius((d) => d.outer)

  const { className: classNameArea, dotClassName: dotClassNameArea } =
    generateClassName('radialCentroidArea')
  const { className: classNameLine, dotClassName: dotClassNameLine } =
    generateClassName('radialCentroidLine')

  const { layer, layerActions } =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = layer.append('g')

  group
    .append('path')
    .datum(calculatedData)
    .attr('class', classNameArea)
    .attr('id', (d) => d.id)
    .attr('d', (d) => radialArea(d.areaData))
    .attr('fill', (d) => d.fillColor)
    .attr('fill-opacity', (d) => d.fillOpacity)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

  group
    .append('path')
    .datum(calculatedData)
    .attr('class', classNameLine)
    .attr('id', (d) => d.id)
    .attr('d', (d) => radialLine(d.areaData))
    .attr('fill', 'none')
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-linejoin', QsEnumLineJoin.ROUND)
    .attr('stroke-linecap', QsEnumLineCap.ROUND)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

  const transition = (
    transitionData: QsRadialAreaTransitionData = { data }
  ) => {
    const calculatedData = getCalculatedData(
      canvas,
      transitionData.data,
      config
    )
    const args = addTransitionDefaults(transitionData.transitionArgs)

    group
      .selectAll(dotClassNameArea)
      .datum(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('d', (d) => radialArea(d.areaData))
      .attr('fill', (d) => d.fillColor)
      .attr('fill-opacity', (d) => d.fillOpacity)

    group
      .selectAll(dotClassNameLine)
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
      .attr('stroke-linejoin', QsEnumLineJoin.ROUND)
      .attr('stroke-linecap', QsEnumLineCap.ROUND)
  }
  return {
    classNameArea,
    classNameLine,
    calculatedData,
    transition,
  }
}
