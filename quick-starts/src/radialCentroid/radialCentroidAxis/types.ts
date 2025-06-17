import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
} from '../../core/enums/qsEnums'

interface RingData {
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  textLocation: number[]
  text: number | string
}

export interface CalculatedData {
  [key: string]: string | RingData | number
  ringId: string
  textId: string
  ringClass: string
  textClass: string
  ringData: RingData
  x: number
  y: number
  textFontSize: number
  strokeWidth: number
}

export interface RadialAxisConfig {
  [key: string]: number | undefined | string
  radius: number
  x: number
  y: number
  axisAngle: number
  gap: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAnchor: QsEnumTextAnchor
  textStroke: string
  textAlignmentBaseline: QsEnumAlignmentBaseline
}
