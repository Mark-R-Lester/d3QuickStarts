import { CurveFactory, Selection } from 'd3'
import { QsEnumCurve } from '../../core/enums/qsEnums'
import { QsTransitionArgs } from '../../d3QuickStart'

export interface QsAreaData {
  lowerData?: number[]
  higherData: number[]
  color?: string
}

export interface QsAreaConfig {
  [key: string]: CurveFactory | string | undefined
  curve?: QsEnumCurve
}

export interface QsAreaTransitionData {
  data: QsAreaData
  transitionArgs?: QsTransitionArgs
}

export interface QsArea {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsAreaTransitionData) => void
}
