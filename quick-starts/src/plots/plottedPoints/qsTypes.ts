import { Selection } from 'd3'
import { QsCoordinate } from '../../d3QuickStart'

export interface QsScatterPlotConfig {
  [key: string]: number | string | undefined
  defaultRadius?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
}

export interface QsPlottedPointData extends QsCoordinate {
  [key: string]: number | string | undefined
  radius?: number
  opacity?: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}

export interface QsScatterPlot {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}
