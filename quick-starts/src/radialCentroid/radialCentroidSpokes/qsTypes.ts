import { Selection } from 'd3'
import { RadialSpokesConfig } from './types'

export type QsRadialSpokesConfig = Partial<RadialSpokesConfig>

export interface QsRadialSpokes {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number) => void
}
