import { Selection } from 'd3'
import { AreaConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { CanvasConfig } from '../../canvas/linear/types'

export interface QsAreaData {
  lowerData?: number[]
  higherData: number[]
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
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
