import { QsColorScaleData, QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsBarData {
  lowerBoundry?: number
  upperBoundry: number
  color?: string
}

export interface QsBarConfigStrict {
  [key: string]: number | string | QsColorScaleData | undefined
  padding: number
  defaultColor: string
  colorScaleData?: QsColorScaleData
}

export interface QsBarConfig {
  [key: string]: number | string | QsColorScaleData | undefined
  padding?: number
  defaultColor?: string
  colorScaleData?: QsColorScaleData
}

export interface QsBarTransitionArgs extends QsTransitionArgs {}

export interface QsBarTransitionData {
  data: QsBarData[]
  transitionArgs?: QsBarTransitionArgs
}

export interface QsBars {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsBarTransitionData) => void
}
