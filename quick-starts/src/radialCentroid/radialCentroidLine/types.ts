import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface RadialLineConfig extends ConfigStrokeDefaults {
  [key: string]: number | QsEnumCurve | string | undefined | boolean
  useDataArea: boolean
  x: number
  y: number
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
