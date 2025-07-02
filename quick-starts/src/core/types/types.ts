import {
  QsEnumAlignmentBaseline,
  QsEnumColorScale,
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

export interface ColorScale {
  [key: string]: number[] | string[] | string | undefined
  type: QsEnumColorScale
}

export interface OrdinalColorScaleData extends ColorScale {
  type: QsEnumColorScale.ORDINAL
  range: string[]
  domain?: never
}

export interface SequentialColorScaleData extends ColorScale {
  type: QsEnumColorScale.SEQUENTIAL
  range: string[]
  domain: number[]
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
