import { ChartEdge } from '../../core/enums/enums'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
  QsEnumAxisScaleType,
} from '../../d3QuickStart'

export interface AxisConfigStrictBase {
  [key: string]: number | boolean | string | undefined
  percentageMovement: number

  domainColor: string
  domainOpacity: number
  domainWidth: number
  domainScale: QsEnumAxisScaleType
  tickColor: string
  tickOpacity: number
  tickWidth: number
  tickSizeInner: number
  tickSizeOuter: number
  tickPadding: number
  numberOfTicks: number

  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAngle: number
  textStroke: string
  textX: number
  textY: number
}

export interface AxisConfigStrict extends AxisConfigStrictBase {
  [key: string]: number | boolean | string | undefined
  textAnchor: QsEnumTextAnchor
  textAlignmentBaseline: QsEnumAlignmentBaseline
}

export interface DrawArgs {
  data: string[] | number[]
  chartEdge: ChartEdge
}
