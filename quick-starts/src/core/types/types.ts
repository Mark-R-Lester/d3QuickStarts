import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../enums/qsEnums'

export interface transitionArgs {
  [key: string]: number | undefined
  delayInMiliSeconds: number
  durationInMiliSeconds: number
}

/*
 * Color stroke defaults
 */
export interface ConfigStrokeDefaults {
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
}

export interface ConfigTextDefaults {
  defaultTextFont: QsEnumTextFont | string
  defaultTextFontSize: number
  defaultTextFontStyle: QsEnumTextFontStyle
  defaultTextFontWeight: QsEnumTextFontWeight | number
  defaultTextDecorationLine: QsEnumTextDecorationLine
  defaultTextFill: string
  defaultTextAngle: number
  defaultTextAnchor: QsEnumTextAnchor
  defaultTextStroke: string
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline
}

export interface TextData {
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAngle: number
  textAnchor: QsEnumTextAnchor
  textStroke: string
  textAlignmentBaseline: QsEnumAlignmentBaseline
}
