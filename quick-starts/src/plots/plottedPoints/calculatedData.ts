import { Canvas } from '../../canvas/types'
import { QsPlottedPointsData } from './qsTypes'
import { QsCalculatedDataPlottedPoints, PlottedPointsConfig } from './types'

export const getCalculatedData = (
  canvas: Canvas,
  data: QsPlottedPointsData[],
  config: PlottedPointsConfig
): QsCalculatedDataPlottedPoints[] => {
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

  const calculatedData: QsCalculatedDataPlottedPoints[] = data.map((d, i) => {
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
