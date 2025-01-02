import { Selection } from 'd3'
import { QsEnumCurve } from '../../core/enums/qsEnums'

export interface QsLinePlotConfig {
  [key: string]: QsEnumCurve | undefined
  curve?: QsEnumCurve
}

export interface QsLinePlot {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}
