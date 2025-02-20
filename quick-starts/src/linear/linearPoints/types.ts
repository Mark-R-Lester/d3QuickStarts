import { Orientation, ScaleType } from '../../core/enums/enums'
import { QsColorScaleData } from '../../d3QuickStart'
import { QsPointData } from './qsTypes'

export interface DrawArgs {
  data: QsPointData[]
  orientation: Orientation
  scaleType: ScaleType
}

export interface PointsConfigStrict {
  [key: string]: number | QsColorScaleData | string | undefined
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
