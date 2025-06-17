import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { RadialLineConfig } from './types'

export type QsRadialLineConfig = Partial<RadialLineConfig>

export interface QsRadialLineTransitionData {
  data: QsRadialLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialLine {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialLineTransitionData) => void
}

export interface QsRadialLineData {
  [key: string]: number[] | string | number | undefined
  data: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}
