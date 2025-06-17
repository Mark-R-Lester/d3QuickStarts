import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { BarStackedConfigStrict } from './types'

export type QsBarStackedConfig = Partial<BarStackedConfigStrict>

export interface QsBarStackedTransitionData {
  data: number[][]
  transitionArgs?: QsTransitionArgs
}

export interface QsBarStack {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsBarStackedTransitionData) => void
}
