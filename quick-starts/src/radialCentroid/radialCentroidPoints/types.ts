import { QsEnumLayerType } from '../../core/enums/qsEnums'
import { QsColorScaleData, QsCoordinate } from '../../core/types/qsTypes'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface CentroidPointsConfig extends ConfigStrokeDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  layerType: QsEnumLayerType
  x: number
  y: number
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}

export interface QsCalculatedDataCentroidPoints {
  id: string
  coordinate: QsCoordinate
  x: number
  y: number
  radius: number
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}
