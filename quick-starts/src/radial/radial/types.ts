import { QsColorName, QsDomainName } from '../../core/types/qsTypes'

export interface ArcData {
  data: number
  cornerRadius: number
  outerRadius: number
  innerRadius: number
  startAngle: number
  endAngle: number
  color: string
  index?: number
  value?: number
}

export interface QsRadialArgs {
  value: number
  color?: QsColorName | QsDomainName
}

export interface RadialConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  outerRadius: number
  innerRadius: number
  padAngle: number
  cornerRadius: number
  x: number
  y: number
  colorDomain: string[] | number[]
  colorRange: Iterable<unknown>
}
