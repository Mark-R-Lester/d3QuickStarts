import { CurveFactory } from 'd3'
import { Orientation, ScaleType } from '../../core/enums'

export interface DrawArgs {
  data: number[]
  orientation: Orientation
  scaleType: ScaleType
}

export interface LineConfigStrict {
  [key: string]: CurveFactory | undefined
  curve: CurveFactory
}
