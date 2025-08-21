import {
  QsEnumAxisScaleType,
  QsEnumColorScale,
  QsEnumDataScale,
} from '../enums/qsEnums'

export interface QsCoordinate {
  [key: string]: number | string | undefined
  x: number
  y: number
}

/*
 * Color scale data must use it's own types/interface
 * So they are free to diverge from other scale types/interface
 *
 */

export interface QsOrdinalScaleData {
  type: QsEnumColorScale.ORDINAL
  range: string[]
  domain?: never
}
export interface QsSequentialScaleData {
  type: QsEnumColorScale.SEQUENTIAL
  range: string[]
  domain: number[]
}

/*
 * Axis scale data must use it's own types/interface
 * So they are free to diverge from other scale types/interface
 *
 */

export interface QsBandedAxisScaleData {
  type: QsEnumAxisScaleType.BANDED
  domain: number[] | string[]
}

export interface QsPointAxisScaleData {
  type: QsEnumAxisScaleType.POINT
  domain: number[] | string[]
}

export type QsColorScaleData = QsOrdinalScaleData | QsSequentialScaleData
export type QsAxisScaleData = QsBandedAxisScaleData | QsPointAxisScaleData

export interface QsTransitionArgs {
  [key: string]: number | undefined
  delayInMiliSeconds?: number
  durationInMiliSeconds?: number
}

export type QsDataScale =
  | {
      scale:
        | QsEnumDataScale.LINEAR
        | QsEnumDataScale.SQRT
        | QsEnumDataScale.SYMLOG
    }
  | { scale: QsEnumDataScale.POWER; exponent: number }
