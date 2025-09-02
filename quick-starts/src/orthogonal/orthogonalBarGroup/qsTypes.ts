import { QsTransitionArgs } from '../../core/types/qsTypes'
import { Selection } from 'd3'
import { BarGroupConfig } from './types'
import { StrokeData } from '../../core/types/types'

export type QsBarGroupConfig = Partial<BarGroupConfig>

export interface QsBarGroupedData extends Partial<StrokeData> {
  value: number
  fillColor?: string
  fillOpacity?: number
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
