import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface AreaData {
  angle: number
  inner: number
  outer: number
}

export interface CalculatedData {
  id: string
  areaData: AreaData[]
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
  x: number
  y: number
}

export interface RadialAreaConfig extends ConfigStrokeDefaults {
  [key: string]: QsEnumCurve | number | undefined | string
  curve: QsEnumCurve
  x: number
  y: number
  defaultFillColor: string
  defaultFillOpacity: number
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
