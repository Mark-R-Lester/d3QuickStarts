import { QsCalculatedDataOrthogonalText, TextConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'
export { QsCalculatedDataOrthogonalText } from './types'

export interface QsTextData extends Partial<TextData> {
  value: number
  positionalValue?: number
  text?: string
}

export type QsTextConfig = Partial<TextConfig>

export interface QsTextTransitionData {
  data: QsTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsText {
  className: string
  calculatedData: QsCalculatedDataOrthogonalText[]
  transition: (data: QsTextTransitionData) => void
}
