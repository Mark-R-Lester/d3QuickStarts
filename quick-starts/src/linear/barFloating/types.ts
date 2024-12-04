export interface QsBarFloatingConfigStrict {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding: number
  colorDomain: number[]
  colorRange: Iterable<unknown>
}

export interface BarData {
  x: number
  y: number
  height: number
  width: number
  color: string
}
