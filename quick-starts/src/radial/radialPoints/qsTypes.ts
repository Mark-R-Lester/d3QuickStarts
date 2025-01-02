import { QsColorScaleData, QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsRadialPointsConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  x?: number
  y?: number
  pointRadius?: number
  defaultColor?: string
  colorScaleData?: QsColorScaleData
}

export interface QsRadialPointsTransitionData {
  data: QsRadialPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialPointsTransitionData) => void
}

export interface QsRadialPointData {
  value: number
  color?: string
}
