import { CurveFactory } from 'd3'
import {
  QsEnumCurve,
  QsEnumLineJoin,
  QsEnumLineCap,
} from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface AreaData {
  x: number
  y0: number
  y1: number
}

export interface CalculatedData {
  id: string
  areaData: AreaData[]
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}

export interface AreaConfig extends ConfigStrokeDefaults {
  [key: string]: CurveFactory | string | number | undefined
  curve: QsEnumCurve
  defaultFillColor: string
  defaultFillOpacity: number
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
