import { QsEnumDataScale } from '../enums/qsEnums'
import {
  BandedAxisScaleData,
  OrdinalColorScaleData,
  PointAxisScaleData,
  SequentialColorScaleData,
} from './types'

export interface QsCoordinate {
  [key: string]: number | string | undefined
  x: number
  y: number
}

export type QsColorScaleData = OrdinalColorScaleData | SequentialColorScaleData
export type QsAxisScaleData = BandedAxisScaleData | PointAxisScaleData

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
