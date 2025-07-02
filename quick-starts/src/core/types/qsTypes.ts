import { OrdinalColorScaleData, SequentialColorScaleData } from './types'

export interface QsCoordinate {
  [key: string]: number | string | undefined
  x: number
  y: number
}

export type QsColorScaleData = OrdinalColorScaleData | SequentialColorScaleData

export interface QsTransitionArgs {
  [key: string]: number | undefined
  delayInMiliSeconds?: number
  durationInMiliSeconds?: number
}
