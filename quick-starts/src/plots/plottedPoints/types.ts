import { QsEnumLayerType } from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface PlottedPointsConfig extends ConfigStrokeDefaults {
  [key: string]: number | string | undefined | boolean
  layerType: QsEnumLayerType
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
}

export interface QsCalculatedDataPlottedPoints {
  x: number
  y: number
  radius: number
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}
