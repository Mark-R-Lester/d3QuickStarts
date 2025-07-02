import { Orientation } from '../../core/enums/enums'
import { QsEnumScaleType } from '../../core/enums/qsEnums'
import { QsColorScaleData } from '../../core/types/qsTypes'
import { QsPointData } from './qsTypes'

export interface DrawArgs {
  data: QsPointData[]
  orientation: Orientation
}

export interface PointsConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  scaleType: QsEnumScaleType
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
