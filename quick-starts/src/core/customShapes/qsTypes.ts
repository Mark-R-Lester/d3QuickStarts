import { QsBaseAnchor, QsHeightAnchor, QsEnumShape } from './qsEnums'

export interface QsTriangleConfig {
  angle1?: number
  angle2?: number
  baseLength: number
  baseAnchor?: QsBaseAnchor
  heightAnchor?: QsHeightAnchor
  rotationAngle?: number
}

export interface QsStarConfig {
  points: number
  outerRadius: number
  innerRadius?: number
  baseAnchor?: QsBaseAnchor
  heightAnchor?: QsHeightAnchor
  rotationAngle?: number
}

export interface QsPolygonConfig {
  sides: number
  radius: number
  baseAnchor?: QsBaseAnchor
  heightAnchor?: QsHeightAnchor
  rotationAngle?: number
}

export interface QsCircleConfig {
  radius: number
}

export interface QsRectangleConfig {
  height: number
  width: number
  topLeftCornerRadiusCx?: number
  topLeftCornerRadiusCy?: number
  topRightCornerRadiusCx?: number
  topRightCornerRadiusCy?: number
  bottomLeftCornerRadiusCx?: number
  bottomRightCornerRadiusCx?: number
  bottomLeftCornerRadiusCy?: number
  bottomRightCornerRadiusCy?: number
}

export type QsShape =
  | { type: QsEnumShape.STAR; config: QsStarConfig }
  | { type: QsEnumShape.POLYGON; config: QsPolygonConfig }
  | { type: QsEnumShape.CIRCLE; config: QsCircleConfig }
  | { type: QsEnumShape.RECTANGLE; config: QsRectangleConfig }
