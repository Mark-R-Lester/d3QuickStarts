import { QsCoordinate } from './qsTypes'

export const findMin = (arrays: number[][]): number => {
  return Math.min(...arrays.map((arr) => Math.min(...arr)))
}

export const findMinSum = (arrays: number[][]): number => {
  return Math.min(...arrays.map((arr) => arr.reduce((a, b) => a + b, 0)))
}

export const findMinCoordinateX = (arrays: QsCoordinate[]): number => {
  return Math.min(...arrays.map((coordinate) => coordinate.x))
}

export const findMinCoordinateY = (arrays: QsCoordinate[]): number => {
  return Math.min(...arrays.map((coordinate) => coordinate.y))
}
