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
    elementDomain: axisGroup.select('.domain'),
    elementTicks: axisGroup.selectAll('.tick'),
    elementText: axisGroup.selectAll('text'),
  }
}
