import { ColorCommonInstance } from 'd3'
import { QsEnumColorScale } from '../enums/qsEnums'

export interface QsCoordinate {
  [key: string]: number | string | undefined
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

export interface QsColorScaleData {
  [key: string]: number[] | (string | ColorCommonInstance)[] | string
  domain: number[]
  range: (string | ColorCommonInstance)[]
  type: QsEnumColorScale
}

export interface QsTransitionArgs {
  [key: string]: number | undefined
  delayInMiliSeconds?: number
  durationInMiliSeconds?: number
}
