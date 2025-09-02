import { v4 as uuidv4 } from 'uuid'
import { Canvas } from '../../canvas/types'

import { CalculatedData, QsSpokeConfig, RadialSpokesConfig } from './types'

export const getCalculatedData = (
  canvas: Canvas,
  config: RadialSpokesConfig
) => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const {
    x,
    y,
    outerRadius,
    innerRadius,
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

  const getLineConfig = (
    spokeConfig: QsSpokeConfig[] | undefined,
    lineNumber: number
  ): QsSpokeConfig | undefined => {
    return spokeConfig?.find((spoke) => spoke.lineNumber === lineNumber)
  }

  for (let i = 0; i < numberOfSpokes; i++) {
    const spoke = getLineConfig(spokeConfig, i)

    const outerRadiusSpoke = spoke?.outerRadius
    const innerRadiusSpoke = spoke?.innerRadius
    const strokeColor = spoke?.strokeColor
    const strokeOpacity = spoke?.strokeOpacity
    const strokeWidth = spoke?.strokeWidth

    const radians = ((Math.PI * 2) / numberOfSpokes) * i
    const outerHypotenuse =
      ((displayAreaHeight / 2) * (outerRadiusSpoke ?? outerRadius)) / 100
    const innerHypotenuse =
      ((displayAreaHeight / 2) * (innerRadiusSpoke ?? innerRadius)) / 100
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
