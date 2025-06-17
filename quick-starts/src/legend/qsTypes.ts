import { QsTransitionArgs } from '../d3QuickStart'
import { BaseType, Selection } from 'd3'
import { LegendConfigStrict } from './types'

export type QsLegendConfig = Partial<LegendConfigStrict>

export interface QsLegendData {
  value: string
  fillColor: string
}

export interface QsLegend {
  element: Selection<BaseType, unknown, SVGGElement, unknown>
  transition: (data: QsLegendData[], transisionArgs?: QsTransitionArgs) => void
}
