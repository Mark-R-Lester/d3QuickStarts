import { Selection } from 'd3'
import { RadialSpokesConfigStrict } from './types'

export type QsRadialSpokesConfig = Partial<RadialSpokesConfigStrict>

export interface QsRadialSpokes {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number) => void
}
