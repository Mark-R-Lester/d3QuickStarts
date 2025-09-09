import { QsCalculatedDataCentroidText, CentroidTextConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataCentroidText } from './types'

export type QsCentroidTextConfig = Partial<CentroidTextConfig>

export interface QsCentroidTextTransitionData {
  data: QsCentroidTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsCentroidText {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidText[]
  transition: (data: QsCentroidTextTransitionData) => void
}

export interface QsCentroidTextData extends Partial<TextData> {
  value: number
  text?: string
}
