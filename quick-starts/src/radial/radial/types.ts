import { QsColorName, QsColorScaleData } from '../../core/types/qsTypes'

export interface RadialConfigStrict {
  [key: string]: number | QsColorScaleData | string | undefined
  outerRadius: number
  innerRadius: number
  padAngle: number
  cornerRadius: number
  x: number
  y: number
  defaultColor?: string
  colorScaleData?: QsColorScaleData
}
