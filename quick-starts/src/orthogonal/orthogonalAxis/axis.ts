import { ChartEdge } from '../../core/enums/enums'
import { Canvas } from '../../canvas/types'
import { QsAxis, QsAxisConfig } from './qsTypes'
import { AxisConfig, QsCalculatedDataOrthogonalAxis } from './types'
import { getCalculatedData } from './calculatedData'
import {
  orthogonalAxisConfigTop,
  orthogonalAxisConfigBottom,
  orthogonalAxisConfigLeft,
  orthogonalAxisConfigRight,
} from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const orthogonalAxis = {
  xAxisTop: (canvas: Canvas, customConfig?: QsAxisConfig): QsAxis => {
    const config: AxisConfig = addDefaultsToConfig<AxisConfig>(
      orthogonalAxisConfigTop,
      customConfig,
      canvas.configStore.orthogonal.axisConfigTop()
    )
    return draw(canvas, ChartEdge.TOP, config)
  },

  xAxisBottom: (canvas: Canvas, customConfig?: QsAxisConfig): QsAxis => {
    const config: AxisConfig = addDefaultsToConfig<AxisConfig>(
      orthogonalAxisConfigBottom,
      customConfig,
      canvas.configStore.orthogonal.axisConfigBottom()
    )
    return draw(canvas, ChartEdge.BOTTOM, config)
  },

  yAxisLeft: (canvas: Canvas, customConfig?: QsAxisConfig): QsAxis => {
    const config: AxisConfig = addDefaultsToConfig<AxisConfig>(
      orthogonalAxisConfigLeft,
      customConfig,
      canvas.configStore.orthogonal.axisConfigLeft()
    )
    return draw(canvas, ChartEdge.LEFT, config)
  },

  yAxisRight: (canvas: Canvas, customConfig?: QsAxisConfig): QsAxis => {
    const config: AxisConfig = addDefaultsToConfig<AxisConfig>(
      orthogonalAxisConfigRight,
      customConfig,
      canvas.configStore.orthogonal.axisConfigRight()
    )
    return draw(canvas, ChartEdge.RIGHT, config)
  },
}

const draw = (
  canvas: Canvas,
  chartEdge: ChartEdge,
  config: AxisConfig
): QsAxis => {
  const calculatedData: QsCalculatedDataOrthogonalAxis = getCalculatedData(
    canvas,
    chartEdge,
    config
  )

  const { className: classNameAxis, dotClassName: dotClassNameAxis } =
    generateClassName('orthogonalAxis')
  const { className: classNameDomain, dotClassName: dotClassNameDomian } =
    generateClassName('orthogonalAxisDomain')
  const { className: classNameTick, dotClassName: dotClassNameTick } =
    generateClassName('orthogonalAxisTick')
  const { className: classNameText, dotClassName: dotClassNameText } =
    generateClassName('orthogonalAxisText')

  const { layer, layerActions } =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = layer.append('g')

  const axisGroup = group
    .append('g')
    .attr('id', classNameAxis)
    .attr('class', classNameAxis)
    .attr('transform', calculatedData.translation)
    .call(calculatedData.axis)

  axisGroup
    .select('.domain')
    .datum(calculatedData)
    .attr('class', classNameDomain)
    .attr('stroke', (d) => d.domainColor)
    .attr('stroke-width', (d) => d.domainWidth)
    .attr('opacity', (d) => d.domainOpacity)
  axisGroup
    .selectAll('.tick')
    .datum(calculatedData)
    .attr('class', classNameTick)
    .select('line')
    .attr('stroke', (d) => d.tickColor)
    .attr('stroke-width', (d) => d.tickWidth)
    .attr('opacity', (d) => d.tickOpacity)
  axisGroup
    .selectAll('text')
    .datum(calculatedData)
    .attr('class', classNameText)
    .attr('font-family', (d) => d.textFont)
    .attr('font-style', (d) => d.textFontStyle)
    .attr('font-weight', (d) => d.textFontWeight)
    .attr('font-size', (d) => d.textFontSize)
    .attr('text-decoration', (d) => d.textDecorationLine)
    .attr('fill', (d) => d.textFill)
    .attr('stroke', (d) => d.textStroke)
    .attr('transform', (d) => `rotate(${d.textAngle})`)
    .style('text-anchor', (d) => d.textAnchor)
    .style('alignment-baseline', (d) => d.textAlignmentBaseline)
    .attr('text-anchor', (d) => d.textAnchor)
    .attr('dy', (d) => d.textY)
    .attr('dx', (d) => d.textX)

  return {
    classNameAxis,
    classNameDomain,
    classNameTick,
    classNameText,
    layerActions,
    calculatedData,
  }
}
