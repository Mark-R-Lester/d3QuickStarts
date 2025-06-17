import { Selection } from 'd3'
import { RadialAxisConfigStrict } from './types'

export type QsRadialAxisConfig = Partial<RadialAxisConfigStrict>

export interface QsRadialAxis {
  textElement:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  ringsElement:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[], config: QsRadialAxisConfig) => void
}
