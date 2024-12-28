import { CurveFactory } from 'd3'
import { Orientation, ScaleType } from '../../core/enums/enums'
import { QsEnumCurve } from '../../core/enums/qsEnums'

export interface DrawArgs {
  data: number[]
  orientation: Orientation
  scaleType: ScaleType
}

export interface LineConfigStrict {
  [key: string]: QsEnumCurve | undefined
  curve: QsEnumCurve
}
