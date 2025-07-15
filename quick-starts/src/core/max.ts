import { QsCoordinate } from './types/qsTypes'

export const qsFindMax = (arrays: number[][]): number => {
  return Math.max(...arrays.map((arr) => Math.max(...arr)))
}

export const qsFindMaxSum = (arrays: number[][]): number => {
  return Math.max(...arrays.map((arr) => arr.reduce((a, b) => a + b, 0)))
}

export const qsFindMaxCoordinateX = (coordinates: QsCoordinate[]): number => {
  return Math.max(...coordinates.map((coordinate) => coordinate.x))
}

export const qsFindMaxCoordinateY = (coordinates: QsCoordinate[]): number => {
  return Math.max(...coordinates.map((coordinate) => coordinate.y))
}
