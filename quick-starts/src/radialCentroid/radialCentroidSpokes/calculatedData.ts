import { v4 as uuidv4 } from 'uuid'
import { Canvas } from '../../canvas/types'

import { CalculatedData, RadialSpokesConfig } from './types'
import { alignIndexClockwise } from './calculateIndexForCorrectOrientation'

export const getCalculatedData = (
  canvas: Canvas,
  config: RadialSpokesConfig
) => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const {
    x,
    y,
    defaultOuterRadius,
    defaultInnerRadius,
    numberOfSpokes,
    spokeConfig,
    defaultStrokeWidth,
    defaultStrokeColor,
    defaultStrokeOpacity,
  } = config
  const { genralPercentScale } = canvas.scales
  const calculatedData: CalculatedData[] = []
  const xCenter = (displayAreaWidth / 100) * x
  const yCenter = (displayAreaHeight / 100) * y

  for (let i = 0; i < numberOfSpokes; i++) {
    const spoke = spokeConfig?.find((spoke) => spoke.spokeNumber === i)
    const {
      outerRadius,
      innerRadius,
      strokeColor,
      strokeOpacity,
      strokeWidth,
    } = spoke ?? {}

    const alignOddnumbers = (numberOfSpokes % 2) / 2
    const rotateOneEighty = 2 * Math.PI

    const radians =
      (((Math.PI * 2) / numberOfSpokes) *
        (alignIndexClockwise(i, numberOfSpokes) + alignOddnumbers)) %
      rotateOneEighty

    const outerHypotenuse =
      ((displayAreaHeight / 2) * (outerRadius ?? defaultOuterRadius)) / 100
    const innerHypotenuse =
      ((displayAreaHeight / 2) * (innerRadius ?? defaultInnerRadius)) / 100
    const outerX = Math.sin(radians) * outerHypotenuse + xCenter
    const outerY = Math.cos(radians) * outerHypotenuse + yCenter
    const innerX = Math.sin(radians) * innerHypotenuse + xCenter
    const innerY = Math.cos(radians) * innerHypotenuse + yCenter
    calculatedData[i] = {
      id: `axisSpoke${uuidv4()}`,
      lineData: [
        [innerX, innerY],
        [outerX, outerY],
      ],
      strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
      strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,
      strokeColor: strokeColor ?? defaultStrokeColor,
    }
  }
  return calculatedData
}
