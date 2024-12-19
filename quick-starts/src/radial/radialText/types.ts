import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
} from '../../core/qsEnums'

export interface QsValuedText {
  value: number
  text?: string
}

export interface RadialTextConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  x: number
  y: number
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAnchor: QsEnumTextAnchor
  textStroke: string
}
