import { Selection } from 'd3'
import { PlottedPointsConfig } from './calculatedData'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'

export type QsPlottedPointsConfig = Partial<PlottedPointsConfig>

export interface QsPlottedPointsData extends QsCoordinate {
  [key: string]: number | string | undefined
  radius?: number
  opacity?: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
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
