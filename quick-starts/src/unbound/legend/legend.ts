import { getCalculatedData } from './calculatedData'
import { LegendConfig } from './types'
import {
  QsLegendData,
  QsLegendConfig,
  QsLegend,
  QsCalculatedDataUnboundLegend,
} from './qsTypes'
import { legendConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { Canvas } from '../../canvas/types'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const legend = (
  canvas: Canvas,
  data: QsLegendData[],
  customConfig?: QsLegendConfig
): QsLegend => {
  const config: LegendConfig = addDefaultsToConfig<LegendConfig>(
    legendConfig,
    customConfig,
    canvas.configStore.unbound.legendConfig()
  )

  return draw(canvas, data, config)
}

const draw = (canvas: Canvas, data: QsLegendData[], config: LegendConfig) => {
  const calculatedData: QsCalculatedDataUnboundLegend[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const { className, dotClassName } = generateClassName('unboundLegend')
  const { className: classNameText, dotClassName: dotClassNameText } =
    generateClassName('unboundLegendText')

  const { layer, layerActions } =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = layer.append('g')

  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('rect')
    .attr('class', className)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .attr('fill', (d) => d.fillColor)

  group
    .selectAll(dotClassNameText)
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', classNameText)
    .attr('font-family', (d) => d.textFont)
    .attr('font-style', (d) => d.textFontStyle)
    .attr('font-weight', (d) => d.textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
    .attr('text-decoration', (d) => d.textDecorationLine)
    .attr('fill', (d) => d.textFill)
    .attr('stroke', (d) => d.textStroke)
    .style('text-anchor', (d) => d.textAnchor)
    .style('alignment-baseline', (d) => d.textAlignmentBaseline)
    .attr('transform', (d) => {
      return `translate(${d.textX}, ${d.textY})rotate(${d.textAngle})`
    })
    .text((d) => d.value)

  return {
    className,
    classNameText,
    layerActions,
    calculatedData,
  }
}
