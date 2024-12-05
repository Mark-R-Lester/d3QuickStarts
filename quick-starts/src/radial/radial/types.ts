import { ColorName, DomainName } from '../../core/types'

export interface TweenedArcData {
  data: number
  cornerRadius: number
  outerRadius: number
  innerRadius: number
  startAngle: number
  endAngle: number
}

export interface ArcData extends TweenedArcData {
  color: string
  index?: number
  value?: number
}

export interface QsRadialArgs {
  value: number
  color?: ColorName | DomainName
}
