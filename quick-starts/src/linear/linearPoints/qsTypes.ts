import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { PointsConfigStrict } from './types'

export interface QsPointData {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}

export type QsPointsConfig = Partial<PointsConfigStrict>

export interface QsPointsTransitionData {
  data: QsPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsPointsTransitionData) => void
}
