import { QsColorScaleData, QsCoordinate } from '../../core/types/qsTypes'
import { ConfigTextDefaults, TextData } from '../../core/types/types'

export interface RadialTextConfig extends ConfigTextDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  useDataArea: boolean
  x: number
  y: number
  defaultDecimalPoints: number
}

export interface QsCalculatedDataCentroidText extends TextData {
  id: string
  coordinate: QsCoordinate
  x: number
  y: number
  text?: string
  newText?: string
  value: number
  newValue: number
  defaultDecimalPoints: number
}
