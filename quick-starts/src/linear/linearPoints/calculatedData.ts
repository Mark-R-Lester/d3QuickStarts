import {
  scaleLinear,
  scaleBand,
  range,
  ScaleOrdinal,
  ScaleSequential,
} from 'd3'
import { DrawArgs, PointsConfig } from './types'
import { v4 as uuidv4 } from 'uuid'
import { Orientation } from '../../core/enums/enums'
import { QsCoordinate } from '../../core/types/qsTypes'
import {
  findOrdinalValue,
  getColorScale,
  getPrecidendedColor,
  getScaledColor,
} from '../../core/color/color'
import { QsPointData } from './qsTypes'
import { toStrings } from '../../core/conversion'
import { Canvas } from '../../core/canvas/canvas'
import { QsEnumColorScale, QsEnumScaleType } from '../../core/enums/qsEnums'

export interface CalculatedData {
  id: string
  radius: number
  pointData: QsCoordinate
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}

export const getCalculatedData = (
  canvas: Canvas,
  args: DrawArgs,
  config: PointsConfig
): CalculatedData[] => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { xDataScale, yDataScale, genralPercentScale } = canvas.scales
  const { data, orientation } = args
  const isVertical = orientation === Orientation.VERTICAL
  const {
    scaleType,
    defaultRadius,
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
    fillColorScaleData,
    strokeColorScaleData,
  } = config
  const isBanded = scaleType === QsEnumScaleType.BANDED

  const pointSpacing = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.length
  )

  interface CoordinateAugmented extends QsCoordinate {
    [key: string]: number | string | undefined
    fillColor?: string
    fillOpacity?: number
    strokeColor?: string
    strokeWidth?: number
    strokeOpacity?: number
    radius?: number
  }

  const getCoordinates = (data: QsPointData[]): CoordinateAugmented[] =>
    data.map((d, i) => ({
      x: isVertical ? d.value : pointSpacing[i],
      y: isVertical ? pointSpacing[data.length - i - 1] : d.value,
      fillColor: d.fillColor,
      fillOpacity: d.fillOpacity,
      strokeColor: d.strokeColor,
      strokeWidth: d.strokeWidth,
      strokeOpacity: d.strokeOpacity,
      radius: d.radius,
    }))

  const coordinates: CoordinateAugmented[] = getCoordinates(data)
  const dataScale = isVertical ? xDataScale : yDataScale

  let spacingScale: any
  if (isBanded) {
    spacingScale = scaleBand()
      .domain(
        isVertical
          ? toStrings(coordinates.map((d) => d.y))
          : toStrings(coordinates.map((d) => d.x))
      )
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  } else {
    spacingScale = scaleLinear()
      .domain(
        isVertical
          ? [0, Math.max(...coordinates.map((d) => d.y))]
          : [0, Math.max(...coordinates.map((d) => d.x))]
      )
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  }
  const x = (d: QsCoordinate) => {
    const space = isBanded
      ? spacingScale(d.x.toString()) + spacingScale.bandwidth() / 2
      : spacingScale(d.x)
    return isVertical ? dataScale(d.x) : space
  }
  const y = (d: QsCoordinate) => {
    const space = isBanded
      ? spacingScale(d.y.toString()) + spacingScale.bandwidth() / 2
      : spacingScale(d.y)
    return isVertical ? space : dataScale(d.y)
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

  const calculatedData: CalculatedData[] = coordinates.map((d, i) => {
    const value = orientation === Orientation.HORIZONTAL ? d.y : d.x
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
    return {
      id: `point${uuidv4()}`,
      pointData: { x: x(d), y: y(d) },
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
      radius: genralPercentScale(d.radius ?? defaultRadius),
      fillOpacity: d.fillOpacity ?? defaultFillOpacity,
      strokeWidth: genralPercentScale(d.strokeWidth ?? defaultStrokeWidth),
      strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
    }
  })
  return calculatedData
}
