import {
  QsEnumAlignmentBaseline,
  QsEnumAxisScaleType,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/enums/qsEnums'
import { QsAxisScaleData } from '../../d3QuickStart'

export interface AxisConfigBase {
  [key: string]: number | boolean | string | undefined | QsAxisScaleData
  percentageMovement: number

  domainColor: string
  domainOpacity: number
  domainWidth: number
  scale?: QsAxisScaleData
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

export interface AxisConfig extends AxisConfigBase {
  [key: string]: number | boolean | string | undefined | QsAxisScaleData
  textAnchor: QsEnumTextAnchor
  textAlignmentBaseline: QsEnumAlignmentBaseline
}
