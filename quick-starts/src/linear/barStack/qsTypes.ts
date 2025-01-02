import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsBarStackedConfig {
  [key: string]: number | Iterable<String> | undefined
  padding?: number
  colorRange?: Iterable<String>
}

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
