import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { RadialPointsConfig } from './types'

export type QsRadialPointsConfig = Partial<RadialPointsConfig>

export interface QsRadialPointsTransitionData {
  data: QsRadialPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialPointsTransitionData) => void
}

export interface QsRadialPointData {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}
