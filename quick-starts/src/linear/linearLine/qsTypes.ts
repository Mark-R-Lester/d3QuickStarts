import { Selection } from 'd3'
import { LineConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { CanvasConfig } from '../../canvas/linear/types'

export interface QsLineData {
  [key: string]: number[] | string | number | undefined
  data: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}

export type QsLineConfig = Partial<LineConfig>

export interface QsLineTransitionData {
  data: QsLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsLine {
  element:
    | Selection<SVGGElement, CanvasConfig, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsLineTransitionData) => void
}
