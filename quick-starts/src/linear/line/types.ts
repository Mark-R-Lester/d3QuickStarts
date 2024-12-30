import { Orientation, ScaleType } from '../../core/enums/enums'
import { QsEnumCurve } from '../../core/enums/qsEnums'

export interface DrawArgs {
  data: QsLineData
  orientation: Orientation
  scaleType: ScaleType
}

export interface LineConfigStrict {
  [key: string]: QsEnumCurve | undefined
  curve: QsEnumCurve
}

export interface QsLineData {
  [key: string]: number[] | string | undefined
  data: number[]
  color?: string
}
