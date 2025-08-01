import { scaleBand, ScaleOrdinal, range, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/math/conversion'
import { BarConfig, CalculatedDataBarData } from './types'
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
import { RectangleParams } from '../../core/customShapes/customRectangle'
import { rotateCorners } from './rotateCorners'

export interface CalculatedData {
  id: string
  barData: CalculatedDataBarData
}

export const calculateDataWidth = (
  lowestViewableValue: number,
  lowerBoundry: number,
  upperBoundry: number
) => {
  const theBarIsShrinkingOffTheChart =
    lowerBoundry + (upperBoundry - lowerBoundry) <= lowestViewableValue
  const theBarIsMovingAcrossTheChart =
    lowerBoundry <= lowestViewableValue && upperBoundry > lowestViewableValue

  if (theBarIsShrinkingOffTheChart) return lowestViewableValue
  if (theBarIsMovingAcrossTheChart) return upperBoundry

  return lowestViewableValue + upperBoundry - lowerBoundry
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsBarData[],
  orientation: Orientation,
  config: BarConfig
): CalculatedData[] => {
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
  const calculatedData: CalculatedData[] = []

  const isVertical = orientation === Orientation.VERTICAL

  const findLowerBoundry = (lowerBoundry: number | undefined) =>
    lowerBoundry ?? 0

  const ensureIsNotGreaterThanZero = (
    lowestViewableValue: number,
    lowerBoundry: number
  ) => {
    const offset = lowerBoundry - lowestViewableValue
    const theLowestViewableValueExceedsTheHighest =
      lowestViewableValue >= highestViewableValue
    if (theLowestViewableValueExceedsTheHighest) return 0

    return offset >= 0 ? offset : 0
  }

  const getCorrectValueForX = (
    lowerBoundry: number,
    lowestViewableValue: number
  ) => {
    if (lowerBoundry - lowestViewableValue < 0) return lowestViewableValue
    return lowerBoundry
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
            d.upperBoundry -
              ensureIsNotGreaterThanZero(lowestViewableValue, d.lowerBoundry!)
          )
  const width = (d: QsBarData) =>
    isVertical
      ? lowestViewableValue >= highestViewableValue
        ? 0
        : xDataScale(
            calculateDataWidth(
              lowestViewableValue,
              d.lowerBoundry!,
              d.upperBoundry
            )
          )
      : bandWidthScale.bandwidth()

  const scaleRadius = (radius?: number): number | undefined => {
    return radius === undefined
      ? radius
      : (bandWidthScale.bandwidth() / 100) * radius
  }

  const x = (d: QsBarData, i: number) =>
    isVertical
      ? xDataScale(getCorrectValueForX(d.lowerBoundry!, lowestViewableValue))
      : barSpaceing(d, i)
  const y = (d: QsBarData, i: number) =>
    isVertical
      ? barSpaceing(d, i)
      : displayAreaHeight - yDataScaleInverted(d.upperBoundry)

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
    d.lowerBoundry = findLowerBoundry(d.lowerBoundry)

    const value = d.upperBoundry - d.lowerBoundry!
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

    let rectangleParams: RectangleParams = {
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
