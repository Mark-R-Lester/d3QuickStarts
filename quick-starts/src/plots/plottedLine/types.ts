import {
  QsEnumCurve,
  QsEnumLineJoin,
  QsEnumLineCap,
  QsEnumLayerType,
} from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface PlottedLineConfig extends ConfigStrokeDefaults {
  [key: string]: QsEnumCurve | number | string | undefined | boolean
  layerType: QsEnumLayerType
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}

export interface QsCalculatedDataPlottedLine {
  coordinates: [number, number][]
  strokeOpacity: number
  strokeColor: string
  strokeWidth: number
}
