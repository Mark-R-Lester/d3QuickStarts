import { Orientation } from '../../core/enums/enums'
import { QsColorScaleData } from '../../core/types/qsTypes'
import { QsBarData } from './qsTypes'

export interface CalculatedDataBarData {
  x: number
  y: number
  height: number
  width: number
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}

export interface DrawArgs {
  data: QsBarData[]
  orientation: Orientation
}

export interface BarConfig {
  [key: string]: number | string | QsColorScaleData | undefined
  padding: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
