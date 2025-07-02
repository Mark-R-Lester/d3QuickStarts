import { QsColorScaleData } from '../../core/types/qsTypes'

export interface RadialArcConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  outerRadius: number
  innerRadius: number
  padding: number
  cornerRadius: number
  x: number
  y: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
