import { v4 as uuidv4 } from 'uuid'
import { QsCanvas } from '../../d3QuickStart'

export interface Meta {
  class: string
  id: string
  lineData: [number, number][]
}

export interface QsRadialSpokesTransitionArgs {
  x: number
  y: number
  radius: number
  innerRadius: number
}

export const getMeta = (
  canvas: QsCanvas,
  data: number,
  args: QsRadialSpokesTransitionArgs
) => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { x, y, radius, innerRadius } = args

  const meta: Meta[] = []

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
    meta[i] = {
      class: 'axisSpoke',
      id: `axisSpoke${uuidv4()}`,
      lineData: [
        [innerX, innerY],
        [outerX, outerY],
      ],
    }
  }
  return meta
}
