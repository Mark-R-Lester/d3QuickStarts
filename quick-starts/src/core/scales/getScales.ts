import {
  scaleLinear,
  scalePow,
  scaleSymlog,
  scaleSqrt,
  ScaleContinuousNumeric,
} from 'd3-scale'
import { CanvasConfig } from '../../canvas/linear/types'
import { QSDataScale } from '../types/qsTypes'
import { QsEnumDataScale } from '../enums/qsEnums'

export interface CanvasScales {
  xCanvasPercentScaleInverted: ScaleContinuousNumeric<number, number>
  xCanvasPercentScale: ScaleContinuousNumeric<number, number>
  yCanvasPercentScaleInverted: ScaleContinuousNumeric<number, number>
  yCanvasPercentScale: ScaleContinuousNumeric<number, number>

  genralPercentScale: ScaleContinuousNumeric<number, number>

  xPercentScale: ScaleContinuousNumeric<number, number>
  xPercentScaleInverted: ScaleContinuousNumeric<number, number>

  yPercentScale: ScaleContinuousNumeric<number, number>
  yPercentScaleInverted: ScaleContinuousNumeric<number, number>

  xDataScale: ScaleContinuousNumeric<number, number>
  xDataScalePlotted: ScaleContinuousNumeric<number, number>
  xDataScaleInverted: ScaleContinuousNumeric<number, number>

  yDataScale: ScaleContinuousNumeric<number, number>
  yDataScalePlotted: ScaleContinuousNumeric<number, number>
  yDataScaleInverted: ScaleContinuousNumeric<number, number>
}

export const getScales = (config: CanvasConfig): CanvasScales => {
  const {
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    displayAreaWidth,
    displayAreaHeight,
    lowestViewableValue,
    highestViewableValue,
    lowestViewableValuePlottedX,
    highestViewableValuePlottedX,
    height,
    width,
    dataScale,
  } = config

  const createScale = (
    domain: [number, number],
    range: [number, number],
    dataScale?: QSDataScale
  ): ScaleContinuousNumeric<number, number> => {
    if (!dataScale) {
      return scaleLinear().domain(domain).range(range)
    }
    const { scale } = dataScale
    switch (scale) {
      case QsEnumDataScale.LINEAR:
        return scaleLinear().domain(domain).range(range)
      case QsEnumDataScale.POWER:
        return scalePow()
          .exponent(dataScale.exponent ?? 1)
          .domain(domain)
          .range(range)
      case QsEnumDataScale.SYMLOG:
        return scaleSymlog().domain(domain).range(range)
      case QsEnumDataScale.SQRT:
        return scaleSqrt().domain(domain).range(range)
      default:
        return scaleLinear().domain(domain).range(range)
    }
  }

  const percentDomain: [number, number] = [0, 100]
  const dataDomain: [number, number] = [
    lowestViewableValue,
    highestViewableValue,
  ]
  const plottedXDomain: [number, number] = [
    lowestViewableValuePlottedX ?? lowestViewableValue,
    highestViewableValuePlottedX ?? highestViewableValue,
  ]
  const xRange: [number, number] = [0, displayAreaWidth]
  const xRangePlotted: [number, number] = [
    0,
    highestViewableValuePlottedX !== undefined
      ? displayAreaWidth
      : Math.min(displayAreaHeight, displayAreaWidth),
  ]
  const xRangeInverted: [number, number] = [displayAreaWidth, 0]
  const yRange: [number, number] = [displayAreaHeight, 0]
  const yRangePlotted: [number, number] = [
    highestViewableValuePlottedX !== undefined
      ? displayAreaHeight
      : Math.min(displayAreaHeight, displayAreaWidth),
    0,
  ]
  const yRangeInverted: [number, number] = [0, displayAreaHeight]
  const genralRange: [number, number] = [
    0,
    Math.min(displayAreaHeight, displayAreaWidth),
  ]

  return {
    xCanvasPercentScaleInverted: scaleLinear()
      .domain(percentDomain)
      .range([width - marginRight, 0 - marginLeft]),
    xCanvasPercentScale: scaleLinear()
      .domain(percentDomain)
      .range([0 - marginLeft, width - marginRight]),

    yCanvasPercentScaleInverted: scaleLinear()
      .domain(percentDomain)
      .range([height - marginBottom, 0 - marginTop]),
    yCanvasPercentScale: scaleLinear()
      .domain(percentDomain)
      .range([0 - marginTop, height - marginBottom]),

    genralPercentScale: scaleLinear().domain(percentDomain).range(genralRange),

    xPercentScale: scaleLinear().domain(percentDomain).range(xRange),
    xPercentScaleInverted: scaleLinear()
      .domain(percentDomain)
      .range(xRangeInverted),

    yPercentScale: scaleLinear().domain(percentDomain).range(yRangeInverted),
    yPercentScaleInverted: scaleLinear().domain(percentDomain).range(yRange),

    xDataScale: createScale(dataDomain, xRange, dataScale),
    xDataScalePlotted: createScale(plottedXDomain, xRangePlotted, dataScale),
    xDataScaleInverted: createScale(dataDomain, xRangeInverted, dataScale),

    yDataScale: createScale(dataDomain, yRange, dataScale),
    yDataScalePlotted: createScale(dataDomain, yRangePlotted, dataScale),
    yDataScaleInverted: createScale(dataDomain, yRangeInverted, dataScale),
  }
}
