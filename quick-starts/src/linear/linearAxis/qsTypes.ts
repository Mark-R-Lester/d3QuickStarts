import { BaseType, Selection } from 'd3'
import { AxisConfig } from './types'
import { CanvasConfig } from '../../canvas/types'

export type QsAxisConfig = Partial<AxisConfig>

export interface QsAxis {
  elementDomain: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  elementTicks: Selection<BaseType, unknown, SVGGElement, unknown>
  elementText: Selection<BaseType, unknown, SVGGElement, unknown>
}
