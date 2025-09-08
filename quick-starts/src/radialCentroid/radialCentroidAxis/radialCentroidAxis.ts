import { arc as d3arc } from 'd3'
import { getCalculatedData } from './calculatedData'
import { RadialAxisConfig, QsCalculatedDataCentroidAxis } from './types'
import { radialCentroidAxisConfig } from '../../core/config/configDefaults'
import { Canvas } from '../../canvas/types'
import { QsRadialAxisConfig, QsRadialAxis } from './qsTypes'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const radialAxis = {
  rings: (canvas: Canvas, customConfig?: QsRadialAxisConfig): QsRadialAxis => {
    const config: RadialAxisConfig = addDefaultsToConfig<RadialAxisConfig>(
      radialCentroidAxisConfig,
      customConfig,
      canvas.configStore.radialCentroid.axisConfig()
    )
    return draw(canvas, config)
  },
}

const draw = (canvas: Canvas, config: RadialAxisConfig): QsRadialAxis => {
  const calculatedData: QsCalculatedDataCentroidAxis[] = getCalculatedData(
    canvas,
    config
  )

  const arc = d3arc()
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)

  const { className: classNameTicks, dotClassName: dotClassNameTicks } =
    generateClassName('radialCentroidAxisTicks')
  const { className: classNameText, dotClassName: dotClassNameText } =
    generateClassName('radialCentroidAxisText')

  const canvasGroup =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = canvasGroup.layer.append('g')

  group
    .selectAll(dotClassNameTicks)
    .data(calculatedData)
    .enter()
    .append('path')
    .attr('class', classNameTicks)
    .attr('id', (d) => d.ringId)
    .attr('d', (d) => arc(d.ringData))
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
  group
    .selectAll('text')
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', classNameText)
    .attr('id', (d) => d.textId)
    .attr('font-family', (d) => d.textFont)
    .attr('font-style', (d) => d.textFontStyle)
    .attr('font-weight', (d) => d.textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
    .attr('text-decoration', (d) => d.textDecorationLine)
    .attr('fill', (d) => d.textFill)
    .attr('stroke', (d) => d.textStroke)
    .style('text-anchor', (d) => d.textAnchor)
    .style('alignment-baseline', (d) => d.textAlignmentBaseline)
    .attr(
      'transform',
      (d) => `translate(${d.ringData.textLocation})rotate(${d.textAngle})`
    )
    .text((d) => d.ringData.text)

  return {
    classNameTicks,
    classNameText,
    calculatedData,
  }
}
