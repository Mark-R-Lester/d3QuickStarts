import { Canvas } from '../../canvas/canvas'
import { QsPlottedLineData, QsPlottedLineTransitionData } from './qsTypes'
import { PlottedLineConfig } from './types'

export interface CalculatedData {
  class: string
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
    class: 'line',
    coordinates: coordinates.map((d) => [
      xDataScalePlotted(d.x),
      yDataScalePlotted(d.y),
    ]),
    strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,
    strokeColor: strokeColor ?? defaultStrokeColor,
    strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
  }
}
