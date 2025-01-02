import { Selection } from 'd3'

export interface QsRadialSpokesConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
  innerRadius?: number
  x?: number
  y?: number
  color?: string
  strokeWidth?: number
}

export interface QsRadialSpokes {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number) => void
}

export interface QsRadialSpokesTransitionArgs {
  x: number
  y: number
  radius: number
  innerRadius: number
}
