export interface Coordinate {
  [key: string]: number | undefined
  x: number
  y: number
}

export interface CoordinateEnhanced extends Coordinate {
  [key: string]: number | undefined
  radius?: number
  opacity?: number
}
