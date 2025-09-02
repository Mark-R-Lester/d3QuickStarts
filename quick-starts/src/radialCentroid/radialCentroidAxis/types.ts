import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
} from '../../core/enums/qsEnums'
import { QsOrdinalScaleData } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'

interface RingData {
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  textLocation: number[]
  text: number | string
}

export interface CalculatedData extends StrokeData {
  [key: string]: string | RingData | number
  ringId: string
  textId: string
  ringData: RingData
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
  textAlignmentBaseline: QsEnumAlignmentBaseline
}

export interface RadialAxisConfig extends StrokeData {
  [key: string]: number | undefined | string | boolean | QsOrdinalScaleData
  useDataArea: boolean
  radius: number
  x: number
  y: number
  axisAngle: number
  gap: number
  numberOfRings: number

  ordinalScale?: QsOrdinalScaleData

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
