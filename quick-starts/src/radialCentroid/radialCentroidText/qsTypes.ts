import { Selection } from 'd3'
import { RadialTextConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'

export type QsRadialTextConfig = Partial<RadialTextConfig>

export interface QsRadialTextTransitionData {
  data: QsRadialTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialTextTransitionData) => void
}

export interface QsRadialTextData extends Partial<TextData> {
  value: number
  text?: string
}
