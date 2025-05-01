import { BaseType, Selection } from 'd3'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
  QsEnumAxisScaleType,
} from '../../core/enums/qsEnums'

export interface QsAxisConfig {
  [key: string]: number | boolean | string | undefined
  percentageMovement?: number

  domainColor?: string
  domainOpacity?: number
  domainWidth?: number
  domainScale?: QsEnumAxisScaleType
  tickColor?: string
  tickOpacity?: number
  tickWidth?: number
  tickSizeInner?: number
  tickSizeOuter?: number
  tickPadding?: number
  numberOfTicks?: number

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
  textX?: number
  textY?: number
}

export interface QsAxis {
  element: Selection<BaseType, unknown, SVGGElement, unknown>
}
