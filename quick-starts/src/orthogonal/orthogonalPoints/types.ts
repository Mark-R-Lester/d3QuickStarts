import { QsEnumScaleType } from '../../core/enums/qsEnums'
import { QsColorScaleData, QsCoordinate } from '../../core/types/qsTypes'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface PointsConfig extends ConfigStrokeDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  useDataArea: boolean
  scaleType: QsEnumScaleType
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}

export interface QsCalculatedDataOthogonalPoints {
  id: string
  radius: number
  pointData: QsCoordinate
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}
