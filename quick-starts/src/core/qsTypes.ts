export interface QsCoordinate {
  [key: string]: number | undefined
  x: number
  y: number
}

export interface QsCoordinateEnhanced extends QsCoordinate {
  [key: string]: number | undefined
  radius?: number
  opacity?: number
}

export interface QsColorName {
  [key: string]: string
  colorName: string
}

export interface QsDomainName {
  [key: string]: string
  domainName: string
}

export interface QsTransitionArgs {
  [key: string]: number | undefined
  durationInMiliSeconds?: number
}
