import { Selection } from 'd3'
import { UnboundTextConfig } from './types'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'

export type QsUnboundTextConfig = Partial<UnboundTextConfig>

export interface QsUnboundTextData extends QsCoordinate, Partial<TextData> {
  text: string
}

export interface QsUnboundText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}
