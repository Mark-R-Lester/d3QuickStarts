import {
  scalePoint,
  scaleBand,
  axisBottom,
  axisTop,
  axisLeft,
  axisRight,
  Axis,
  ScaleContinuousNumeric,
} from 'd3'
import { toStrings } from '../../core/math/conversion'
import { ChartEdge } from '../../core/enums/enums'
import { AxisConfig, QsCalculatedDataOrthogonalAxis } from './types'
import { Canvas } from '../../canvas/types'
import { QsEnumAxisScaleType } from '../../core/enums/qsEnums'

export const getCalculatedData = (
  canvas: Canvas,
  chartEdge: ChartEdge,
  config: AxisConfig
): QsCalculatedDataOrthogonalAxis => {
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
  const { displayAreaWidth, displayAreaHeight, highestViewableValue } =
    canvas.config
  const {
    percentageMovement,
    scale: scaleData,
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
    percentScale: ScaleContinuousNumeric<number, number>
  }

  const applyScaleToAxis = (): AxisScales => {
    const getScale = () => {
      const isHorizontal =
        chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
      const isPlotted = highestViewableValue === 0

      const range: Iterable<number> = isHorizontal
        ? [0, displayAreaWidth]
        : [displayAreaHeight, 0]

      if (!scaleData) {
        if (isPlotted)
          return isHorizontal ? xDataScalePlotted : yDataScalePlotted
        return isHorizontal ? xDataScale : yDataScale
      }

      if (scaleData.type === QsEnumAxisScaleType.POINT)
        return scalePoint().domain(toStrings(scaleData.domain)).range(range)
      return scaleBand().domain(toStrings(scaleData.domain)).range(range)
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

  const calculatedData: QsCalculatedDataOrthogonalAxis = {
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
