import { CurveFactory } from 'd3'
import {
  QsEnumCurve,
  QsEnumLineJoin,
  QsEnumLineCap,
} from '../../core/enums/qsEnums'

export interface AreaData {
  x: number
  y0: number
  y1: number
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
}

export interface AreaConfigStrict {
  [key: string]: CurveFactory | string | number | undefined
  curve: QsEnumCurve
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
