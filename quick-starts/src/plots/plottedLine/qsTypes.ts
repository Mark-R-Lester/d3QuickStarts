import { Selection } from 'd3'
import { QsCoordinate } from '../../d3QuickStart'
import { PlottedLineConfigStrict } from './types'

export type QsPlottedLineConfig = Partial<PlottedLineConfigStrict>

export interface QsPlottedLineData {
  [key: string]: number | string | QsCoordinate[] | undefined
  coordinates: QsCoordinate[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}

export interface QsLinePlot {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}
