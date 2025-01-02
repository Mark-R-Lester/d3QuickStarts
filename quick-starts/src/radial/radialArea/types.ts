import { QsEnumCurve } from '../../core/enums/qsEnums'

export interface RadialAreaMetaData {
  angle: number
  inner: number
  outer: number
}

export interface RadialAreaConfigStrict {
  [key: string]: QsEnumCurve | number | undefined | string
  curve: QsEnumCurve
  x: number
  y: number
}
