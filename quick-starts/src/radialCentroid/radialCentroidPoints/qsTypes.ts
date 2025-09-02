import { Selection } from 'd3'
import { RadialPointsConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'

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

export interface QsRadialPointData extends Partial<StrokeData> {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
}
