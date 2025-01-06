import { QsEnumCurve } from '../../core/enums/qsEnums'
import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsRadialAreaConfig {
  [key: string]: QsEnumCurve | number | undefined | string
  curve?: QsEnumCurve
  x?: number
  y?: number
}

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
  [key: string]: number[] | string | undefined
  outerData: number[]
  innerData?: number[]
  fillColor?: string
}
