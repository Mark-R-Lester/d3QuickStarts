import { QsColorScaleData, QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsPointData {
  value: number
  color?: string
}

export interface QsPointsConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  radius?: number
  defaultColor?: string
  colorScaleData?: QsColorScaleData
}

export interface QsPointsTransitionData {
  data: QsPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsPointsTransitionData) => void
}
