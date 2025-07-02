import { QsColorScaleData } from '../../core/types/qsTypes'

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
