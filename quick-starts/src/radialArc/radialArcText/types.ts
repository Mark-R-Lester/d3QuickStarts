import {
  QsEnumTextAnchor,
  QsEnumScaleType,
  QsEnumLayerType,
} from '../../core/enums/qsEnums'
import { ConfigTextDefaults, TextData } from '../../core/types/types'
import { QsArcTextData } from './qsTypes'

export interface ArcTextConfigBase
  extends Omit<ConfigTextDefaults, 'defaultTextAngle'> {
  [key: string]:
    | number
    | Iterable<unknown>
    | Iterable<string>
    | undefined
    | boolean
    | undefined
  x: number
  y: number
  scaleType: QsEnumScaleType
  defaultDecimalPoints: number
  defaultTextAngle?: never
}

export interface ArcTextConfig extends ArcTextConfigBase {
  [key: string]:
    | number
    | Iterable<unknown>
    | Iterable<string>
    | undefined
    | boolean
  layerType: QsEnumLayerType
  radius: number
  textAnchor: QsEnumTextAnchor
}

export interface QsCalculatedDataArcText {
  textArcData: TextArcData[]
  x: number
  y: number
}

export interface TextArcData extends Omit<TextData, 'textAngle'> {
  textId: string
  arcId: string
  newData: QsArcTextData
  data: QsArcTextData
  index: number
  value: string | number
  newStartAngle: number
  startAngle: number
  newEndAngle: number
  endAngle: number
  outerRadius: number
  innerRadius: number
  decimalPoints: number
}
