import { UnboundTextConfig } from './types'
import { QsCoordinate } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'

export type QsUnboundTextConfig = Partial<UnboundTextConfig>

export interface QsUnboundTextData extends QsCoordinate, Partial<TextData> {
  text: string
}

export interface QsUnboundText {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataUnboundText[]
}

export interface QsCalculatedDataUnboundText extends TextData {
  text: string
  newText?: string
  coordinate: QsCoordinate
  newCoordinate: QsCoordinate
}
