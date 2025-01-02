import { QsTransitionArgs } from '../../core/types/qsTypes'
import { Selection } from 'd3'

export interface QsBarGroupConfig {
  [key: string]: number | Iterable<String> | undefined
  padding?: number
  colorRange?: Iterable<String>
}

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
