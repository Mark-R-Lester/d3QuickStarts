import { scaleLinear, scaleBand, NumberValue, range, Selection } from 'd3'
import { QsCanvas } from '../../d3QuickStart'
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
  canvas: QsCanvas,
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

  const getCoordinates = (data: number[]): Coordinate[] =>
    data.map((d, i) =>
      isVertical ? { x: d, y: pointSpacing[i] } : { x: pointSpacing[i], y: d }
    )

  const coordinates: Coordinate[] = getCoordinates(data)

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

  const x = (d: Coordinate) => {
    const space = isBanded
      ? spacingScale(d.x) + spacingScale.bandwidth() / 2
      : spacingScale(d.x)
    return isVertical ? dataScale(d.x) : space
  }
  const y = (d: Coordinate) => {
    const space = isBanded
      ? spacingScale(d.y) + spacingScale.bandwidth() / 2
      : spacingScale(d.y)
    return isVertical ? space : dataScale(d.y)
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
