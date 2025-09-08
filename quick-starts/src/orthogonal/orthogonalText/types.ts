import { QsEnumLayerType, QsEnumScaleType } from '../../core/enums/qsEnums'
import { QsColorScaleData, QsCoordinate } from '../../core/types/qsTypes'
import { ConfigTextDefaults, TextData } from '../../core/types/types'

export interface TextConfig extends ConfigTextDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  layerType: QsEnumLayerType
  scaleType: QsEnumScaleType
  defaultDecimalPoints: number
}

export interface QsCalculatedDataOrthogonalText extends TextData {
  id: string
  coordinate: QsCoordinate
  text?: string
  newText?: string
  value: number
  diplayValue?: string
  newValue: number
}
