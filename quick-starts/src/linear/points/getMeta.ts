import { scaleLinear, scaleBand, NumberValue, range, Selection } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { DrawArgs } from './types'
import { v4 as uuidv4 } from 'uuid'
import { Orientation, ScaleType } from '../../core/enums'
import { Coordinate } from '../../core/types'

export interface Meta {
  class: string
  id: string
  pointData: Coordinate
  radiusMin: number
  radius: number
}

export const getMeta = (
  canvas: Canvas,
  args: DrawArgs,
  radius: number
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

  const pointSpacing = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.length
  )

  const getCoordinates = (data: number[]): number[][] =>
    data.map((d, i) =>
      isVertical ? [d, pointSpacing[i]] : [pointSpacing[i], d]
    )

  const coordinates: number[][] = getCoordinates(data)

  const dataScale = scaleLinear()
    .domain(
      isVertical
        ? [
            lowestViewableValue,
            highestViewableValue !== 0
              ? highestViewableValue
              : Math.max(...coordinates.map((d) => +d[0])),
          ]
        : [
            lowestViewableValue,
            highestViewableValue !== 0
              ? highestViewableValue
              : Math.max(...coordinates.map((d) => +d[1])),
          ]
    )
    .range(isVertical ? [0, displayAreaWidth] : [displayAreaHeight, 0])

  let spacingScale: any
  if (isBanded) {
    spacingScale = scaleBand()
      .domain(
        isVertical
          ? coordinates.map((d) => d[1].toString())
          : coordinates.map((d) => d[0].toString())
      )
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  } else {
    spacingScale = scaleLinear()
      .domain(
        isVertical
          ? [0, Math.max(...coordinates.map((d) => d[1]))]
          : [0, Math.max(...coordinates.map((d) => d[0]))]
      )
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  }

  const x = (d: NumberValue[]) => {
    const space = isBanded
      ? spacingScale(d[0]) + spacingScale.bandwidth() / 2
      : spacingScale(d[0])
    return isVertical ? dataScale(d[0]) : space
  }
  const y = (d: NumberValue[]) => {
    const space = isBanded
      ? spacingScale(d[1]) + spacingScale.bandwidth() / 2
      : spacingScale(d[1])
    return isVertical ? space : dataScale(d[1])
  }

  const meta: Meta[] = coordinates.map((d, i) => {
    return {
      class: 'point',
      id: `point${uuidv4()}`,
      pointData: { x: x(d), y: y(d) },
      radiusMin: 0,
      radius: radius,
    }
  })
  return meta
}
