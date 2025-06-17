import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { RadialAreaConfig } from './types'

export type QsRadialAreaConfig = Partial<RadialAreaConfig>

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
  [key: string]: number[] | string | number | undefined
  outerData: number[]
  innerData?: number[]
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}
