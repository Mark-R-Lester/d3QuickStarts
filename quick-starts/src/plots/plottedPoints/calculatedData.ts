import { Canvas } from '../../core/canvas/canvas'
import { QsPlottedPointsData } from './qsTypes'
import { PlottedPointsConfig } from './types'

export interface CalculatedData {
  x: number
  y: number
  radius: number
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsPlottedPointsData[],
  config: PlottedPointsConfig
): CalculatedData[] => {
  const { xDataScalePlotted, yDataScalePlotted, genralPercentScale } =
    canvas.scales
  const {
    defaultRadius,
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
  } = config

  const calculatedData: CalculatedData[] = data.map((d, i) => {
    return {
      x: xDataScalePlotted(d.x),
      y: yDataScalePlotted(d.y),
      radius: genralPercentScale(d.radius ?? defaultRadius),
      fillColor: d.fillColor ?? defaultFillColor,
      strokeColor: d.strokeColor ?? defaultStrokeColor,
      fillOpacity: d.fillOpacity ?? defaultFillOpacity,
      strokeWidth: genralPercentScale(d.strokeWidth ?? defaultStrokeWidth),
      strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
    }
  })

  return calculatedData
}
export { PlottedPointsConfig }
