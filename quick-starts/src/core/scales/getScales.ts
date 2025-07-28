import {
  scaleLinear,
  scalePow,
  scaleSymlog,
  scaleSqrt,
  ScaleContinuousNumeric,
} from 'd3'
import { QsDataScale } from '../types/qsTypes'
import { QsEnumDataScale } from '../enums/qsEnums'
import { CanvasConfig } from '../../canvas/types'

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
    lowestViewableValueX,
    highestViewableValueX,
    lowestViewableValueY,
    highestViewableValueY,
    height,
    width,
    dataScale,
    dataScaleX,
    dataScaleY,
  } = config

  const createScale = (
    domain: [number, number],
    range: [number, number],
    dataScale?: QsDataScale
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

  const xDomainPlotted: [number, number] = [
    lowestViewableValueX,
    highestViewableValueX,
  ]
  const xRangePlotted: [number, number] = [0, displayAreaWidth]

  const yDomainPlotted: [number, number] = [
    lowestViewableValueY,
    highestViewableValueY,
  ]
  const yRangePlotted: [number, number] = [displayAreaHeight, 0]

  const percentDomain: [number, number] = [0, 100]
  const dataDomain: [number, number] = [
    lowestViewableValue,
    highestViewableValue,
  ]
  const xRange: [number, number] = [0, displayAreaWidth]
  const xRangeInverted: [number, number] = [displayAreaWidth, 0]
  const yRange: [number, number] = [displayAreaHeight, 0]
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
    xDataScalePlotted: createScale(xDomainPlotted, xRangePlotted, dataScaleX),
    xDataScaleInverted: createScale(dataDomain, xRangeInverted, dataScale),

    yDataScale: createScale(dataDomain, yRange, dataScale),
    yDataScalePlotted: createScale(yDomainPlotted, yRangePlotted, dataScaleY),
    yDataScaleInverted: createScale(dataDomain, yRangeInverted, dataScale),
  }
}
