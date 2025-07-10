import { GlobalDefaultColors, GlobalDefaultSettings } from '../../enums/enums'

import {
  QsEnumAlignmentBaseline,
  QsEnumAxisScaleType,
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsEnumScaleType,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../enums/qsEnums'
import { QsCanvasConfig } from '../../canvas/qsTypes'
import { QsRadialTextConfig } from '../../../radialArc/radialArcText/qsTypes'
import { QsRadialAreaConfig } from '../../../radialCentroid/radialCentroidArea/qsTypes'
import { QsRadialAxisConfig } from '../../../radialCentroid/radialCentroidAxis/qsTypes'
import { QsRadialLineConfig } from '../../../radialCentroid/radialCentroidLine/qsTypes'
import { QsRadialPointsConfig } from '../../../radialCentroid/radialCentroidPoints/qsTypes'
import { QsRadialSpokesConfig } from '../../../radialCentroid/radialCentroidSpokes/qsTypes'
import { QsRadialArcConfig } from '../../../radialArc/radialArc/qsTypes'
import { QsPlottedTextConfig } from '../../../plots/plottedText/qsTypes'
import { QsPlottedPointsConfig } from '../../../plots/plottedPoints/qsTypes'
import { QsPlottedLineConfig } from '../../../plots/plottedLine/qsTypes'
import { QsTextConfig } from '../../../linear/linearText/qsTypes'
import { QsPointsConfig } from '../../../linear/linearPoints/qsTypes'
import { QsLineConfig } from '../../../linear/linearLine/qsTypes'
import { QsBarStackedConfig } from '../../../linear/linearBarStack/qsTypes'
import { QsBarGroupConfig } from '../../../linear/linearBarGroup/qsTypes'
import { QsBarConfig } from '../../../linear/linearBar/qsTypes'
import { QsAxisConfig } from '../../../linear/linearAxis/qsTypes'
import { QsAreaConfig } from '../../../linear/linearArea/qsTypes'
import { QsLegendConfig } from '../../../unbound/legend/qsTypes'

export const canvasConfig: QsCanvasConfig = {
  chartName: '',
  width: 500,
  height: 350,
  marginRight: 7,
  marginLeft: 7,
  marginTop: 12,
  marginBottom: 12,
  highestViewableValue: 0,
  lowestViewableValue: 0,
  borderColor: 'transparent',
  displayAreaHeight: 0,
  displayAreaWidth: 0,
}

export const legendConfig: QsLegendConfig = {
  height: 2,
  width: 6,
  space: 10,
  x: 0,
  y: 0,
  defaultTextFont: QsEnumTextFont.SERIF,
  defaultTextFontSize: 5,
  defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
  defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
  defaultTextDecorationLine: QsEnumTextDecorationLine.NORMAL,
  defaultTextFill: 'black',
  defaultTextAngle: 0,
  defaultTextStroke: '',
  defaultTextAnchor: QsEnumTextAnchor.START,
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const linearAreaConfig: QsAreaConfig = {
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultFillColor: GlobalDefaultColors.AREA_FILL_COLOR,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.AREA_STROKE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

const linearAxisConfigBase: QsAxisConfig = {
  percentageMovement: 0,
  domainColor: GlobalDefaultColors.AXIS_COLOR,
  domainOpacity: 1,
  domainWidth: 2,
  domainScale: QsEnumAxisScaleType.LINEAR,
  tickColor: GlobalDefaultColors.AXIS_COLOR,
  tickOpacity: 1,
  tickWidth: 2,
  tickSizeInner: 2,
  tickSizeOuter: 2,
  tickPadding: 1,
  numberOfTicks: 0,
  textFont: QsEnumTextFont.SERIF,
  textFontSize: 6,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: GlobalDefaultColors.AXIS_COLOR,
  textAngle: 0,
  textStroke: '',
  textX: 0,
  textY: 0,
}

export const linearAxisConfigTop: QsAxisConfig = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
}

export const linearAxisConfigBottom: QsAxisConfig = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.HANGING,
}

export const linearAxisConfigLeft: QsAxisConfig = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.END,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const linearAxisConfigRight: QsAxisConfig = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.START,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const linearBarConfig: QsBarConfig = {
  padding: 8,
  defaultFillColor: GlobalDefaultColors.BAR_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.BAR_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

export const linearBarGroupConfig: QsBarGroupConfig = {
  colorRange: ['red', 'blue', 'green', 'orange'],
  padding: 20,
}

export const linearBarStackConfig: QsBarStackedConfig = {
  colorRange: ['red', 'blue', 'green', 'orange'],
  padding: 20,
}

export const linearLineConfig: QsLineConfig = {
  scaleType: QsEnumScaleType.LINEAR,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}

export const linearPointsConfig: QsPointsConfig = {
  scaleType: QsEnumScaleType.LINEAR,
  defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

export const linearTextConfig: QsTextConfig = {
  scaleType: QsEnumScaleType.LINEAR,
  defaultDecimalPoints: GlobalDefaultSettings.DECIMAL_POINTS,
  defaultTextFont: QsEnumTextFont.SERIF,
  defaultTextFontSize: GlobalDefaultSettings.FONT_SIZE,
  defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
  defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
  defaultTextDecorationLine: QsEnumTextDecorationLine.NORMAL,
  defaultTextFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  defaultTextAngle: GlobalDefaultSettings.TEXT_ANGLE,
  defaultTextStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  defaultTextAnchor: QsEnumTextAnchor.START,
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const plottedLineConfig: QsPlottedLineConfig = {
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}

export const plottedPointsConfig: QsPlottedPointsConfig = {
  defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

export const plottedTextConfig: QsPlottedTextConfig = {
  textFont: QsEnumTextFont.SERIF,
  textFontSize: GlobalDefaultSettings.FONT_SIZE,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  textAngle: GlobalDefaultSettings.TEXT_ANGLE,
  textStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  textAnchor: QsEnumTextAnchor.START,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const radialArcConfig: QsRadialArcConfig = {
  outerRadius: 100,
  innerRadius: 0,
  padding: 0,
  cornerRadius: 0,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

const radialArcTextConfigBase: QsRadialTextConfig = {
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  defaultDecimalPoints: GlobalDefaultSettings.DECIMAL_POINTS,
  textFont: QsEnumTextFont.SERIF,
  textFontSize: GlobalDefaultSettings.FONT_SIZE,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  textAngle: GlobalDefaultSettings.TEXT_ANGLE,
  textStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
}

export const radialArcTextConfigRotated: QsRadialTextConfig = {
  ...radialArcTextConfigBase,
  radius: 107,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialArcTextConfigHorizontal: QsRadialTextConfig = {
  ...radialArcTextConfigBase,
  radius: 107,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialArcTextConfigSpoke: QsRadialTextConfig = {
  ...radialArcTextConfigBase,
  radius: 103,
  textAnchor: QsEnumTextAnchor.START,
}

export const radialArcTextConfigFollow: QsRadialTextConfig = {
  ...radialArcTextConfigBase,
  radius: 103,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialCentroidAreaConfig: QsRadialAreaConfig = {
  curve: QsEnumCurve.LINEAR,
  x: 50,
  y: 50,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultFillColor: GlobalDefaultColors.AREA_FILL_COLOR,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.AREA_STROKE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

export const radialCentroidAxisConfig: QsRadialAxisConfig = {
  radius: 100,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  axisAngle: 0,
  gap: 15,
  strokeColor: GlobalDefaultColors.AXIS_COLOR,
  strokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  strokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
  textFont: QsEnumTextFont.SERIF,
  textFontSize: GlobalDefaultSettings.FONT_SIZE,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  textStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const radialCentroidLineConfig: QsRadialLineConfig = {
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
}

export const radialCentroidPointsConfig: QsRadialPointsConfig = {
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

export const radialCentroidSpokesConfig: QsRadialSpokesConfig = {
  radius: 100,
  innerRadius: 0,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  strokeColor: GlobalDefaultColors.AXIS_COLOR,
  strokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  strokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}
