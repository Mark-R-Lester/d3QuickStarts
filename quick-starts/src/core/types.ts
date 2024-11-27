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

export interface ColorName {
  [key: string]: string
  colorName: string
}

export interface DomainName {
  [key: string]: string
  domainName: string
}
