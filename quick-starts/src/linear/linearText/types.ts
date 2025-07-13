import { Orientation } from '../../core/enums/enums'
import { QsEnumScaleType } from '../../core/enums/qsEnums'
import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigTextDefaults } from '../../core/types/types'
import { QsTextData } from './qsTypes'

export interface DrawArgs {
  data: QsTextData[]
  orientation: Orientation
}

export interface TextConfig extends ConfigTextDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  useDataArea: boolean
  scaleType: QsEnumScaleType
  defaultDecimalPoints: number
}
