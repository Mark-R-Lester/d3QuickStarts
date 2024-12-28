import { Orientation, ScaleType } from '../../core/enums/enums'
import { QsColorScaleData } from '../../d3QuickStart'
export interface DrawArgs {
  data: QsPointData[]
  orientation: Orientation
  scaleType: ScaleType
}

export interface QsPointData {
  value: number
  color?: string
}

export interface PointsConfigStrict {
  [key: string]: number | QsColorScaleData | string | undefined
  radius: number
  defaultColor: string
  colorScaleData?: QsColorScaleData
}
