import { GlobalDefaultColors, GlobalDefaultSettings } from '../enums/enums'

import { LegendConfig } from '../../unbound/legend/types'
import { AreaConfig } from '../../orthogonal/orthogonalArea/types'
import {
  AxisConfig,
  AxisConfigBase,
} from '../../orthogonal/orthogonalAxis/types'
import { BarConfig } from '../../orthogonal/orthogonalBar/types'
import { BarGroupConfig } from '../../orthogonal/orthogonalBarGroup/types'

import { BarStackedConfig } from '../../orthogonal/orthogonalBarStack/types'
import { LineConfig } from '../../orthogonal/orthogonalLine/types'
import { PointsConfig } from '../../orthogonal/orthogonalPoints/types'
import { TextConfig } from '../../orthogonal/orthogonalText/types'
import { PlottedLineConfig } from '../../plots/plottedLine/types'
import { PlottedPointsConfig } from '../../plots/plottedPoints/calculatedData'
import { PlottedTextConfig } from '../../plots/plottedText/types'
import { ArcConfig } from '../../radialArc/radialArc/types'
import {
  ArcTextConfig,
  ArcTextConfigBase,
} from '../../radialArc/radialArcText/types'

import { CentroidAreaConfig } from '../../radialCentroid/radialCentroidArea/types'
import { CentroidAxisConfig } from '../../radialCentroid/radialCentroidAxis/types'
import { CentroidLineConfig } from '../../radialCentroid/radialCentroidLine/types'
import { CentroidPointsConfig } from '../../radialCentroid/radialCentroidPoints/types'
import { CentroidSpokesConfig } from '../../radialCentroid/radialCentroidSpokes/types'
import {
  QsEnumAlignmentBaseline,
  QsEnumColorScale,
  QsEnumCurve,
  QsEnumLayerType,
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
import { CentroidTextConfig } from '../../radialCentroid/radialCentroidText/types'
import { QsEnumCoordinateView } from '../../plots/plottedText/qsEnums'
import { CanvasConfig } from '../../canvas/types'

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
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
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
  highestViewableValueY: 0,
  lowestViewableValueY: 0,
  highestViewableValueX: 0,
  lowestViewableValueX: 0,
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

export const orthogonalAreaConfig: AreaConfig = {
  layerType: QsEnumLayerType.DATA,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultFillColor: GlobalDefaultColors.AREA_FILL_COLOR,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.AREA_STROKE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

const orthogonalAxisConfigBase: AxisConfigBase = {
  layerType: QsEnumLayerType.UNBOUND,
  percentageMovement: 0,

  domainColor: GlobalDefaultColors.AXIS_COLOR,
  domainOpacity: 1,
  domainWidth: 2,
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

export const orthogonalAxisConfigTop: AxisConfig = {
  ...orthogonalAxisConfigBase,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
}

export const orthogonalAxisConfigBottom: AxisConfig = {
  ...orthogonalAxisConfigBase,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAlignmentBaseline: QsEnumAlignmentBaseline.HANGING,
}

export const orthogonalAxisConfigLeft: AxisConfig = {
  ...orthogonalAxisConfigBase,
  textAnchor: QsEnumTextAnchor.END,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const orthogonalAxisConfigRight: AxisConfig = {
  ...orthogonalAxisConfigBase,
  textAnchor: QsEnumTextAnchor.START,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const orthogonalBarConfig: BarConfig = {
  layerType: QsEnumLayerType.DATA,
  padding: 8,
  defaultFillColor: GlobalDefaultColors.BAR_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.BAR_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
  fillColorScaleData: undefined,
  strokeColorScaleData: undefined,
}

export const orthogonalBarGroupConfig: BarGroupConfig = {
  layerType: QsEnumLayerType.DATA,
  colorRange: defaultFillColorArray,
  padding: 20,
  defaultFillOpacity: 1,
  defaultStrokeColor: 'none',
  defaultStrokeWidth: 0,
  defaultStrokeOpacity: 1,
}

export const orthogonalBarStackConfig: BarStackedConfig = {
  layerType: QsEnumLayerType.DATA,
  colorRange: defaultFillColorArray,
  padding: 20,
  defaultFillOpacity: 1,
  defaultStrokeColor: 'none',
  defaultStrokeWidth: 0,
  defaultStrokeOpacity: 1,
}

export const orthogonalLineConfig: LineConfig = {
  layerType: QsEnumLayerType.DATA,
  scaleType: QsEnumScaleType.LINEAR,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}

export const orthogonalPointsConfig: PointsConfig = {
  layerType: QsEnumLayerType.DATA,
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

export const orthogonalTextConfig: TextConfig = {
  layerType: QsEnumLayerType.DATA,
  scaleType: QsEnumScaleType.LINEAR,
  defaultDecimalPoints: GlobalDefaultSettings.DECIMAL_POINTS,
  ...textDefaults,
}

export const plottedLineConfig: PlottedLineConfig = {
  layerType: QsEnumLayerType.DATA,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
}

export const plottedPointsConfig: PlottedPointsConfig = {
  layerType: QsEnumLayerType.DATA,
  defaultRadius: GlobalDefaultSettings.POINT_RADIUS,
  defaultFillColor: GlobalDefaultColors.POINT_FILL,
  defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
  defaultStrokeColor: GlobalDefaultColors.POINT_STROKE,
  defaultStrokeWidth: GlobalDefaultSettings.POINT_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
}

export const plottedTextConfig: PlottedTextConfig = {
  layerType: QsEnumLayerType.DATA,
  defaultDecimalPoints: 0,
  defaultCooridinateView: QsEnumCoordinateView.SHOW_X_AND_Y,
  ...textDefaults,
}

export const radialArcConfig: ArcConfig = {
  layerType: QsEnumLayerType.DATA,
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

const radialArcTextConfigBase: ArcTextConfigBase = {
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

export const radialArcTextConfigRotated: ArcTextConfig = {
  layerType: QsEnumLayerType.UNBOUND,
  ...radialArcTextConfigBase,
  radius: 107,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialArcTextConfigHorizontal: ArcTextConfig = {
  layerType: QsEnumLayerType.UNBOUND,
  ...radialArcTextConfigBase,
  radius: 107,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const radialArcTextConfigSpoke: ArcTextConfig = {
  layerType: QsEnumLayerType.UNBOUND,
  ...radialArcTextConfigBase,
  radius: 103,
  textAnchor: QsEnumTextAnchor.START,
}

export const radialArcTextConfigFollow: ArcTextConfig = {
  layerType: QsEnumLayerType.UNBOUND,
  ...radialArcTextConfigBase,
  radius: 103,
  textAnchor: QsEnumTextAnchor.MIDDLE,
}

export const centroidAreaConfig: CentroidAreaConfig = {
  layerType: QsEnumLayerType.DATA,
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

export const centroidAxisConfig: CentroidAxisConfig = {
  layerType: QsEnumLayerType.UNBOUND,
  showCentralTick: true,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  defaultAxisAngle: 0,
  defaultGap: 0,
  numberOfTicks: 4,

  defaultStrokeColor: 'lightGrey',
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: 0.5,

  defaultTextFont: QsEnumTextFont.SERIF,
  defaultTextFontSize: GlobalDefaultSettings.FONT_SIZE,
  defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
  defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
  defaultTextDecorationLine: QsEnumTextDecorationLine.NORMAL,
  defaultTextFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  defaultTextAngle: 0,
  defaultTextStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}

export const centroidLineConfig: CentroidLineConfig = {
  layerType: QsEnumLayerType.DATA,
  curve: QsEnumCurve.LINEAR,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: GlobalDefaultColors.LINE_COLOR,
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
}

export const centroidPointsConfig: CentroidPointsConfig = {
  layerType: QsEnumLayerType.DATA,
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

export const centroidTextsConfig: CentroidTextConfig = {
  layerType: QsEnumLayerType.DATA,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  defaultDecimalPoints: GlobalDefaultSettings.DECIMAL_POINTS,
  ...textDefaults,
}

export const centroidSpokesConfig: CentroidSpokesConfig = {
  layerType: QsEnumLayerType.UNBOUND,
  defaultOuterRadius: 100,
  defaultInnerRadius: 0,
  x: GlobalDefaultSettings.RADIAL_X,
  y: GlobalDefaultSettings.RADIAL_Y,
  defaultStrokeColor: 'grey',
  defaultStrokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
  defaultStrokeOpacity: 0.5,
  numberOfSpokes: 5,
}
