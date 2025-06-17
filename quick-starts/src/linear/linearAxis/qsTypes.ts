import { BaseType, Selection } from 'd3'
import { AxisConfigStrict } from './types'

export type QsAxisConfig = Partial<AxisConfigStrict>

export interface QsAxis {
  element: Selection<BaseType, unknown, SVGGElement, unknown>
}
