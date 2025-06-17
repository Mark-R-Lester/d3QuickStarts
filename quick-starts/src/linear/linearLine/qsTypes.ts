import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { LineConfigStrict } from './types'

export interface QsLineData {
  [key: string]: number[] | string | number | undefined
  data: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}

export type QsLineConfig = Partial<LineConfigStrict>

export interface QsLineTransitionData {
  data: QsLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsLine {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsLineTransitionData) => void
}
