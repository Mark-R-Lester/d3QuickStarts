import { QsColorScaleData } from '../../d3QuickStart'

export interface QsRadialPointData {
  value: number
  color?: string
}

export interface RadialPointsConfigStrict {
  [key: string]: number | QsColorScaleData | string | undefined
  x: number
  y: number
  pointRadius: number
  defaultColor: string
  colorScaleData?: QsColorScaleData
}
