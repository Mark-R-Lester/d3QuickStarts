import { RectangleConfig } from '../../core/customShapes/rectangle/customRectangle'

export const rotateCorners = (params: RectangleConfig): RectangleConfig => ({
  height: params.height,
  width: params.width,
  x: params.x,
  y: params.y,
  topLeftCornerRadiusCx: params.bottomLeftCornerRadiusCx,
  topLeftCornerRadiusCy: params.bottomLeftCornerRadiusCy,
  topRightCornerRadiusCx: params.topLeftCornerRadiusCx,
  topRightCornerRadiusCy: params.topLeftCornerRadiusCy,
  bottomRightCornerRadiusCx: params.topRightCornerRadiusCx,
  bottomRightCornerRadiusCy: params.topRightCornerRadiusCy,
  bottomLeftCornerRadiusCx: params.bottomRightCornerRadiusCx,
  bottomLeftCornerRadiusCy: params.bottomRightCornerRadiusCy,
})
