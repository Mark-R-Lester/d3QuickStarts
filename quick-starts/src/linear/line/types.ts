import { CurveFactory } from 'd3'

export interface DrawArgs {
  data: number[]
  vertical: boolean
  banded: boolean
}

export interface LineConfigStrict {
  [key: string]: CurveFactory | undefined
  curve: CurveFactory
}
