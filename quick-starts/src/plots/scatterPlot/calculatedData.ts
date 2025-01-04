import { Canvas, QsPlottedPointData } from '../../d3QuickStart'

export interface ScatterPlotConfigStrict {
  [key: string]: number | number | undefined
  defaultRadius: number
  defaultOpacity: number
}

export interface CalculatedData {
  x: number
  y: number
  radius: number
  opacity: number
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsPlottedPointData[],
  config: ScatterPlotConfigStrict
): CalculatedData[] => {
  const { xDataScalePlotted, yDataScalePlotted, genralPercentScale } =
    canvas.scales
  const { defaultRadius, defaultOpacity } = config

  const calculatedData: CalculatedData[] = data.map((d, i) => {
    return {
      x: xDataScalePlotted(d.x),
      y: yDataScalePlotted(d.y),
      radius: genralPercentScale(d.radius ? d.radius : defaultRadius),
      opacity: genralPercentScale(d.opacity ? d.opacity : defaultOpacity),
    }
  })

  return calculatedData
}
