import { QsCalculatedDataArcText, ArcTextConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataArcText as QsCalculatedDataRadialText } from './types'

export type QsArcTextConfig = Partial<ArcTextConfig>

export interface QsRadialArcTextTransitionArgs extends QsTransitionArgs {}

export interface QsArcTextTransitionData {
  data: QsArcTextData[]
  transitionArgs?: QsRadialArcTextTransitionArgs
}

export interface QsRadialArcText {
  className: string
  classNameArc: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataArcText
  transition: (data: QsArcTextTransitionData) => void
}

export interface QsArcTextFollow {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataArcText
  transition: (data: QsArcTextTransitionData) => void
}

export interface QsArcTextData {
  value: number
  text?: string
}
