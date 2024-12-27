import { QsColorName, QsColorScale } from '../../core/types/qsTypes'

export interface QsRadialData {
  value: number
  color?: string
}

export interface RadialConfigStrict {
  [key: string]: number | QsColorScale | string | undefined
  outerRadius: number
  innerRadius: number
  padAngle: number
  cornerRadius: number
  x: number
  y: number
  defaultColor?: string
  colorScale?: QsColorScale
}
