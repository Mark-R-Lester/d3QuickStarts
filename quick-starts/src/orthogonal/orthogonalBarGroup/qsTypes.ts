import { QsTransitionArgs } from '../../core/types/qsTypes'
import { Selection } from 'd3'
import { BarGroupConfig } from './types'

export type QsBarGroupConfig = Partial<BarGroupConfig>

export interface QsBarGroupedData {
  value: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}

export interface QsBarGroupTransitionData {
  data: QsBarGroupedData[][]
  transitionArgs?: QsTransitionArgs
}

export interface QsBarGroups {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsBarGroupTransitionData) => void
}
