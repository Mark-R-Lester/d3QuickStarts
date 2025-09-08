import { BaseType, Selection } from 'd3'
import { LegendConfig } from './types'
import { TextData } from '../../core/types/types'

export type QsLegendConfig = Partial<LegendConfig>

export interface QsLegendData extends Partial<TextData> {
  value: string
  fillColor: string
}

export interface QsLegend {
  elementShape: Selection<BaseType, unknown, SVGGElement, unknown>
  elementText: Selection<BaseType, unknown, SVGGElement, unknown>
}
