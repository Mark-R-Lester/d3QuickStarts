import { Selection } from 'd3'
import { QsCoordinate } from '../../d3QuickStart'

export interface QsScatterPlotConfig {
  [key: string]: number | undefined
  defaultRadius?: number
  defaultOpacity?: number
}

export interface QsPlottedPointData extends QsCoordinate {
  [key: string]: number | string | undefined
  radius?: number
  opacity?: number
  fillColor?: string
  fillOpacity?: string
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: string
}

export interface QsScatterPlot {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}
