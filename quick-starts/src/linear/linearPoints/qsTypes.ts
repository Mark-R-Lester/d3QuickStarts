import {
  QsColorScaleData,
  QsScaleType,
  QsTransitionArgs,
} from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsPointData {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}

export interface QsPointsConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  scaleType?: QsScaleType
  defaultRadius?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
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
