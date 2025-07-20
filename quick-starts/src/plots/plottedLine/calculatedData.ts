import { Canvas } from '../../canvas/orthogonal/canvasOrthogonal'
import { QsPlottedLineData } from './qsTypes'
import { PlottedLineConfig } from './types'

export interface CalculatedData {
  coordinates: [number, number][]
  strokeOpacity: number
  strokeColor: string
  strokeWidth: number
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsPlottedLineData,
  config: PlottedLineConfig
): CalculatedData => {
  const { xDataScalePlotted, yDataScalePlotted, genralPercentScale } =
    canvas.scales
  const { coordinates, strokeOpacity, strokeColor, strokeWidth } = data
  const { defaultStrokeColor, defaultStrokeWidth, defaultStrokeOpacity } =
    config

  return {
    coordinates: coordinates.map((d) => [
      xDataScalePlotted(d.x),
      yDataScalePlotted(d.y),
    ]),
    strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,
    strokeColor: strokeColor ?? defaultStrokeColor,
    strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
  }
}
