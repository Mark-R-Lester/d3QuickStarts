import { Selection } from 'd3'
import { UnboundTextConfig } from './types'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/enums/qsEnums'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'

export type QsUnboundTextConfig = Partial<UnboundTextConfig>

export interface QsUnboundTextData extends QsCoordinate {
  text: string
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

export interface QsUnboundTextTransitionData {
  data: QsUnboundTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsUnboundText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsUnboundTextTransitionData) => void
}
