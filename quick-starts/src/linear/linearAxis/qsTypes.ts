import { BaseType, Selection } from 'd3'
import { AxisConfig } from './types'

export type QsAxisConfig = Partial<AxisConfig>

export interface QsAxis {
  element: Selection<BaseType, unknown, SVGGElement, unknown>
}
