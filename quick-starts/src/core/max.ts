import { Coordinate } from './types'

export const findMax = (arrays: number[][]): number => {
  return Math.max(...arrays.map((arr) => Math.max(...arr)))
}

export const findMaxSum = (arrays: number[][]): number => {
  return Math.max(...arrays.map((arr) => arr.reduce((a, b) => a + b, 0)))
}

export const findMaxCoordinateX = (arrays: Coordinate[]): number => {
  return Math.max(...arrays.map((coordinate) => coordinate.x))
}

export const findMaxCoordinateY = (arrays: Coordinate[]): number => {
  return Math.max(...arrays.map((coordinate) => coordinate.y))
}
