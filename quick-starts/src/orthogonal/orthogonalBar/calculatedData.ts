import { scaleBand, ScaleOrdinal, range, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/math/conversion'
import {
  BarConfig,
  QsCalculatedDataOthogonalBars,
  CalculatedDataBarData,
} from './types'
import { Orientation } from '../../core/enums/enums'
import {
  getPrecidendedColor,
  getScaledColor,
  getColorScale,
  findOrdinalValue,
} from '../../core/color/color'
import { QsBarData } from './qsTypes'
import { Canvas } from '../../canvas/types'
import { QsEnumColorScale } from '../../core/enums/qsEnums'
import { RectangleConfig } from '../../core/customShapes/rectangle/customRectangle'
import { rotateCorners } from './rotateCorners'

export const calculateDataWidth = (
  lowestViewableValue: number,
  lowValue: number,
  highValue: number
) => {
  const theBarIsShrinkingOffTheChart =
    lowValue + (highValue - lowValue) <= lowestViewableValue
  const theBarIsMovingAcrossTheChart =
    lowValue <= lowestViewableValue && highValue > lowestViewableValue

  if (theBarIsShrinkingOffTheChart) return lowestViewableValue
  if (theBarIsMovingAcrossTheChart) return highValue

  return lowestViewableValue + highValue - lowValue
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsBarData[],
  orientation: Orientation,
  config: BarConfig
): QsCalculatedDataOthogonalBars[] => {
  const {
    padding,
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
    fillColorScaleData,
    strokeColorScaleData,
    defaultTopLeftCornerRadiusCx,
    defaultTopLeftCornerRadiusCy,
    defaultTopRightCornerRadiusCx,
    defaultTopRightCornerRadiusCy,
    defaultTBottomLeftCornerRadiusCx,
    defaultTBottomLeftCornerRadiusCy,
    defaultTBottomRightCornerRadiusCx,
    defaultTBottomRightCornerRadiusCy,
  } = config
  const {
    displayAreaWidth,
    displayAreaHeight,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { xDataScale, yDataScaleInverted, genralPercentScale } = canvas.scales
  const calculatedData: QsCalculatedDataOthogonalBars[] = []

  const isVertical = orientation === Orientation.VERTICAL

  const ensureIsNotGreaterThanZero = (
    lowestViewableValue: number,
    lowValue: number
  ) => {
    const offset = lowValue - lowestViewableValue
    const theLowestViewableValueExceedsTheHighest =
      lowestViewableValue >= highestViewableValue
    if (theLowestViewableValueExceedsTheHighest) return 0

    return offset >= 0 ? offset : 0
  }

  const getCorrectValueForX = (
    lowValue: number,
    lowestViewableValue: number
  ) => {
    if (lowValue - lowestViewableValue < 0) return lowestViewableValue
    return lowValue
  }

  const bandStepScale = scaleBand()
    .domain(
      toStrings(isVertical ? range(data.length).reverse() : range(data.length))
    )
    .range([0, isVertical ? displayAreaHeight : displayAreaWidth])
  const bandWidthScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, isVertical ? displayAreaHeight : displayAreaWidth])
    .padding(padding / 100)

  const height = (d: QsBarData) =>
    isVertical
      ? bandWidthScale.bandwidth()
      : lowestViewableValue >= highestViewableValue
        ? 0
        : yDataScaleInverted(
            d.highValue -
              ensureIsNotGreaterThanZero(lowestViewableValue, d.lowValue!)
          )
  const width = (d: QsBarData) =>
    isVertical
      ? lowestViewableValue >= highestViewableValue
        ? 0
        : xDataScale(
            calculateDataWidth(lowestViewableValue, d.lowValue!, d.highValue)
          )
      : bandWidthScale.bandwidth()

  const scaleRadius = (radius?: number): number | undefined => {
    return radius === undefined
      ? radius
      : (bandWidthScale.bandwidth() / 100) * radius
  }

  const x = (d: QsBarData, i: number) =>
    isVertical
      ? xDataScale(getCorrectValueForX(d.lowValue!, lowestViewableValue))
      : barSpaceing(d, i)
  const y = (d: QsBarData, i: number) =>
    isVertical
      ? barSpaceing(d, i)
      : displayAreaHeight - yDataScaleInverted(d.highValue)

  const barSpaceing = (d: QsBarData, i: number) => {
    const adjustmentToCorrectD3 =
      (bandStepScale.step() - bandWidthScale.bandwidth()) / 2
    //TODO requires error handling
    const bandStep = bandStepScale(i.toString())
    if (bandStep) return bandStep + adjustmentToCorrectD3
    return adjustmentToCorrectD3
  }

  let fillColorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (fillColorScaleData) fillColorScale = getColorScale(fillColorScaleData)

  let strokeColorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (strokeColorScaleData)
    strokeColorScale = getColorScale(strokeColorScaleData)

  data.forEach((d, i) => {
    d.lowValue = d.lowValue ?? 0

    const value = d.highValue - d.lowValue!
    const scaledFillColor: string | unknown | undefined = getScaledColor(
      fillColorScaleData?.type === QsEnumColorScale.ORDINAL
        ? findOrdinalValue(i, fillColorScaleData)
        : value,
      fillColorScale
    )
    const scaledStrokeColor: string | unknown | undefined = getScaledColor(
      fillColorScaleData?.type === QsEnumColorScale.ORDINAL
        ? findOrdinalValue(i, fillColorScaleData)
        : value,
      strokeColorScale
    )

    let rectangleParams: RectangleConfig = {
      height: height(d),
      width: width(d),
      x: x(d, i),
      y: y(d, i),
      topLeftCornerRadiusCx: scaleRadius(
        d.topLeftCornerRadiusCx ?? defaultTopLeftCornerRadiusCx
      ),
      topLeftCornerRadiusCy: scaleRadius(
        d.topLeftCornerRadiusCy ?? defaultTopLeftCornerRadiusCy
      ),
      topRightCornerRadiusCx: scaleRadius(
        d.topRightCornerRadiusCx ?? defaultTopRightCornerRadiusCx
      ),
      topRightCornerRadiusCy: scaleRadius(
        d.topRightCornerRadiusCy ?? defaultTopRightCornerRadiusCy
      ),
      bottomLeftCornerRadiusCx: scaleRadius(
        d.bottomLeftCornerRadiusCx ?? defaultTBottomLeftCornerRadiusCx
      ),
      bottomLeftCornerRadiusCy: scaleRadius(
        d.bottomLeftCornerRadiusCy ?? defaultTBottomLeftCornerRadiusCy
      ),
      bottomRightCornerRadiusCx: scaleRadius(
        d.bottomRightCornerRadiusCx ?? defaultTBottomRightCornerRadiusCx
      ),
      bottomRightCornerRadiusCy: scaleRadius(
        d.bottomRightCornerRadiusCy ?? defaultTBottomRightCornerRadiusCy
      ),
    }

    if (isVertical) rectangleParams = rotateCorners(rectangleParams)

    const barData: CalculatedDataBarData = {
      rectangleParams,
      fillColor: getPrecidendedColor(
        d.fillColor,
        defaultFillColor,
        scaledFillColor
      ),
      strokeColor: getPrecidendedColor(
        d.strokeColor,
        defaultStrokeColor,
        scaledStrokeColor
      ),
      fillOpacity: d.fillOpacity ?? defaultFillOpacity,
      strokeWidth: genralPercentScale(d.strokeWidth ?? defaultStrokeWidth),
      strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
    }
    calculatedData.push({
      id: `bar-${uuidv4()}`,
      barData,
    })
  })

  return calculatedData
}
