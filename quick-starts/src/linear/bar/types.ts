import { Orientation } from '../../core/enums'
import { QsColorName, QsColorScale } from '../../d3QuickStart'

export interface QsBarConfigStrict {
  [key: string]: number | QsColorName | QsColorScale | undefined
  padding: number
  color: QsColorName | QsColorScale
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
