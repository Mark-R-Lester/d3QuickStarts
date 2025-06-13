import { ChartEdge } from '../../core/enums/enums'
import { Canvas } from '../../d3QuickStart'
import { QsAxis, QsAxisConfig } from './qsTypes'
import { AxisConfigStrict, DrawArgs } from './types'
import { CalculatedData, getCalculatedData } from './calculatedData'
import {
  linearAxisConfigTop,
  linearAxisConfigBottom,
  linearAxisConfigLeft,
  linearAxisConfigRight,
} from '../../canvas/config'

const addDefaultsToConfig = (
  chartEdge: ChartEdge,
  customConfig?: QsAxisConfig
): AxisConfigStrict => {
  const getConfig = (chartEdge: ChartEdge): AxisConfigStrict => {
    const configs = {
      [ChartEdge.TOP]: linearAxisConfigTop,
      [ChartEdge.BOTTOM]: linearAxisConfigBottom,
      [ChartEdge.LEFT]: linearAxisConfigLeft,
      [ChartEdge.RIGHT]: linearAxisConfigRight,
    }
    return configs[chartEdge]
  }

  const defaults: AxisConfigStrict = getConfig(chartEdge)
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const linearAxis = {
  xAxisTop: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfigStrict = addDefaultsToConfig(
      ChartEdge.TOP,
      customConfig
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
    const config: AxisConfigStrict = addDefaultsToConfig(
      ChartEdge.BOTTOM,
      customConfig
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
    const config: AxisConfigStrict = addDefaultsToConfig(
      ChartEdge.LEFT,
      customConfig
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
    const config: AxisConfigStrict = addDefaultsToConfig(
      ChartEdge.RIGHT,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.RIGHT,
    }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: AxisConfigStrict
): QsAxis => {
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

  const axisGroup = canvas.displayGroup
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', calculatedData.translation)
    .call(calculatedData.axis)

  axisGroup
    .select('.domain')
    .attr('stroke', domainColor)
    .attr('stroke-width', calculatedData.domainWidth)
    .attr('opacity', domainOpacity)
  axisGroup
    .selectAll('.tick')
    .select('line')
    .attr('stroke', tickColor)
    .attr('stroke-width', calculatedData.tickWidth)
    .attr('opacity', tickOpacity)

  const axisText = axisGroup.selectAll('text')
  axisText
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

  return { element: axisText }
}
