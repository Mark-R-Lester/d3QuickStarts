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
import { toStrings } from '../../core/math/conversion'
import { ChartEdge } from '../../core/enums/enums'
import { AxisConfig } from './types'
import { Canvas } from '../../core/canvas/canvas'
import {
  QsEnumAlignmentBaseline,
  QsEnumAxisScaleType,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/enums/qsEnums'

export interface CalculatedData {
  translation: string
  axis: Axis<string>
  domainWidth: number
  tickWidth: number
  domainColor: string
  domainOpacity: number
  tickColor: string
  tickOpacity: number
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textAnchor: QsEnumTextAnchor
  textAlignmentBaseline: QsEnumAlignmentBaseline
  textFill: string
  textAngle: number
  textStroke: string
  textX: number
  textY: number
}

export const getCalculatedData = (
  canvas: Canvas,
  data: string[] | number[],
  chartEdge: ChartEdge,
  config: AxisConfig
): CalculatedData => {
  const {
    genralPercentScale,
    xPercentScale,
    xPercentScaleInverted,
    yPercentScale,
    yPercentScaleInverted,
    yDataScale,
    xDataScale,
    xDataScalePlotted,
    yDataScalePlotted,
  } = canvas.scales
  const { displayAreaWidth, displayAreaHeight, highestViewableValuePlottedX } =
    canvas.config
  const {
    percentageMovement,
    domainScale,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    numberOfTicks,
    domainWidth,
    tickWidth,
    textFontSize,
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

  interface AxisScales {
    axis: Axis<string>
    percentScale: ScaleLinear<number, number, never>
  }

  const applyScaleToAxis = (): AxisScales => {
    const getScale = () => {
      const range: Iterable<number> =
        chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
          ? [0, displayAreaWidth]
          : [displayAreaHeight, 0]

      if (domainScale === QsEnumAxisScaleType.LINEAR)
        if (highestViewableValuePlottedX)
          return chartEdge === (ChartEdge.BOTTOM || ChartEdge.TOP)
            ? xDataScalePlotted
            : yDataScalePlotted
        else
          return chartEdge === (ChartEdge.BOTTOM || ChartEdge.TOP)
            ? xDataScale
            : yDataScale
      if (domainScale === QsEnumAxisScaleType.POINT)
        return scalePoint().domain(toStrings(data)).range(range)
      return scaleBand().domain(toStrings(data)).range(range)
    }

    const scale: any = getScale()

    type Scales = {
      [key in ChartEdge]: AxisScales
    }

    const scales: Scales = {
      [ChartEdge.BOTTOM]: {
        axis: axisBottom(scale),
        percentScale: yPercentScale,
      },
      [ChartEdge.TOP]: {
        axis: axisTop(scale),
        percentScale: yPercentScaleInverted,
      },
      [ChartEdge.LEFT]: {
        axis: axisLeft(scale),
        percentScale: xPercentScale,
      },
      [ChartEdge.RIGHT]: {
        axis: axisRight(scale),
        percentScale: xPercentScaleInverted,
      },
    }

    return scales[chartEdge]
  }

  const { axis, percentScale } = applyScaleToAxis()
  const translation =
    chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
      ? `translate(0, ${displayAreaHeight - percentScale(percentageMovement)})`
      : `translate(${percentScale(percentageMovement)}, 0)`

  axis.tickSizeInner(
    tickSizeInner >= 0
      ? genralPercentScale(tickSizeInner)
      : percentScale(tickSizeInner)
  )
  axis.tickSizeOuter(
    tickSizeOuter >= 0
      ? genralPercentScale(tickSizeOuter)
      : percentScale(tickSizeOuter)
  )
  axis.tickPadding(genralPercentScale(tickPadding))

  if (numberOfTicks) axis.ticks(numberOfTicks)

  const calculatedData: CalculatedData = {
    translation,
    axis,
    domainWidth: genralPercentScale(domainWidth) / 5,
    tickWidth: genralPercentScale(tickWidth) / 5,
    textFontSize: genralPercentScale(textFontSize),
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
    textX: genralPercentScale(
      chartEdge === ChartEdge.BOTTOM || ChartEdge.TOP ? textY : textX
    ),
    textY: genralPercentScale(
      chartEdge === ChartEdge.BOTTOM || ChartEdge.TOP ? textX : textY
    ),
  }

  return calculatedData
}
