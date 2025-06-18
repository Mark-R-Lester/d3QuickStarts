import { Orientation } from '../../core/enums/enums'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
  QsEnumScaleType,
} from '../../core/enums/qsEnums'
import { QsColorScaleData } from '../../core/types/qsTypes'
import { QsTextData } from './qsTypes'

export interface DrawArgs {
  data: QsTextData[]
  orientation: Orientation
}

export interface TextConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  scaleType: QsEnumScaleType
  defaultDecimalPoints: number
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
