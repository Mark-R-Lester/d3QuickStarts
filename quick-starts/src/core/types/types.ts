import {
  QsEnumAlignmentBaseline,
  QsEnumAxisScaleType,
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
/*
 * Color scale data must use it's own types/interface
 * So they are free to diverge from other scale types/interface
 *
 */
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

/*
 * Axis scale data must use it's own types/interface
 * So they are free to diverge from other scale types/interface
 *
 */
export interface AxisScale {
  [key: string]: number[] | string[] | string | undefined
  type: QsEnumAxisScaleType
}

export interface BandedAxisScaleData extends AxisScale {
  type: QsEnumAxisScaleType.BANDED
  domain: number[] | string[]
}

export interface PointAxisScaleData extends AxisScale {
  type: QsEnumAxisScaleType.POINT
  domain: number[] | string[]
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
