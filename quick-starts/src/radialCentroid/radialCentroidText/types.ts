import { QsEnumLayerType } from '../../core/enums/qsEnums'
import { QsColorScaleData, QsCoordinate } from '../../core/types/qsTypes'
import { ConfigTextDefaults, TextData } from '../../core/types/types'

export interface CentroidTextConfig extends ConfigTextDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  layerType: QsEnumLayerType
  x: number
  y: number
  defaultDecimalPoints: number
  fixedPositionActive: boolean
  fixedPosition: number
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
