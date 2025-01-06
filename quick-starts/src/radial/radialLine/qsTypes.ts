import { QsEnumCurve } from '../../core/enums/qsEnums'
import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsRadialLineConfig {
  [key: string]: number | QsEnumCurve | undefined
  x?: number
  y?: number
  curve?: QsEnumCurve
}

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
  [key: string]: number[] | string | undefined
  data: number[]
  strokeColor?: string
}
