import { QsEnumColorScale } from '../enums/qsEnums'

export interface transitionArgs {
  [key: string]: number | undefined
  delayInMiliSeconds: number
  durationInMiliSeconds: number
}

export interface ColorScale {
  [key: string]: number[] | string[] | string | undefined
  type: QsEnumColorScale
}

export interface OrdinalColorScaleData extends ColorScale {
  type: QsEnumColorScale.ORDINAL
  range: string[]
  domain?: never
}

export interface SequentialColorScaleData extends ColorScale {
  type: QsEnumColorScale.SEQUENTIAL
  range: string[]
  domain: number[]
}
