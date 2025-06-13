import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
} from '../../core/enums/qsEnums'

export interface RadialTextConfigStrictBase {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  x: number
  y: number
  defaultDecimalPoints: number
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textStroke: string
}

export interface RadialTextConfigStrict extends RadialTextConfigStrictBase {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  textAnchor: QsEnumTextAnchor
}
