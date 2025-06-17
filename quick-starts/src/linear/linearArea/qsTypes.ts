import { Selection } from 'd3'
import { QsTransitionArgs } from '../../d3QuickStart'
import { AreaConfigStrict } from './types'

export interface QsAreaData {
  lowerData?: number[]
  higherData: number[]
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}

export type QsAreaConfig = Partial<AreaConfigStrict>

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
