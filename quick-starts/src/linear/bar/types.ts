import { Orientation } from '../../core/enums'
import { QsColorScale } from '../../d3QuickStart'

export interface QsBarConfigStrict {
  [key: string]: number | string | QsColorScale | undefined
  padding: number
  defaultColor: string
  colorScale?: QsColorScale
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
