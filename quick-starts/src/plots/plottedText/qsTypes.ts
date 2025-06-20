import { Selection } from 'd3'
import { PlottedTextConfig } from './types'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/enums/qsEnums'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'

export type QsPlottedTextConfig = Partial<PlottedTextConfig>

export interface QsPlottedTextData extends QsCoordinate {
  text?: string
  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAngle?: number
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
  textAlignmentBaseline?: QsEnumAlignmentBaseline
}

export interface QsPlottedTextTransitionData {
  data: QsPlottedTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPlottedText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsPlottedTextTransitionData) => void
}
