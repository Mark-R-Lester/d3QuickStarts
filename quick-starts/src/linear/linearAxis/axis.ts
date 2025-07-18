import { ChartEdge } from '../../core/enums/enums'
import { Canvas } from '../../core/canvas/canvas'
import { QsAxis, QsAxisConfig } from './qsTypes'
import { AxisConfig, DrawArgs } from './types'
import { CalculatedData, getCalculatedData } from './calculatedData'
import {
  linearAxisConfigTop,
  linearAxisConfigBottom,
  linearAxisConfigLeft,
  linearAxisConfigRight,
} from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const linearAxis = {
  xAxisTop: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfig = addDefaultsToConfig<AxisConfig>(
      { ...linearAxisConfigTop },
      customConfig,
      { ...canvas.configStore.linear.axisConfigTop() }
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.TOP,
    }
    return draw(canvas, args, config)
  },
  xAxisBottom: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfig = addDefaultsToConfig<AxisConfig>(
      { ...linearAxisConfigBottom },
      customConfig,
      { ...canvas.configStore.linear.axisConfigBottom() }
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.BOTTOM,
    }
    return draw(canvas, args, config)
  },

  yAxisLeft: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfig = addDefaultsToConfig<AxisConfig>(
      { ...linearAxisConfigLeft },
      customConfig,
      { ...canvas.configStore.linear.axisConfigLeft() }
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.LEFT,
    }
    return draw(canvas, args, config)
  },
  yAxisRight: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfig = addDefaultsToConfig<AxisConfig>(
      { ...linearAxisConfigRight },
      customConfig,
      { ...canvas.configStore.linear.axisConfigRight() }
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.RIGHT,
    }
    return draw(canvas, args, config)
  },
}

const draw = (canvas: Canvas, args: DrawArgs, config: AxisConfig): QsAxis => {
  const {
    domainColor,
    domainOpacity,
    tickColor,
    tickOpacity,
    textFont,
    textFontStyle,
    textFontWeight,
    textAngle,
    textAnchor,
    textStroke,
    textFill,
    textDecorationLine,
    textAlignmentBaseline,
    textX,
    textY,
  } = config

  const calculatedData: CalculatedData = getCalculatedData(canvas, args, config)

  const { className, dotClassName } = generateClassName('linearAxis')
  const { className: classNameDomain, dotClassName: dotClassNameDomian } =
    generateClassName('linearAxisDomain')
  const { className: classNameTick, dotClassName: dotClassNameTick } =
    generateClassName('linearAxisTick')
  const { className: classNameText, dotClassName: dotClassNameText } =
    generateClassName('linearAxisText')
  const axisGroup = canvas.canvasGroup
    .append('g')
    .attr('id', className)
    .attr('class', className)
    .attr('transform', calculatedData.translation)
    .call(calculatedData.axis)

  axisGroup
    .select('.domain')
    .attr('class', classNameDomain)
    .attr('stroke', domainColor)
    .attr('stroke-width', calculatedData.domainWidth)
    .attr('opacity', domainOpacity)
  axisGroup
    .selectAll('.tick')
    .attr('class', classNameTick)
    .select('line')
    .attr('stroke', tickColor)
    .attr('stroke-width', calculatedData.tickWidth)
    .attr('opacity', tickOpacity)
  axisGroup
    .selectAll('text')
    .attr('class', classNameText)
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', calculatedData.textFontSize)
    .attr('text-decoration', textDecorationLine)
    .attr('fill', textFill)
    .attr('stroke', textStroke)
    .attr('transform', `rotate(${textAngle})`)
    .style('text-anchor', textAnchor)
    .style('alignment-baseline', textAlignmentBaseline)
    .attr('text-anchor', textAnchor)
    .attr('dy', textY)
    .attr('dx', textX)

  return {
    elementDomain: axisGroup.select('.domain'),
    elementTicks: axisGroup.selectAll('.tick'),
    elementText: axisGroup.selectAll('text'),
  }
}
