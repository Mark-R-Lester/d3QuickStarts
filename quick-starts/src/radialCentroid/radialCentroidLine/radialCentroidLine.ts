import { lineRadial } from 'd3'
import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/types'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { constantsCurves } from '../../core/constants/constants'
import {
  QsRadialLineConfig,
  QsRadialLine,
  QsRadialLineTransitionData,
  QsRadialLineData,
} from './qsTypes'
import { QsCalculatedDataCentroidLine, RadialLineConfig } from './types'
import { radialCentroidLineConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const radialLine = {
  line: (
    canvas: Canvas,
    data: QsRadialLineData,
    customConfig?: QsRadialLineConfig
  ): QsRadialLine => {
    const config: RadialLineConfig = addDefaultsToConfig<RadialLineConfig>(
      radialCentroidLineConfig,
      customConfig,
      canvas.configStore.radialCentroid.lineConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsRadialLineData,
  config: RadialLineConfig
): QsRadialLine => {
  const { curve, strokeLineJoin, strokeLineCap } = config
  const calculatedData: QsCalculatedDataCentroidLine = getCalculatedData(
    canvas,
    data,
    config
  )

  const radialLine = lineRadial().curve(constantsCurves[curve])

  const { className, dotClassName } = generateClassName('radialCentroidLine')

  const canvasGroup =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = canvasGroup.layer.append('g')

  group
    .append('path')
    .datum(calculatedData)
    .attr('class', className)
    .attr('id', (d) => d.id)
    .attr('d', (d) => radialLine(d.lineData))
    .attr('fill', 'none')
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('stroke-linejoin', strokeLineJoin)
    .attr('stroke-linecap', strokeLineCap)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

  const transition = (
    transitionData: QsRadialLineTransitionData = { data }
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    const calculatedData: QsCalculatedDataCentroidLine = getCalculatedData(
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
      .attr('d', (d) => radialLine(d.lineData))
      .attr('stroke', (d) => d.strokeColor)
      .attr('stroke-width', (d) => d.strokeWidth)
      .attr('stroke-opacity', (d) => d.strokeOpacity)
  }
  return {
    className,
    calculatedData,
    transition,
  }
}
