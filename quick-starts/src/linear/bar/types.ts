export interface BarData {
  x: number
  y: number
  height: number
  width: number
  color: string
}

export interface Meta {
  class: string
  id: string
  barData: BarData
}

export interface QsBarConfigStrict {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding: number
  colorDomain: number[]
  colorRange: Iterable<unknown>
}
