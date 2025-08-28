import { Selection } from 'd3'
import { RadialAxisConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'

export type QsRadialAxisConfig = Partial<RadialAxisConfig>

export interface QsRadialCentroidAxisTransitionData {
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialAxis {
  textElement:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  ringsElement:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialCentroidAxisTransitionData) => void
}
