import { Canvas, QsPlottedPointData } from '../../d3QuickStart'

export interface ScatterPlotConfigStrict {
  [key: string]: number | string | undefined
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
}

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
  data: QsPlottedPointData[],
  config: ScatterPlotConfigStrict
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
      radius: genralPercentScale(d.radius ? d.radius : defaultRadius),
      fillColor: d.fillColor !== undefined ? d.fillColor : defaultFillColor,
      strokeColor:
        d.strokeColor !== undefined ? d.strokeColor : defaultStrokeColor,
      fillOpacity:
        d.fillOpacity !== undefined ? d.fillOpacity : defaultFillOpacity,
      strokeWidth: genralPercentScale(
        d.strokeWidth !== undefined ? d.strokeWidth : defaultStrokeWidth
      ),
      strokeOpacity:
        d.strokeOpacity !== undefined ? d.strokeOpacity : defaultStrokeOpacity,
    }
  })

  return calculatedData
}
