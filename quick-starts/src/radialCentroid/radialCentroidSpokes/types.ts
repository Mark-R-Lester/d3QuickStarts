export interface CalculatedData {
  id: string
  lineData: [number, number][]
  strokeWidth: number
}

export interface RadialSpokesConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  innerRadius: number
  x: number
  y: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}
