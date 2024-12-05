import { scaleLinear, scaleBand, NumberValue, range, Selection } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'

export interface Meta {
  class: string
  id: string
  pointData: number[]
  radiusMin: number
  radius: number
}

export const getMeta = (
  canvas: Canvas,
  data: number[],
  vertical: boolean,
  banded: boolean,
  radius: number
): Meta[] => {
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config

  const pointSpacing = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.length
  )

  const getCoordinates = (data: number[]): number[][] =>
    data.map((d, i) => (vertical ? [d, pointSpacing[i]] : [pointSpacing[i], d]))

  const coordinates: number[][] = getCoordinates(data)

  const dataScale = scaleLinear()
    .domain(
      vertical
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
    .range(vertical ? [0, displayAreaWidth] : [displayAreaHeight, 0])

  let spacingScale: any
  if (banded) {
    spacingScale = scaleBand()
      .domain(
        vertical
          ? coordinates.map((d) => d[1].toString())
          : coordinates.map((d) => d[0].toString())
      )
      .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  } else {
    spacingScale = scaleLinear()
      .domain(
        vertical
          ? [0, Math.max(...coordinates.map((d) => d[1]))]
          : [0, Math.max(...coordinates.map((d) => d[0]))]
      )
      .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  }

  const x = (d: NumberValue[]) => {
    const space = banded
      ? spacingScale(d[0]) + spacingScale.bandwidth() / 2
      : spacingScale(d[0])
    return vertical ? dataScale(d[0]) : space
  }
  const y = (d: NumberValue[]) => {
    const space = banded
      ? spacingScale(d[1]) + spacingScale.bandwidth() / 2
      : spacingScale(d[1])
    return vertical ? space : dataScale(d[1])
  }

  const meta: Meta[] = coordinates.map((d, i) => {
    return {
      class: 'point',
      id: `point${uuidv4()}`,
      pointData: [x(d), y(d)],
      radiusMin: 0,
      radius: radius,
    }
  })
  return meta
}
