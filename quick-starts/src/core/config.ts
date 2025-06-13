import { schemePurples } from 'd3'
import { GlobalDefaultColors, GlobalDefaultSettings } from './enums/enums'

import { LegendConfigStrict } from '../legend/types'
import { AreaConfigStrict } from '../linear/linearArea/types'
import {
  AxisConfigStrict,
  AxisConfigStrictBase,
} from '../linear/linearAxis/types'
import { BarConfigStrict } from '../linear/linearBar/types'
import { BarGroupConfigStrict } from '../linear/linearBarGroup/types'
import { CanvasConfigStrict } from '../canvas/types'
import { BarStackedConfigStrict } from '../linear/linearBarStack/types'
import { LineConfigStrict } from '../linear/linearLine/types'
import { PointsConfigStrict } from '../linear/linearPoints/types'
import { TextConfigStrict } from '../linear/linearText/types'
import { LinePlotConfigStrict } from '../plots/plottedLine/types'
import { PlottedPointsConfigStrict } from '../plots/plottedPoints/calculatedData'
import { PlottedTextConfigStrict } from '../plots/plottedText/types'
import { RadialConfigStrict } from '../radialArc/radialArc/types'
import {
  RadialTextConfigStrict,
  RadialTextConfigStrictBase,
} from '../radialArc/radialArcText/types'
import { RadialAreaConfigStrict } from '../radialCentroid/radialCentroidArea/types'
import { RadialAxisConfigStrict } from '../radialCentroid/radialCentroidAxis/types'
import { RadialLineConfigStrict } from '../radialCentroid/radialCentroidLine/types'
import { RadialPointsConfigStrict } from '../radialCentroid/radialCentroidPoints/types'
import { RadialSpokesConfigStrict } from '../radialCentroid/radialCentroidSpokes/types'
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
} from './enums/qsEnums'

export const canvasConfig: CanvasConfigStrict = {
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

export const legendConfig: LegendConfigStrict = {
  height: 2,
  width: 6,
  space: 10,
  x: 0,
  y: 0,
  textFont: QsEnumTextFont.SERIF,
  textFontSize: 10,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: 'black',
  textAngle: 0,
  textStroke: '',
  textAnchor: QsEnumTextAnchor.START,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const linearAreaConfig: AreaConfigStrict = {
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultFillColor: GlobalDefaultColors.AREA_FILL_COLOR,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.AREA_STROKE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

const linearAxisConfigBase: AxisConfigStrictBase = {
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

export const linearAxisConfigTop: AxisConfigStrict = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
}

export const linearAxisConfigBottom: AxisConfigStrict = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.HANGING,
}

export const linearAxisConfigLeft: AxisConfigStrict = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.END,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const linearAxisConfigRight: AxisConfigStrict = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.START,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const linearBarConfig: BarConfigStrict = {
  padding: 8,
  defaultFillColor: GlobalDefaultColors.BAR_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.BAR_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

export const linearBarGroupConfig: BarGroupConfigStrict = {
  colorRange: schemePurples[4],
  padding: 20,
}

export const linearBarStackConfig: BarStackedConfigStrict = {
  colorRange: schemePurples[4],
  padding: 20,
}

export const linearLineConfig: LineConfigStrict = {
  scaleType: QsEnumScaleType.LINEAR,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}

export const linearPointsConfig: PointsConfigStrict = {
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

export const linearTextConfig: TextConfigStrict = {
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

export const plottedLineConfig: LinePlotConfigStrict = {
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}

export const plottedPointsConfig: PlottedPointsConfigStrict = {
  defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

export const plottedTextConfig: PlottedTextConfigStrict = {
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

export const radialArcConfig: RadialConfigStrict = {
  outerRadius: 100,
  innerRadius: 0,
  padAngle: 0,
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

const radialArcTextConfigBase: RadialTextConfigStrictBase = {
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

export const radialArcTextConfigRotated: RadialTextConfigStrict = {
  ...radialArcTextConfigBase,
  radius: 107,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialArcTextConfigHorizontal: RadialTextConfigStrict = {
  ...radialArcTextConfigBase,
  radius: 107,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialArcTextConfigSpoke: RadialTextConfigStrict = {
  ...radialArcTextConfigBase,
  radius: 103,
  textAnchor: QsEnumTextAnchor.START,
}

export const radialArcTextConfigFollow: RadialTextConfigStrict = {
  ...radialArcTextConfigBase,
  radius: 103,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialCentroidAreaConfig: RadialAreaConfigStrict = {
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

export const radialCentroidAxisConfig: RadialAxisConfigStrict = {
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

export const radialCentroidLineConfig: RadialLineConfigStrict = {
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
}

export const radialCentroidPointsConfig: RadialPointsConfigStrict = {
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

export const radialCentroidSpokesConfig: RadialSpokesConfigStrict = {
  radius: 100,
  innerRadius: 0,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  strokeColor: GlobalDefaultColors.AXIS_COLOR,
  strokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  strokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}
