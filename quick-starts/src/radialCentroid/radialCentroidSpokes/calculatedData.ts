import { v4 as uuidv4 } from 'uuid'
import { Canvas } from '../../d3QuickStart'

import { CalculatedData, RadialSpokesConfigStrict } from './types'

export const getCalculatedData = (
  canvas: Canvas,
  data: number,
  config: RadialSpokesConfigStrict
) => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { x, y, radius, innerRadius, strokeWidth } = config
  const { genralPercentScale } = canvas.scales

  const calculatedData: CalculatedData[] = []

  const xCenter = (displayAreaWidth / 100) * x
  const yCenter = (displayAreaHeight / 100) * y

  for (let i = 0; i < data; i++) {
    const angle = ((Math.PI * 2) / data) * i
    const outerHypotenuse = ((displayAreaHeight / 2) * radius) / 100
    const innerHypotenuse = ((displayAreaHeight / 2) * innerRadius) / 100
    const outerX = Math.sin(angle) * outerHypotenuse + xCenter
    const outerY = Math.cos(angle) * outerHypotenuse + yCenter
    const innerX = Math.sin(angle) * innerHypotenuse + xCenter
    const innerY = Math.cos(angle) * innerHypotenuse + yCenter
    calculatedData[i] = {
      class: 'axisSpoke',
      id: `axisSpoke${uuidv4()}`,
      lineData: [
        [innerX, innerY],
        [outerX, outerY],
      ],
      strokeWidth: genralPercentScale(strokeWidth),
    }
  }
  return calculatedData
}
