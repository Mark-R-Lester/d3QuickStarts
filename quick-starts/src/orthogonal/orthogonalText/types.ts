import { QsEnumScaleType } from '../../core/enums/qsEnums'
import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigTextDefaults } from '../../core/types/types'

export interface TextConfig extends ConfigTextDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  useDataArea: boolean
  scaleType: QsEnumScaleType
  defaultDecimalPoints: number
}
