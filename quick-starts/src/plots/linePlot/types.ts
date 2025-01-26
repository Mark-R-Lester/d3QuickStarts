import {
  QsEnumCurve,
  QsEnumLineJoin,
  QsEnumLineCap,
} from '../../core/enums/qsEnums'

export interface LinePlotConfigStrict {
  [key: string]: QsEnumCurve | number | string | undefined
  curve: QsEnumCurve
  defaultStrokeColor: string
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
