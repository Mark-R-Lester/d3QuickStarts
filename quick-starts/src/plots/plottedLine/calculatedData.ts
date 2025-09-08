import { Canvas } from '../../canvas/types'
import { QsPlottedLineData } from './qsTypes'
import { QsCalculatedDataPlottedLine, PlottedLineConfig } from './types'

export const getCalculatedData = (
  canvas: Canvas,
  data: QsPlottedLineData,
  config: PlottedLineConfig
): QsCalculatedDataPlottedLine => {
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
