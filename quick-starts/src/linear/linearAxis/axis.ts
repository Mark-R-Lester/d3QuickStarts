import {
  scalePoint,
  scaleBand,
  axisBottom,
  axisTop,
  axisLeft,
  axisRight,
  Axis,
  ScaleLinear,
} from 'd3'
import { toStrings } from '../../core/conversion'
import { ChartEdge, GlobalDefaultColors } from '../../core/enums/enums'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsScaleType,
} from '../../core/enums/qsEnums'
import { Canvas } from '../../d3QuickStart'
import { QsAxis, QsAxisConfig } from './qsTypes'
import { AxisConfigStrict, DrawArgs } from './types'

const addDefaultsToConfig = (
  chartEdge: ChartEdge,
  customConfig?: QsAxisConfig
): AxisConfigStrict => {
  const getTextAnchor = (chartEdge: ChartEdge): QsEnumTextAnchor => {
    let anchor = QsEnumTextAnchor.MIDDLE
    if (chartEdge === ChartEdge.LEFT) anchor = QsEnumTextAnchor.END
    if (chartEdge === ChartEdge.RIGHT) anchor = QsEnumTextAnchor.START

    return anchor
  }

  const getTextAlignmentBaseline = (
    chartEdge: ChartEdge
  ): QsEnumAlignmentBaseline => {
    let baseline = QsEnumAlignmentBaseline.MIDDLE
    if (chartEdge === ChartEdge.BOTTOM)
      baseline = QsEnumAlignmentBaseline.HANGING
    if (chartEdge === ChartEdge.TOP) baseline = QsEnumAlignmentBaseline.BASELINE

    return baseline
  }
  const defaults: AxisConfigStrict = {
    percentageMovement: 0,

    domainColor: GlobalDefaultColors.AXIS_COLOR,
    domainOpacity: 1,
    domainWidth: 2,
    domainScale: QsScaleType.LINEAR,
    tickColor: GlobalDefaultColors.AXIS_COLOR,
    tickOpacity: 1,
    tickWidth: 2,
    tickSizeInner: 2,
    tickSizeOuter: 2,
    tickPadding: 1,
    numberOfTicks: 0,

    textFont: QsEnumTextFont.SERIF,
    textFontSize: 6,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: GlobalDefaultColors.AXIS_COLOR,
    textAngle: 0,
    textStroke: '',
    textAnchor: getTextAnchor(chartEdge),
    textAlignmentBaseline: getTextAlignmentBaseline(chartEdge),
    textX: 0,
    textY: 0,
  }
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
///////////////////////////////////////////////////////////

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: AxisConfigStrict
): QsAxis => {
  const {
    genralPercentScale,
    xPercentScale,
    xPercentScaleInverted,
    yPercentScale,
    yPercentScaleInverted,
    yDataScale,
    xDataScale,
  } = canvas.scales
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const {
    percentageMovement,
    domainColor,
    domainOpacity,
    domainWidth,
    domainScale,
    tickColor,
    tickOpacity,
    tickWidth,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    numberOfTicks,
    textFont,
    textFontStyle,
    textFontSize,
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
  const { data, chartEdge } = args

  interface AxisScales {
    axis: Axis<string>
    percentScale: ScaleLinear<number, number, never>
    tickScale: ScaleLinear<number, number, never>
  }

  const applyScaleToAxis = (): AxisScales => {
    const range: Iterable<number> =
      chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
        ? [0, displayAreaWidth]
        : [displayAreaHeight, 0]

    const getScale = () => {
      if (domainScale === QsScaleType.LINEAR)
        return chartEdge === (ChartEdge.BOTTOM || ChartEdge.TOP)
          ? xDataScale
          : yDataScale
      if (domainScale === QsScaleType.POINT)
        return scalePoint().domain(toStrings(data)).range(range)
      return scaleBand().domain(toStrings(data)).range(range)
    }

    let scale: any = getScale()

    if (chartEdge === ChartEdge.BOTTOM)
      return {
        axis: axisBottom(scale),
        percentScale: yPercentScale,
        tickScale: yPercentScale,
      }
    if (chartEdge === ChartEdge.TOP)
      return {
        axis: axisTop(scale),
        percentScale: yPercentScaleInverted,
        tickScale: yPercentScaleInverted,
      }
    if (chartEdge === ChartEdge.LEFT)
      return {
        axis: axisLeft(scale),
        percentScale: xPercentScale,
        tickScale: xPercentScale,
      }

    return {
      axis: axisRight(scale),
      percentScale: xPercentScaleInverted,
      tickScale: xPercentScaleInverted,
    }
  }

  const { axis, percentScale, tickScale } = applyScaleToAxis()

  const translateAxis =
    chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
      ? `translate(0, ${displayAreaHeight - percentScale(percentageMovement)})`
      : `translate(${percentScale(percentageMovement)}, 0)`

  axis.tickSizeInner(
    tickSizeInner >= 0
      ? genralPercentScale(tickSizeInner)
      : tickScale(tickSizeInner)
  )
  axis.tickSizeOuter(
    tickSizeOuter >= 0
      ? genralPercentScale(tickSizeOuter)
      : tickScale(tickSizeOuter)
  )
  axis.tickPadding(tickPadding)

  if (numberOfTicks) axis.ticks(numberOfTicks)

  ///////////////////////////////////////////////////////////////////////////

  const axisGroup = canvas.displayGroup
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', translateAxis)
    .call(axis)

  axisGroup
    .select('.domain')
    .attr('stroke', domainColor)
    .attr('stroke-width', genralPercentScale(domainWidth) / 5)
    .attr('opacity', domainOpacity)
  axisGroup
    .selectAll('.tick')
    .select('line')
    .attr('stroke', tickColor)
    .attr('stroke-width', genralPercentScale(tickWidth) / 5)
    .attr('opacity', tickOpacity)

  const axisText = axisGroup.selectAll('text')
  axisText
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', genralPercentScale(textFontSize))
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
