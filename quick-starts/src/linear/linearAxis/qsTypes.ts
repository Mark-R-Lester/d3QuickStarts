import { BaseType, Selection } from 'd3'
import { AxisConfig } from './types'

export type QsAxisConfig = Partial<AxisConfig>

export interface QsAxis {
  elementDomain: Selection<BaseType, unknown, HTMLElement, any>
  elementTicks: Selection<BaseType, unknown, SVGGElement, unknown>
  elementText: Selection<BaseType, unknown, SVGGElement, unknown>
}
