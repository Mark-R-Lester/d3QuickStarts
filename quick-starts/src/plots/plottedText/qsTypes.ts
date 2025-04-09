import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
} from '../../core/enums/qsEnums'
import { Selection } from 'd3'
import { QsCoordinate } from '../../d3QuickStart'

export interface QsPlottedTextConfig {
  [key: string]: number | string | undefined
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

export interface QsPlottedText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}

export interface QsPlottedTextArgs extends QsCoordinate {
  text: string
}
