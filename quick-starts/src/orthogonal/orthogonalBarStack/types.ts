import { QsEnumLayerType } from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults, StrokeData } from '../../core/types/types'

export interface BarStackedConfig extends ConfigStrokeDefaults {
  [key: string]: number | Iterable<String> | undefined | boolean
  layerType: QsEnumLayerType
  padding: number
  colorRange: Iterable<String>
  defaultFillOpacity: number
}

export interface QsalculatedDataOrthogonalBarStacks {
  groupId: string
  barData: BarData[]
}

export interface BarData extends StrokeData {
  id: string
  x: number
  y: number
  height: number
  width: number
  fillColor: string
  fillOpacity: number
}
