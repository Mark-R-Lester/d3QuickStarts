import { Selection } from 'd3'
import { AreaConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { CanvasConfig } from '../../canvas/types'
import { StrokeData } from '../../core/types/types'

export interface QsAreaData extends Partial<StrokeData> {
  lowValues?: number[]
  highValues: number[]
  fillColor?: string
  fillOpacity?: number
}

export type QsAreaConfig = Partial<AreaConfig>

export interface QsAreaTransitionData {
  data: QsAreaData
  transitionArgs?: QsTransitionArgs
}

export interface QsArea {
  element:
    | Selection<SVGGElement, CanvasConfig, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsAreaTransitionData) => void
}
