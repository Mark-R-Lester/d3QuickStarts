import { ConfigStrokeDefaults } from '../../core/types/types'

export interface CalculatedData {
  id: string
  lineData: [number, number][]
  strokeWidth: number
}

export interface RadialSpokesConfig extends ConfigStrokeDefaults {
  [key: string]:
    | number
    | Iterable<unknown>
    | Iterable<string>
    | undefined
    | boolean
  useDataArea: boolean
  radius: number
  innerRadius: number
  x: number
  y: number
}
