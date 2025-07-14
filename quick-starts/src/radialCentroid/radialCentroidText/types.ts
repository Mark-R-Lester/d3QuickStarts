import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigTextDefaults } from '../../core/types/types'

export interface RadialTextConfig extends ConfigTextDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  useDataArea: boolean
  x: number
  y: number
  defaultDecimalPoints: number
}
