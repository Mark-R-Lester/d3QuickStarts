import { Selection } from 'd3'
import { PlottedTextConfig } from './types'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'

export type QsPlottedTextConfig = Partial<PlottedTextConfig>

export interface QsPlottedTextData extends QsCoordinate, Partial<TextData> {
  text?: string
}

export interface QsPlottedTextTransitionData {
  data: QsPlottedTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPlottedText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsPlottedTextTransitionData) => void
}
