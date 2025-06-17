import { Selection } from 'd3'
import { RadialAxisConfigStrict } from './types'
import { QsTransitionArgs } from '../../d3QuickStart'

export type QsRadialAxisConfig = Partial<RadialAxisConfigStrict>

export interface QsRadialCentroidAxisTransitionData {
  data: number[]
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
