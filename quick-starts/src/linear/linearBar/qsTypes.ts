import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { BarConfig } from './types'

export interface QsBarData {
  lowerBoundry?: number
  upperBoundry: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}

export type QsBarConfig = Partial<BarConfig>

export interface QsBarTransitionArgs extends QsTransitionArgs {}

export interface QsBarTransitionData {
  data: QsBarData[]
  transitionArgs?: QsBarTransitionArgs
}

export interface QsBars {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsBarTransitionData) => void
}
