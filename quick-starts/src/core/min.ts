import { QsCoordinate } from './types/qsTypes'

export const qsFindMin = (arrays: number[][]): number => {
  return Math.min(...arrays.map((arr) => Math.min(...arr)))
}

export const qsFindMinSum = (arrays: number[][]): number => {
  return Math.min(...arrays.map((arr) => arr.reduce((a, b) => a + b, 0)))
}

export const qsFindMinCoordinateX = (arrays: QsCoordinate[]): number => {
  return Math.min(...arrays.map((coordinate) => coordinate.x))
}

export const qsFindMinCoordinateY = (arrays: QsCoordinate[]): number => {
  return Math.min(...arrays.map((coordinate) => coordinate.y))
}
