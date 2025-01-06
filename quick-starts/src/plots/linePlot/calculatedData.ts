import {
  GlobalDefaultNumbers,
  GlobalDefaultStrings,
} from '../../core/enums/enums'
import { Canvas } from '../../d3QuickStart'
import { QsPlottedLineData } from './qsTypes'

export interface CalculatedData {
  coordinates: [number, number][]
  opacity: number
  strokeColor: string
  strokeWidth: number
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsPlottedLineData
): CalculatedData => {
  const { xDataScalePlotted, yDataScalePlotted, genralPercentScale } =
    canvas.scales
  const { coordinates, opacity, strokeColor, strokeWidth } = data

  return {
    coordinates: coordinates.map((d) => [
      xDataScalePlotted(d.x),
      yDataScalePlotted(d.y),
    ]),
    opacity: opacity === undefined ? GlobalDefaultNumbers.OPACITY : opacity,
    strokeColor:
      strokeColor === undefined ? GlobalDefaultStrings.LINE_COLOR : strokeColor,
    strokeWidth: genralPercentScale(
      strokeWidth === undefined
        ? GlobalDefaultNumbers.STROKE_WIDTH
        : strokeWidth
    ),
  }
}
