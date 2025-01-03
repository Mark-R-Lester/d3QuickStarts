import { Orientation } from '../../core/enums/enums'
import { QsBarData } from './qsTypes'

export interface CalculatedDataBarData {
  x: number
  y: number
  height: number
  width: number
  color: string
}

export interface DrawArgs {
  data: QsBarData[]
  orientation: Orientation
}
