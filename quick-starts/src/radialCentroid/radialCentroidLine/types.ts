import {
  QsEnumCurve,
  QsEnumLayerType,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface RadialLineConfig extends ConfigStrokeDefaults {
  [key: string]: number | QsEnumCurve | string | undefined | boolean
  layerType: QsEnumLayerType
  x: number
  y: number
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}

export interface QsCalculatedDataCentroidLine {
  id: string
  lineData: Iterable<[number, number]>
  x: number
  y: number
  strokeOpacity: number
  strokeColor: string
  strokeWidth: number
}
