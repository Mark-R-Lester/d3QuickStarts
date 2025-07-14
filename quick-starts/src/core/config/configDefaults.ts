import { GlobalDefaultColors, GlobalDefaultSettings } from '../enums/enums'

import { LegendConfig } from '../../unbound/legend/types'
import { AreaConfig } from '../../linear/linearArea/types'
import { AxisConfig, AxisConfigBase } from '../../linear/linearAxis/types'
import { BarConfig } from '../../linear/linearBar/types'
import { BarGroupConfig } from '../../linear/linearBarGroup/types'
import { CanvasConfig } from '../canvas/types'
import { BarStackedConfig } from '../../linear/linearBarStack/types'
import { LineConfig } from '../../linear/linearLine/types'
import { PointsConfig } from '../../linear/linearPoints/types'
import { TextConfig } from '../../linear/linearText/types'
import { PlottedLineConfig } from '../../plots/plottedLine/types'
import { PlottedPointsConfig } from '../../plots/plottedPoints/calculatedData'
import { PlottedTextConfig } from '../../plots/plottedText/types'
import { RadialArcConfig } from '../../radialArc/radialArc/types'
import {
  RadialArcTextConfig,
  RadialArcTextConfigBase,
} from '../../radialArc/radialArcText/types'

import { RadialAreaConfig } from '../../radialCentroid/radialCentroidArea/types'
import { RadialAxisConfig } from '../../radialCentroid/radialCentroidAxis/types'
import { RadialLineConfig } from '../../radialCentroid/radialCentroidLine/types'
import { RadialPointsConfig } from '../../radialCentroid/radialCentroidPoints/types'
import { RadialSpokesConfig } from '../../radialCentroid/radialCentroidSpokes/types'
import {
  QsEnumAlignmentBaseline,
  QsEnumAxisScaleType,
  QsEnumColorScale,
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsEnumScaleType,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../enums/qsEnums'
import { ConfigTextDefaults } from '../types/types'
import { QsColorScaleData } from '../types/qsTypes'
import { RadialTextConfig } from '../../radialCentroid/radialCentroidText/types'

const defaultFillColorArray: string[] = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'darkgreen',
  'pink',
  'brown',
  'gray',
  'gold',
  'indigo',
  'springgreen',
  'orangered',
  'steelblue',
  'greenyellow',
  'crimson',
  'chartreuse',
  'yellow',
  'magenta',
  'cyan',
]

const defaultFillColorScale: QsColorScaleData = {
  type: QsEnumColorScale.ORDINAL,
  range: defaultFillColorArray,
}

const textDefaults: ConfigTextDefaults = {
  defaultTextFont: QsEnumTextFont.SERIF,
  defaultTextFontSize: GlobalDefaultSettings.FONT_SIZE,
  defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
  defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
  defaultTextDecorationLine: QsEnumTextDecorationLine.NORMAL,
  defaultTextFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  defaultTextAngle: GlobalDefaultSettings.TEXT_ANGLE,
  defaultTextAnchor: QsEnumTextAnchor.START,
  defaultTextStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const canvasConfig: CanvasConfig = {
  ry: 0,
  rx: 0,
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
  fillColor: 'none',
  borderWidth: 2,
}

export const legendConfig: LegendConfig = {
  height: 2,
  width: 6,
  verticalSpacing: 6,
  relativeTextX: 6,
  relativeTextY: 0,
  x: 0,
  y: 3,
  ...textDefaults,
}

export const linearAreaConfig: AreaConfig = {
  useDataArea: true,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultFillColor: GlobalDefaultColors.AREA_FILL_COLOR,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.AREA_STROKE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

const linearAxisConfigBase: AxisConfigBase = {
  percentageMovement: 0,

  domainColor: GlobalDefaultColors.AXIS_COLOR,
  domainOpacity: 1,
  domainWidth: 2,
  domainScale: QsEnumAxisScaleType.LINEAR,
  tickColor: GlobalDefaultColors.AXIS_COLOR,
  tickOpacity: 1,
  tickWidth: 2,
  tickSizeInner: 0,
  tickSizeOuter: 0,
  tickPadding: 2,
  numberOfTicks: 0,

  textFont: QsEnumTextFont.SERIF,
  textFontSize: GlobalDefaultSettings.FONT_SIZE,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: GlobalDefaultColors.AXIS_COLOR,
  textAngle: GlobalDefaultSettings.TEXT_ANGLE,
  textStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  textX: 0,
  textY: 0,
}

export const linearAxisConfigTop: AxisConfig = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
}

export const linearAxisConfigBottom: AxisConfig = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.HANGING,
}

export const linearAxisConfigLeft: AxisConfig = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.END,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const linearAxisConfigRight: AxisConfig = {
  ...linearAxisConfigBase,
  textAnchor: QsEnumTextAnchor.START,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const linearBarConfig: BarConfig = {
  useDataArea: true,
  padding: 8,
  defaultFillColor: GlobalDefaultColors.BAR_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.BAR_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

export const linearBarGroupConfig: BarGroupConfig = {
  useDataArea: true,
  colorRange: defaultFillColorArray,
  padding: 20,
  fillOpacity: 1,
  strokeColor: 'none',
  strokeWidth: 0,
  strokeOpacity: 1,
}

export const linearBarStackConfig: BarStackedConfig = {
  useDataArea: true,
  colorRange: defaultFillColorArray,
  padding: 20,
  fillOpacity: 1,
  strokeColor: 'none',
  strokeWidth: 0,
  strokeOpacity: 1,
}

export const linearLineConfig: LineConfig = {
  useDataArea: true,
  scaleType: QsEnumScaleType.LINEAR,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}

export const linearPointsConfig: PointsConfig = {
  useDataArea: true,
  scaleType: QsEnumScaleType.LINEAR,
  defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.POINT_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

export const linearTextConfig: TextConfig = {
  useDataArea: true,
  scaleType: QsEnumScaleType.LINEAR,
  defaultDecimalPoints: GlobalDefaultSettings.DECIMAL_POINTS,
  ...textDefaults,
}

export const plottedLineConfig: PlottedLineConfig = {
  useDataArea: true,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}

export const plottedPointsConfig: PlottedPointsConfig = {
  useDataArea: true,
  defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.POINT_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

export const plottedTextConfig: PlottedTextConfig = {
  useDataArea: true,
  defaultDecimalPoints: 0,
  ...textDefaults,
}

export const radialArcConfig: RadialArcConfig = {
  useDataArea: true,
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
  fillColorScaleData: defaultFillColorScale,
  strokeColorScaleData: undefined,
}

const radialArcTextConfigBase: RadialArcTextConfigBase = {
  scaleType: QsEnumScaleType.LINEAR,
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

export const radialArcTextConfigRotated: RadialArcTextConfig = {
  useDataArea: true,
  ...radialArcTextConfigBase,
  radius: 107,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialArcTextConfigHorizontal: RadialArcTextConfig = {
  useDataArea: true,
  ...radialArcTextConfigBase,
  radius: 107,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialArcTextConfigSpoke: RadialArcTextConfig = {
  useDataArea: true,
  ...radialArcTextConfigBase,
  radius: 103,
  textAnchor: QsEnumTextAnchor.START,
}

export const radialArcTextConfigFollow: RadialArcTextConfig = {
  useDataArea: true,
  ...radialArcTextConfigBase,
  radius: 103,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialCentroidAreaConfig: RadialAreaConfig = {
  useDataArea: true,
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

export const radialCentroidAxisConfig: RadialAxisConfig = {
  useDataArea: true,
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

export const radialCentroidLineConfig: RadialLineConfig = {
  useDataArea: true,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
}

export const radialCentroidPointsConfig: RadialPointsConfig = {
  useDataArea: true,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.POINT_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

export const radialCentroidTextsConfig: RadialTextConfig = {
  useDataArea: true,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  defaultDecimalPoints: GlobalDefaultSettings.DECIMAL_POINTS,
  ...textDefaults,
}

export const radialCentroidSpokesConfig: RadialSpokesConfig = {
  useDataArea: true,
  radius: 100,
  innerRadius: 0,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  strokeColor: GlobalDefaultColors.AXIS_COLOR,
  strokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  strokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}
