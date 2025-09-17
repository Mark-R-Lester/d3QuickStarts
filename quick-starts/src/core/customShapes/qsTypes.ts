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
  | { shape: QsEnumShape.STAR; config: QsStarConfig }
  | { shape: QsEnumShape.POLYGON; config: QsPolygonConfig }
  | { shape: QsEnumShape.CIRCLE; config: QsCircleConfig }
  | { shape: QsEnumShape.RECTANGLE; config: QsRectangleConfig }
