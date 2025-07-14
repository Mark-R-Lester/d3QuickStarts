import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumScaleType,
} from '../../core/enums/qsEnums'

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
