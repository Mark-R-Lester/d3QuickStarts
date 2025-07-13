export interface BarGroupConfig {
  [key: string]: number | Iterable<String> | undefined | boolean
  useDataArea: boolean
  padding: number
  colorRange: Iterable<String>
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}

export interface BarData {
  id: string
  x: number
  y: number
  height: number
  width: number
  fillColor: string
}
