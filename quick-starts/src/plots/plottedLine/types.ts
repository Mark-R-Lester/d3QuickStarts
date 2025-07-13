import {
  QsEnumCurve,
  QsEnumLineJoin,
  QsEnumLineCap,
} from '../../core/enums/qsEnums'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface PlottedLineConfig extends ConfigStrokeDefaults {
  [key: string]: QsEnumCurve | number | string | undefined | boolean
  useDataArea: boolean
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
}
