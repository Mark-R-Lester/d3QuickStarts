import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'

export interface RadialLineConfigStrict {
  [key: string]: number | QsEnumCurve | string | undefined
  x: number
  y: number
  defaultStrokeColor: string
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
