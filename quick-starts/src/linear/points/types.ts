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
  radius: number
  defaultColor: string
  colorScaleData?: QsColorScaleData
}
