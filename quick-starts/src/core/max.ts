import { Coordinate } from './types'

export const qsFindMax = (arrays: number[][]): number => {
  return Math.max(...arrays.map((arr) => Math.max(...arr)))
}

export const qsFindMaxSum = (arrays: number[][]): number => {
  return Math.max(...arrays.map((arr) => arr.reduce((a, b) => a + b, 0)))
}

export const qsFindMaxCoordinateX = (arrays: Coordinate[]): number => {
  return Math.max(...arrays.map((coordinate) => coordinate.x))
}

export const qsFindMaxCoordinateY = (arrays: Coordinate[]): number => {
  return Math.max(...arrays.map((coordinate) => coordinate.y))
}
