import { Selection } from 'd3'
import { RadialSpokesConfig } from './types'
export { QsSpokeConfig } from './types'

export interface QsRadialSpokesConfig extends Partial<RadialSpokesConfig> {
  numberOfSpokes: number
}

export interface QsRadialSpokes {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number) => void
}
