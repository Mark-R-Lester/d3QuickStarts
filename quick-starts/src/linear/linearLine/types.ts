import { Line } from 'd3'
import { Orientation, ScaleType } from '../../core/enums/enums'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'

import { QsLineData } from './qsTypes'

export interface DrawArgs {
  data: QsLineData
  scaleType: ScaleType
  orientation: Orientation
}

export interface LineConfigStrict {
  [key: string]: QsEnumCurve | number | string | undefined
  curve: QsEnumCurve
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}

export interface CalculatedData {
  class: string
  id: string
  lineData: [number, number][]
  lineFunction: Line<[number, number]>
  strokeOpacity: number
  strokeColor: string
  strokeWidth: number
}
