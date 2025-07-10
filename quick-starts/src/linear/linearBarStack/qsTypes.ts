import { Selection } from 'd3'
import { BarStackedConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'

export type QsBarStackedConfig = Partial<BarStackedConfig>

export interface QsBarStackedData {
  data: number[][]
}

export interface QsBarStackedTransitionData {
  data: QsBarStackedData
  transitionArgs?: QsTransitionArgs
}

export interface QsBarStack {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsBarStackedTransitionData) => void
}
