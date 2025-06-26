import { BaseType, Selection } from 'd3'
import { LegendConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'

export type QsLegendConfig = Partial<LegendConfig>

export interface QsLegendData {
  value: string
  fillColor: string
}

export interface QsLegend {
  elementShape: Selection<BaseType, unknown, SVGGElement, unknown>
  elementText: Selection<BaseType, unknown, SVGGElement, unknown>
  transition: (data: QsLegendData[], transisionArgs?: QsTransitionArgs) => void
}
