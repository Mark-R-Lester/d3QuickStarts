import { QsEnumCurve } from '../../core/enums/qsEnums'

export interface RadialLineConfigStrict {
  [key: string]: number | QsEnumCurve | undefined
  x: number
  y: number
  curve: QsEnumCurve
}
