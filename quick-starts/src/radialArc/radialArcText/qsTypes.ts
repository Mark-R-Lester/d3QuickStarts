import { Selection } from 'd3'
import { RadialArcTextConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'

export type QsRadialArcTextConfig = Partial<RadialArcTextConfig>

export interface QsRadialArcTextTransitionArgs extends QsTransitionArgs {}

export interface QsRadialArcTextTransitionData {
  data: QsValuedText[]
  transitionArgs?: QsRadialArcTextTransitionArgs
}

export interface QsRadialArcText {
  elementText:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialArcTextTransitionData) => void
}

export interface QsRadialArcTextFollow {
  elementText:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  elementArcs:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialArcTextTransitionData) => void
}

export interface QsValuedText {
  value: number
  text?: string
}
