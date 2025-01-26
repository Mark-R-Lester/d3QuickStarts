import { GlobalDefaultSettings } from '../../core/enums/enums'
import { Canvas } from '../../d3QuickStart'
import { QsPlottedLineData } from './qsTypes'
import { LinePlotConfigStrict } from './types'

export interface CalculatedData {
  coordinates: [number, number][]
  strokeOpacity: number
  strokeColor: string
  strokeWidth: number
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsPlottedLineData,
  config: LinePlotConfigStrict
): CalculatedData => {
  const { xDataScalePlotted, yDataScalePlotted, genralPercentScale } =
    canvas.scales
  const { coordinates, strokeOpacity, strokeColor, strokeWidth } = data
  const { defaultStrokeColor } = config

  return {
    coordinates: coordinates.map((d) => [
      xDataScalePlotted(d.x),
      yDataScalePlotted(d.y),
    ]),
    strokeOpacity:
      strokeOpacity === undefined
        ? GlobalDefaultSettings.FILL_OPACITY
        : strokeOpacity,
    strokeColor: strokeColor === undefined ? defaultStrokeColor : strokeColor,
    strokeWidth: genralPercentScale(
      strokeWidth === undefined
        ? GlobalDefaultSettings.LINE_STROKE_WIDTH
        : strokeWidth
    ),
  }
}
