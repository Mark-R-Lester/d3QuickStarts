import { Orientation } from '../../core/enums/enums'
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
