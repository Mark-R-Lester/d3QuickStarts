import { UnboundTextConfig } from './types'
import { QsCoordinate } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'

export type QsUnboundTextConfig = Partial<UnboundTextConfig>

export interface QsUnboundTextData extends QsCoordinate, Partial<TextData> {
  text: string
}

export interface QsUnboundText {
  calculatedData: QsCalculatedDataUnboundText[]
  className: string
}

export interface QsCalculatedDataUnboundText extends TextData {
  text?: string
  newText?: string
  coordinate: QsCoordinate
  newCoordinate: QsCoordinate
  defaultDecimalPoints: number
}
