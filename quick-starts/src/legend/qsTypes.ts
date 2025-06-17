import { QsTransitionArgs } from '../d3QuickStart'
import { BaseType, Selection } from 'd3'
import { LegendConfig } from './types'

export type QsLegendConfig = Partial<LegendConfig>

export interface QsLegendData {
  value: string
  fillColor: string
}

export interface QsLegend {
  element: Selection<BaseType, unknown, SVGGElement, unknown>
  transition: (data: QsLegendData[], transisionArgs?: QsTransitionArgs) => void
}
