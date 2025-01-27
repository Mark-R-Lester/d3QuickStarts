import { CurveFactory } from 'd3'
import {
  QsEnumCurve,
  QsEnumLineJoin,
  QsEnumLineCap,
} from '../../core/enums/qsEnums'

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
