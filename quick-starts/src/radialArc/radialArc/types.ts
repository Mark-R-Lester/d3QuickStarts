import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigStrokeDefaults } from '../../core/types/types'

export interface RadialArcConfig extends ConfigStrokeDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  useDataArea: boolean
  outerRadius: number
  innerRadius: number
  padding: number
  cornerRadius: number
  x: number
  y: number
  defaultFillColor: string
  defaultFillOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}
