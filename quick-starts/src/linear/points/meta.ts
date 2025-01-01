import {
  scaleLinear,
  scaleBand,
  range,
  ScaleOrdinal,
  ScaleSequential,
} from 'd3'
import { Canvas } from '../../d3QuickStart'
import { DrawArgs, PointsConfigStrict, QsPointData } from './types'
import { v4 as uuidv4 } from 'uuid'
import { Orientation, ScaleType } from '../../core/enums/enums'
import { QsCoordinate } from '../../core/types/qsTypes'
import {
  getColorScale,
  getPrecidendedColor,
  getScaledColor,
} from '../../core/color/color'

export interface Meta {
  class: string
  id: string
  pointData: QsCoordinate
  radiusMin: number
  color: string
}

export const getMeta = (
  canvas: Canvas,
  args: DrawArgs,
  config: PointsConfigStrict
): Meta[] => {
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { data, orientation, scaleType } = args
  const isVertical = orientation === Orientation.VERTICAL
  const isBanded = scaleType === ScaleType.BANDED
  const { defaultColor, colorScaleData } = config

  const pointSpacing = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.length
  )

  interface CoordinateWithColor extends QsCoordinate {
    [key: string]: number | string | undefined
    color?: string
  }
  const getCoordinates = (data: QsPointData[]): QsCoordinate[] =>
    data.map((d, i) => {
      return isVertical
        ? { x: d.value, y: pointSpacing[data.length - i - 1], color: d.color }
        : { x: pointSpacing[i], y: d.value, color: d.color }
    })

  const coordinates: CoordinateWithColor[] = getCoordinates(data)

  const dataScale = scaleLinear()
    .domain(
      isVertical
        ? [
            lowestViewableValue,
            highestViewableValue !== 0
              ? highestViewableValue
              : Math.max(...coordinates.map((d) => +d.x)),
          ]
        : [
            lowestViewableValue,
            highestViewableValue !== 0
              ? highestViewableValue
              : Math.max(...coordinates.map((d) => +d.y)),
          ]
    )
    .range(isVertical ? [0, displayAreaWidth] : [displayAreaHeight, 0])

  let spacingScale: any
  if (isBanded) {
    spacingScale = scaleBand()
      .domain(
        isVertical
          ? coordinates.map((d) => d.y.toString())
          : coordinates.map((d) => d.x.toString())
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
      ? spacingScale(d.x) + spacingScale.bandwidth() / 2
      : spacingScale(d.x)
    return isVertical ? dataScale(d.x) : space
  }
  const y = (d: QsCoordinate) => {
    const space = isBanded
      ? spacingScale(d.y) + spacingScale.bandwidth() / 2
      : spacingScale(d.y)
    return isVertical ? space : dataScale(d.y)
  }

  let colorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (colorScaleData) colorScale = getColorScale(colorScaleData)

  const meta: Meta[] = coordinates.map((d, i) => {
    const scaledColor: string | unknown | undefined = getScaledColor(
      orientation === Orientation.HORIZONTAL ? d.y : d.x,
      colorScale
    )
    return {
      class: 'point',
      id: `point${uuidv4()}`,
      pointData: { x: x(d), y: y(d) },
      radiusMin: 0,
      color: getPrecidendedColor(d.color, defaultColor, scaledColor),
    }
  })
  return meta
}
