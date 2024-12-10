export interface BarStackedConfigStrict {
  [key: string]: number | Iterable<String> | undefined
  padding: number
  colorRange: Iterable<String>
}

export interface BarData {
  id: string
  class: string
  x: number
  y: number
  height: number
  width: number
  color: string
}
