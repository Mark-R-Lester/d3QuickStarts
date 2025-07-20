import { Selection } from 'd3'
import { TextConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'

export interface QsTextData extends Partial<TextData> {
  value: number
  relativeValue?: number
  text?: string
}

export type QsTextConfig = Partial<TextConfig>

export interface QsTextTransitionData {
  data: QsTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsTextTransitionData) => void
}
