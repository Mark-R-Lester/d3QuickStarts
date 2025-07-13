import { Line } from 'd3'
import { Orientation } from '../../core/enums/enums'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsEnumScaleType,
} from '../../core/enums/qsEnums'

import { QsLineData } from './qsTypes'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface DrawArgs {
  data: QsLineData
  orientation: Orientation
}

export interface LineConfig extends ConfigStrokeDefaults {
  [key: string]: QsEnumCurve | number | string | undefined | boolean
  useDataArea: boolean
  scaleType: QsEnumScaleType
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}

export interface CalculatedData {
  id: string
  lineData: [number, number][]
  lineFunction: Line<[number, number]>
  strokeOpacity: number
  strokeColor: string
  strokeWidth: number
}
