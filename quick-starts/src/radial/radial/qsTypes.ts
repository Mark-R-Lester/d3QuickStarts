import { QsColorScaleData, QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsRadialConfig {
  [key: string]: number | string | QsColorScaleData | undefined
  outerRadius?: number
  innerRadius?: number
  padAngle?: number
  cornerRadius?: number
  x?: number
  y?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}

export interface QsRadialTransitionData {
  data: QsRadialData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadial {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialTransitionData) => void
}

export interface QsRadialData {
  value: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}
