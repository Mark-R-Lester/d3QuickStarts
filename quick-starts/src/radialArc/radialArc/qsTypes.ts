import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { RadialArcConfig } from './types'

export type QsRadialArcConfig = Partial<RadialArcConfig>

export interface QsRadialTransitionData {
  data: QsRadialData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadial {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialTransitionData) => void
}

export interface QsRadialData {
  value: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}
