import { QsEnumCurve } from '../../core/enums/qsEnums'
import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsLineData {
  [key: string]: number[] | string | undefined
  data: number[]
  color?: string
}

export interface QsLineConfig {
  [key: string]: QsEnumCurve | undefined
  curve?: QsEnumCurve
}

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
