import { lineRadial } from 'd3'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { Canvas } from '../../core/canvas/canvas'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { constantsCurves } from '../../core/constants/constants'
import {
  QsRadialLineConfig,
  QsRadialLine,
  QsRadialLineTransitionData,
  QsRadialLineData,
} from './qsTypes'
import { RadialLineConfig } from './types'
import { radialCentroidLineConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const radialLine = {
  line: (
    canvas: Canvas,
    data: QsRadialLineData,
    customConfig?: QsRadialLineConfig
  ): QsRadialLine => {
    const config: RadialLineConfig = addDefaultsToConfig<RadialLineConfig>(
      { ...radialCentroidLineConfig },
      customConfig,
      { ...canvas.configStore.radialCentroid.lineConfig() }
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
  const calculatedData: CalculatedData = getCalculatedData(canvas, data, config)

  const radialLine = lineRadial().curve(constantsCurves[curve])

  const { className, dotClassName } = generateClassName('radialCentroidLine')
  const group = canvas.canvasDataGroup.append('g')
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
  return {
    element: group.selectAll(dotClassName),
    transition: (data: QsRadialLineTransitionData) => {
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
        .attr('d', (d) => radialLine(d.lineData))
        .attr('stroke', (d) => d.strokeColor)
        .attr('stroke-width', (d) => d.strokeWidth)
        .attr('stroke-opacity', (d) => d.strokeOpacity)
    },
  }
}
