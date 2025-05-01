import { Line } from 'd3'
import { Orientation } from '../../core/enums/enums'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsEnumScaleType,
} from '../../core/enums/qsEnums'

import { QsLineData } from './qsTypes'

export interface DrawArgs {
  data: QsLineData
  orientation: Orientation
}

export interface LineConfigStrict {
  [key: string]: QsEnumCurve | number | string | undefined
  scaleType: QsEnumScaleType
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
