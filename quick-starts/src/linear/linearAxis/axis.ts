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
import {
  ChartEdge,
  GlobalDefaultColors,
  ScaleType,
} from '../../core/enums/enums'
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

enum AixsOrientation {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
}

const addDefaultsToConfig = (
  orientation: AixsOrientation,
  customConfig?: QsAxisConfig
): AxisConfigStrict => {
  const getTextAnchor = (orietation: AixsOrientation): QsEnumTextAnchor => {
    let anchor = QsEnumTextAnchor.MIDDLE
    if (orietation === AixsOrientation.LEFT) anchor = QsEnumTextAnchor.END
    if (orietation === AixsOrientation.RIGHT) anchor = QsEnumTextAnchor.START

    return anchor
  }

  const getTextAlignmentBaseline = (
    orietation: AixsOrientation
  ): QsEnumAlignmentBaseline => {
    let baseline = QsEnumAlignmentBaseline.MIDDLE
    if (orietation === AixsOrientation.BOTTOM)
      baseline = QsEnumAlignmentBaseline.HANGING
    if (orietation === AixsOrientation.TOP)
      baseline = QsEnumAlignmentBaseline.BASELINE

    return baseline
  }
  const defaults: AxisConfigStrict = {
    percentageMovement: 0,

    domainColor: GlobalDefaultColors.AXIS_COLOR,
    domainOpacity: 1,
    domainWidth: 2,
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
    textAnchor: getTextAnchor(orientation),
    textAlignmentBaseline: getTextAlignmentBaseline(orientation),
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
      AixsOrientation.TOP,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.TOP,
      scaleType: ScaleType.LINEAR,
    }
    return draw(canvas, args, config)
  },
  xAxisBottom: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfigStrict = addDefaultsToConfig(
      AixsOrientation.BOTTOM,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.BOTTOM,
      scaleType: ScaleType.LINEAR,
    }
    return draw(canvas, args, config)
  },
  xAxisBottomBanded: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfigStrict = addDefaultsToConfig(
      AixsOrientation.BOTTOM,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.BOTTOM,
      scaleType: ScaleType.BANDED,
    }
    return draw(canvas, args, config)
  },
  xAxisTopBanded: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfigStrict = addDefaultsToConfig(
      AixsOrientation.TOP,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.TOP,
      scaleType: ScaleType.BANDED,
    }
    return draw(canvas, args, config)
  },
  yAxisLeft: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfigStrict = addDefaultsToConfig(
      AixsOrientation.LEFT,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.LEFT,
      scaleType: ScaleType.LINEAR,
    }
    return draw(canvas, args, config)
  },
  yAxisRight: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfigStrict = addDefaultsToConfig(
      AixsOrientation.RIGHT,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.RIGHT,
      scaleType: ScaleType.LINEAR,
    }
    return draw(canvas, args, config)
  },
  yAxisLeftBanded: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfigStrict = addDefaultsToConfig(
      AixsOrientation.LEFT,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.LEFT,
      scaleType: ScaleType.BANDED,
    }
    return draw(canvas, args, config)
  },
  yAxisRightBanded: (
    canvas: Canvas,
    data: string[] | number[],
    customConfig?: QsAxisConfig
  ): QsAxis => {
    const config: AxisConfigStrict = addDefaultsToConfig(
      AixsOrientation.RIGHT,
      customConfig
    )
    const args: DrawArgs = {
      data,
      chartEdge: ChartEdge.RIGHT,
      scaleType: ScaleType.BANDED,
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
  axis.tickSizeInner(genralPercentScale(tickSizeInner))
  axis.tickSizeOuter(genralPercentScale(tickSizeOuter))
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
