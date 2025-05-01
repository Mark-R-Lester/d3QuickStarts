import { Orientation } from '../../core/enums/enums'
import { QsColorScaleData, QsScaleType } from '../../d3QuickStart'
import { QsPointData } from './qsTypes'

export interface DrawArgs {
  data: QsPointData[]
  orientation: Orientation
}

export interface PointsConfigStrict {
  [key: string]: number | QsColorScaleData | string | undefined
  scaleType: QsScaleType
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
