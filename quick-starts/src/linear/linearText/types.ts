import { Orientation } from '../../core/enums/enums'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
  QsScaleType,
} from '../../core/enums/qsEnums'
import { QsColorScaleData } from '../../d3QuickStart'
import { QsTextData } from './qsTypes'

export interface DrawArgs {
  data: QsTextData[]
  orientation: Orientation
  scaleType: QsScaleType
}

export interface TextConfigStrict {
  [key: string]: number | QsColorScaleData | string | undefined
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
