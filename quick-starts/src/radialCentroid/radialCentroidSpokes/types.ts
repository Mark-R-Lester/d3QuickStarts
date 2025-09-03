import { ConfigStrokeDefaults, StrokeData } from '../../core/types/types'

export interface CalculatedData {
  id: string
  lineData: [number, number][]
  strokeWidth: number
  strokeOpacity: number
  strokeColor: string
}

export interface RadialSpokesConfig extends ConfigStrokeDefaults {
  [key: string]:
    | number
    | Iterable<unknown>
    | Iterable<string>
    | undefined
    | boolean
  useDataArea: boolean
  spokeConfig?: QsSpokeConfig[]
  numberOfSpokes: number
  outerRadius: number
  innerRadius: number
  x: number
  y: number
}

export interface QsSpokeConfig extends Partial<StrokeData> {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  lineNumber: number
  outerRadius?: number
  innerRadius?: number
}
