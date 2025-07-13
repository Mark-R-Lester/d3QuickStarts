import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface RadialPointsConfig extends ConfigStrokeDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  useDataArea: boolean
  x: number
  y: number
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
