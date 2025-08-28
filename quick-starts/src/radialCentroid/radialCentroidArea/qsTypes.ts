import { Selection } from 'd3'
import { RadialAreaConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'

export type QsRadialAreaConfig = Partial<RadialAreaConfig>

export interface QsRadialAreaTransitionData {
  data: QsRadialAreaData
  config?: QsRadialAreaConfig
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialArea {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialAreaTransitionData) => void
}

export interface QsRadialAreaData {
  [key: string]: number[] | string | number | undefined
  highValues: number[]
  lowValues?: number[]
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}
