import { Selection } from 'd3'
import { RadialLineConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'

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

export interface QsRadialLineData extends Partial<StrokeData> {
  [key: string]: number[] | string | number | undefined
  values: number[]
}
