import { ConfigStrokeDefaults } from '../../core/types/types'

export interface BarGroupConfig extends ConfigStrokeDefaults {
  [key: string]: number | Iterable<String> | undefined | boolean
  useDataArea: boolean
  padding: number
  colorRange: Iterable<String>
  defaultFillOpacity: number
}

export interface CalculatedData {
  groupId: string
  barData: BarData[]
}

export interface BarData {
  id: string
  x: number
  y: number
  height: number
  width: number
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}
