import { QsEnumLayerType } from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults, StrokeData } from '../../core/types/types'

export interface CentroidSpokesConfig extends ConfigStrokeDefaults {
  [key: string]:
    | number
    | Iterable<unknown>
    | Iterable<string>
    | undefined
    | boolean
  layerType: QsEnumLayerType
  spokeConfig?: QsSpokeConfig[]
  numberOfSpokes: number
  defaultOuterRadius: number
  defaultInnerRadius: number
  x: number
  y: number
}

export interface QsSpokeConfig extends Partial<StrokeData> {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  spokeNumber: number
  outerRadius?: number
  innerRadius?: number
}

export interface QsCalculatedDataCentroidSpokes {
  id: string
  lineData: [number, number][]
  strokeWidth: number
  strokeOpacity: number
  strokeColor: string
}
