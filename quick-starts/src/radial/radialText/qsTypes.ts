import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
} from '../../core/enums/qsEnums'
import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsRadialTextConfig {
  [key: string]: string | number | undefined
  radius?: number
  x?: number
  y?: number
  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
}

export interface QsRadialTextTransitionArgs extends QsTransitionArgs {}

export interface QsRadialTextTransitionData {
  data: QsValuedText[]
  transitionArgs?: QsRadialTextTransitionArgs
}

export interface QsRadialText {
  elementText:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  elementArcs:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialTextTransitionData) => void
}

export interface QsValuedText {
  value: number
  text?: string
}
