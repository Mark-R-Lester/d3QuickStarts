import {
  scaleLinear,
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
import { ChartEdge, GlobalDefaults, ScaleType } from '../../core/enums/enums'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/enums/qsEnums'
import { Canvas } from '../../d3QuickStart'
import { QsAxis, QsAxisConfig } from './qsTypes'

interface AxisConfigStrict {
  [key: string]: number | boolean | string | undefined
  percentageMovement: number

  domainColor: string
  domainOpacity: number
  domainWidth: number
  tickColor: string
  tickOpacity: number
  tickWidth: number
  tickSizeInner: number
  tickSizeOuter: number
  tickPadding: number
  numberOfTicks: number

  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAngle: number
  textAnchor: QsEnumTextAnchor
  textStroke: string
  textAlignmentBaseline: QsEnumAlignmentBaseline
  textX: number
  textY: number
}

interface DrawArgs {
  data: string[] | number[]
  chartEdge: ChartEdge
  scaleType: ScaleType
}

const addDefaultsToConfig = (customConfig?: QsAxisConfig): AxisConfigStrict => {
  const defaults: AxisConfigStrict = {
    alignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
    percentageMovement: 0,

    domainColor: GlobalDefaults.DEFAULT_AXIS_COLOR,
    domainOpacity: 1,
    domainWidth: 2,
    tickColor: GlobalDefaults.DEFAULT_AXIS_COLOR,
    tickOpacity: 1,
    tickWidth: 2,
    tickSizeInner: 2,
    tickSizeOuter: 2,
    tickPadding: 1,
    numberOfTicks: 0,

    textFont: QsEnumTextFont.SERIF,
    textFontSize: 10,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: GlobalDefaults.DEFAULT_AXIS_COLOR,
    textAngle: 0,
    textStroke: '',
    textAnchor: QsEnumTextAnchor.START,
    textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
    textX: 0,
    textY: 0,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}
const xAxisTop = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    chartEdge: ChartEdge.TOP,
    scaleType: ScaleType.LINEAR,
  }
  return draw(canvas, args, config)
}

const xAxisBottom = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    chartEdge: ChartEdge.BOTTOM,
    scaleType: ScaleType.LINEAR,
  }
  return draw(canvas, args, config)
}

const xAxisBottomBanded = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    chartEdge: ChartEdge.BOTTOM,
    scaleType: ScaleType.BANDED,
  }
  return draw(canvas, args, config)
}

const xAxisTopBanded = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    chartEdge: ChartEdge.TOP,
    scaleType: ScaleType.BANDED,
  }
  return draw(canvas, args, config)
}

const yAxisLeft = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    chartEdge: ChartEdge.LEFT,
    scaleType: ScaleType.LINEAR,
  }
  return draw(canvas, args, config)
}

const yAxisRight = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    chartEdge: ChartEdge.RIGHT,
    scaleType: ScaleType.LINEAR,
  }
  return draw(canvas, args, config)
}

const yAxisLeftBanded = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    chartEdge: ChartEdge.LEFT,
    scaleType: ScaleType.BANDED,
  }
  return draw(canvas, args, config)
}

const yAxisRightBanded = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    chartEdge: ChartEdge.RIGHT,
    scaleType: ScaleType.BANDED,
  }
  return draw(canvas, args, config)
}

export const linearAxis = {
  xAxisTop,
  xAxisBottom,
  xAxisBottomBanded,
  xAxisTopBanded,
  yAxisLeft,
  yAxisRight,
  yAxisLeftBanded,
  yAxisRightBanded,
}

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
  } = canvas.scales
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const {
    percentageMovement,
    domainColor,
    domainOpacity,
    domainWidth,
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
  const { data, chartEdge, scaleType } = args

  interface AxisAndPercentScale {
    axis: Axis<string>
    percentScale: ScaleLinear<number, number, never>
  }

  const applyScaleToAxis = (): AxisAndPercentScale => {
    const range: Iterable<number> =
      chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
        ? [0, displayAreaWidth]
        : [displayAreaHeight, 0]

    const getScale = () => {
      if (scaleType === ScaleType.LINEAR) {
        if (data.some((d) => typeof d === 'string')) {
          return scalePoint().domain(toStrings(data)).range(range)
        } else {
          return yDataScale
        }
      }
      return scaleBand().domain(toStrings(data)).range(range)
    }

    let scale: any = getScale()

    if (chartEdge === ChartEdge.BOTTOM)
      return {
        axis: axisBottom(scale),
        percentScale: yPercentScale,
      }
    if (chartEdge === ChartEdge.TOP)
      return {
        axis: axisTop(scale),
        percentScale: yPercentScaleInverted,
      }
    if (chartEdge === ChartEdge.LEFT)
      return {
        axis: axisLeft(scale),
        percentScale: xPercentScale,
      }

    return {
      axis: axisRight(scale),
      percentScale: xPercentScaleInverted,
    }
  }

  const result = applyScaleToAxis()
  const axis: Axis<string> = result.axis
  const percentScale: ScaleLinear<number, number, never> = result.percentScale

  const translation =
    chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
      ? `translate(0, ${displayAreaHeight - percentScale(percentageMovement)})`
      : `translate(${percentScale(percentageMovement)}, 0)`
  axis.tickSizeInner(percentScale(tickSizeInner))
  axis.tickSizeOuter(percentScale(tickSizeOuter))
  axis.tickPadding(tickPadding)

  if (numberOfTicks) axis.ticks(numberOfTicks)

  const axisGroup = canvas.displayGroup
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', translation)
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
