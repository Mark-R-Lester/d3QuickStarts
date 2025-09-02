import { Selection } from 'd3'
import { PlottedLineConfig } from './types'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'
import { CanvasConfig } from '../../canvas/types'
import { StrokeData } from '../../core/types/types'

export type QsPlottedLineConfig = Partial<PlottedLineConfig>

export interface QsPlottedLineData extends Partial<StrokeData> {
  [key: string]: number | string | QsCoordinate[] | undefined
  coordinates: QsCoordinate[]
}

export interface QsPlottedLineTransitionData {
  data: QsPlottedLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsLinePlot {
  element:
    | Selection<SVGGElement, CanvasConfig, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsPlottedLineTransitionData) => void
}
