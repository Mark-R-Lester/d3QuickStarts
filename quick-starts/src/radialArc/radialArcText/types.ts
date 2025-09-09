import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumScaleType,
  QsEnumLayerType,
} from '../../core/enums/qsEnums'
import { QsArcTextData } from './qsTypes'

export interface ArcTextConfigBase {
  [key: string]:
    | number
    | Iterable<unknown>
    | Iterable<string>
    | undefined
    | boolean
  x: number
  y: number
  scaleType: QsEnumScaleType
  defaultDecimalPoints: number
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textStroke: string
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
  arcClass: string
  textClass: string
  textArcData: TextArcData[]
  x: number
  y: number
  textFontSize: number
}

export interface TextArcData {
  textId: string
  textClass: string
  arcId: string
  arcClass: string
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
}
