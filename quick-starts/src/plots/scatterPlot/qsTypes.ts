import { Selection } from 'd3'

export interface QsScatterPlotConfig {
  [key: string]: string | undefined
}

export interface QsScatterPlot {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}
