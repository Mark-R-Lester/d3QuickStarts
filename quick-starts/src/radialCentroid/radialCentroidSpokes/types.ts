export interface CalculatedData {
  class: string
  id: string
  lineData: [number, number][]
  strokeWidth: number
}

export interface RadialSpokesConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  innerRadius: number
  x: number
  y: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}
