import { Orientation } from '../../core/enums'
import { QsColorName, QsColorDomainRange } from '../../d3QuickStart'

export interface QsBarConfigStrict {
  [key: string]: number | QsColorName | QsColorDomainRange | undefined
  padding: number
  color: QsColorName | QsColorDomainRange
}

export interface BarData {
  x: number
  y: number
  height: number
  width: number
  color: string
}

export interface QsBarArgs {
  lowerBoundry?: number
  upperBoundry: number
  color?: string
}

export interface DrawArgs {
  data: QsBarArgs[]
  orientation: Orientation
}
