import { QsColorScaleData } from '../../d3QuickStart'

export interface RadialPointsConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  x: number
  y: number
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
