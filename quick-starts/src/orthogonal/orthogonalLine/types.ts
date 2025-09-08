import { Line } from 'd3'
import { Orientation } from '../../core/enums/enums'
import {
  QsEnumCurve,
  QsEnumLayerType,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsEnumScaleType,
} from '../../core/enums/qsEnums'

import { ConfigStrokeDefaults, StrokeData } from '../../core/types/types'

export interface LineConfig extends ConfigStrokeDefaults {
  [key: string]: QsEnumCurve | number | string | undefined | boolean
  layerType: QsEnumLayerType
  scaleType: QsEnumScaleType
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}

export interface QsCalculatedDataOrthogonalLine extends StrokeData {
  id: string
  lineData: [number, number][]
  lineFunction: Line<[number, number]>
}
