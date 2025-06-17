import { QsTransitionArgs } from '../../core/types/qsTypes'
import { Selection } from 'd3'
import { BarGroupConfig } from './types'

export type QsBarGroupConfig = Partial<BarGroupConfig>

export interface QsBarGroupTransitionData {
  data: number[][]
  transitionArgs?: QsTransitionArgs
}

export interface QsBarGroups {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsBarGroupTransitionData) => void
}
