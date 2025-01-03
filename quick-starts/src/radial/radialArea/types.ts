import { QsEnumCurve } from '../../core/enums/qsEnums'

export interface RadialAreaCalculatedDataData {
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
