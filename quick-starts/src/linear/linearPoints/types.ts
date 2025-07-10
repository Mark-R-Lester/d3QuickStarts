import { Orientation } from '../../core/enums/enums'
import { QsEnumScaleType } from '../../core/enums/qsEnums'
import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigStrokeDefaults } from '../../core/types/types'
import { QsPointData } from './qsTypes'

export interface DrawArgs {
  data: QsPointData[]
  orientation: Orientation
}

export interface PointsConfig extends ConfigStrokeDefaults {
  [key: string]: number | QsColorScaleData | string | undefined
  scaleType: QsEnumScaleType
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
