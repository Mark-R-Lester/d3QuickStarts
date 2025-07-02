import { Selection } from 'd3'
import { PlottedLineConfig } from './types'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'

export type QsPlottedLineConfig = Partial<PlottedLineConfig>

export interface QsPlottedLineData {
  [key: string]: number | string | QsCoordinate[] | undefined
  coordinates: QsCoordinate[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}

export interface QsPlottedLineTransitionData {
  data: QsPlottedLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsLinePlot {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsPlottedLineTransitionData) => void
}
