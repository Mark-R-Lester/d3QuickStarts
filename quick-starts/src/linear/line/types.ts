import { Line, Selection } from 'd3'
import { Orientation, ScaleType } from '../../core/enums/enums'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { QsTransitionArgs } from '../../d3QuickStart'

export interface DrawArgs {
  data: QsLineData
  scaleType: ScaleType
  orientation: Orientation
}

export interface LineConfigStrict {
  [key: string]: QsEnumCurve | undefined
  curve: QsEnumCurve
}

export interface Meta {
  class: string
  id: string
  lineData: [number, number][]
  lineFunction: Line<[number, number]>
}

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
