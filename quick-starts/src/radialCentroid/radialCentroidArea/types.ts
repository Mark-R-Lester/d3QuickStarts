import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'

export interface AreaData {
  angle: number
  inner: number
  outer: number
}

export interface CalculatedData {
  class: string
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

export interface RadialAreaConfig {
  [key: string]: QsEnumCurve | number | undefined | string
  curve: QsEnumCurve
  x: number
  y: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
