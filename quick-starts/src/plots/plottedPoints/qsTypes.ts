import { Selection } from 'd3'
import { PlottedPointsConfig } from './calculatedData'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'

export type QsPlottedPointsConfig = Partial<PlottedPointsConfig>

export interface QsPlottedPointsData extends QsCoordinate, Partial<StrokeData> {
  [key: string]: number | string | undefined
  radius?: number
  opacity?: number
  fillColor?: string
  fillOpacity?: number
}

export interface QsPlottedPointsTransitionData {
  data: QsPlottedPointsData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPlottedPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsPlottedPointsTransitionData) => void
}
