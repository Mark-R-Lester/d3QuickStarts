import { QsCalculatedDataCentroidText, RadialTextConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'
export { QsCalculatedDataCentroidText } from './types'

export type QsRadialTextConfig = Partial<RadialTextConfig>

export interface QsRadialTextTransitionData {
  data: QsRadialCentroidTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialText {
  className: string
  calculatedData: QsCalculatedDataCentroidText[]
  transition: (data: QsRadialTextTransitionData) => void
}

export interface QsRadialCentroidTextData extends Partial<TextData> {
  value: number
  text?: string
}
