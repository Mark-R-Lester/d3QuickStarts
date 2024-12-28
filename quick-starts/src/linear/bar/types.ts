import { Orientation } from '../../core/enums/enums'
import { QsColorScaleData } from '../../d3QuickStart'

export interface QsBarConfigStrict {
  [key: string]: number | string | QsColorScaleData | undefined
  padding: number
  defaultColor: string
  colorScaleData?: QsColorScaleData
}

export interface MetaBarData {
  x: number
  y: number
  height: number
  width: number
  color: string
}

export interface QsBarData {
  lowerBoundry?: number
  upperBoundry: number
  color?: string
}

export interface DrawArgs {
  data: QsBarData[]
  orientation: Orientation
}
