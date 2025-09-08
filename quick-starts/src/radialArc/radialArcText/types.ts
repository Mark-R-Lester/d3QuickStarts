import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumScaleType,
} from '../../core/enums/qsEnums'
import { QsRadialTextData } from './qsTypes'

export interface RadialArcTextConfigBase {
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

export interface RadialArcTextConfig extends RadialArcTextConfigBase {
  [key: string]:
    | number
    | Iterable<unknown>
    | Iterable<string>
    | undefined
    | boolean
  useDataArea: boolean
  radius: number
  textAnchor: QsEnumTextAnchor
}

export interface QsCalculatedDataRadialText {
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
  newData: QsRadialTextData
  data: QsRadialTextData
  index: number
  value: string | number
  newStartAngle: number
  startAngle: number
  newEndAngle: number
  endAngle: number
  outerRadius: number
  innerRadius: number
}
