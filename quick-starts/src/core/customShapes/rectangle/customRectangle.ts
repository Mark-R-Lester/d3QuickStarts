export interface RectangleConfig {
  height: number
  width: number
  x: number
  y: number
  topLeftCornerRadiusCx?: number
  topLeftCornerRadiusCy?: number
  topRightCornerRadiusCx?: number
  topRightCornerRadiusCy?: number
  bottomLeftCornerRadiusCx?: number
  bottomRightCornerRadiusCx?: number
  bottomLeftCornerRadiusCy?: number
  bottomRightCornerRadiusCy?: number
}

export const customRectangle = (params: RectangleConfig): string => {
  const {
    height,
    width,
    x,
    y,
    topRightCornerRadiusCx = 0,
    topRightCornerRadiusCy = 0,
    topLeftCornerRadiusCx = 0,
    topLeftCornerRadiusCy = 0,
    bottomLeftCornerRadiusCx = 0,
    bottomLeftCornerRadiusCy = 0,
    bottomRightCornerRadiusCx = 0,
    bottomRightCornerRadiusCy = 0,
  } = params

  const topRightX: number = x + width - topRightCornerRadiusCx
  const topRightY: number = y + topRightCornerRadiusCy
  const bottomRightX: number = x + width - bottomRightCornerRadiusCx
  const bottomRightY: number = y + height - bottomRightCornerRadiusCy
  const bottomLeftX: number = x + bottomLeftCornerRadiusCx
  const bottomLeftY: number = y + height - bottomLeftCornerRadiusCy
  const topLeftX: number = x + topLeftCornerRadiusCx
  const topLeftY: number = y + topLeftCornerRadiusCy

  const addTopRightCorner = (): string =>
    `L${topRightX},${y} A${topRightCornerRadiusCx},${topRightCornerRadiusCy} 0 0 1 ${x + width},${topRightY}`

  const addBottomRightCorner = (): string =>
    `L${x + width},${bottomRightY} A${bottomRightCornerRadiusCx},${bottomRightCornerRadiusCy} 0 0 1 ${bottomRightX},${y + height}`

  const addBottomLeftCorner = (): string =>
    `L${bottomLeftX},${y + height} A${bottomLeftCornerRadiusCx},${bottomLeftCornerRadiusCy} 0 0 1 ${x},${bottomLeftY}`

  const addTopLeftCorner = (): string =>
    `L${x},${topLeftY} A${topLeftCornerRadiusCx},${topLeftCornerRadiusCy} 0 0 1 ${topLeftX},${y}`

  const result = [
    `M${topLeftX},${y}`,
    addTopRightCorner(),
    addBottomRightCorner(),
    addBottomLeftCorner(),
    addTopLeftCorner(),
    'Z',
  ].join(' ')

  console.log('result', result)

  return result
}
