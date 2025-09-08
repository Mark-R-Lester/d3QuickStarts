import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults, StrokeData } from '../../core/types/types'

export interface AreaData {
  angle: number
  inner: number
  outer: number
}

export interface QsCalculatedDataCentroidArea extends StrokeData {
  id: string
  areaData: AreaData[]
  fillColor: string
  fillOpacity: number
  x: number
  y: number
}

export interface RadialAreaConfig extends ConfigStrokeDefaults {
  [key: string]: QsEnumCurve | number | undefined | string | boolean
  useDataArea: boolean
  curve: QsEnumCurve
  x: number
  y: number
  defaultFillColor: string
  defaultFillOpacity: number
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
