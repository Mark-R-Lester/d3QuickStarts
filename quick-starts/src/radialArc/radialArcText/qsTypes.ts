import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'
import { RadialTextConfigStrict } from './types'

export type QsRadialTextConfig = Partial<RadialTextConfigStrict>

export interface QsRadialTextTransitionArgs extends QsTransitionArgs {}

export interface QsRadialTextTransitionData {
  data: QsValuedText[]
  transitionArgs?: QsRadialTextTransitionArgs
}

export interface QsRadialText {
  elementText:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  elementArcs:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialTextTransitionData) => void
}

export interface QsValuedText {
  value: number
  text?: string
}
