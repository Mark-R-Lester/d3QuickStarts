import { PlottedTextConfig, QsCalculatedDataPlottedText } from './types'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'
import { TextData } from '../../core/types/types'
export { QsCalculatedDataPlottedText } from './types'

export type QsPlottedTextConfig = Partial<PlottedTextConfig>

export interface QsPlottedTextData extends QsCoordinate, Partial<TextData> {
  text?: string
}

export interface QsPlottedTextTransitionData {
  data: QsPlottedTextData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPlottedText {
  className: string
  calculatedData: QsCalculatedDataPlottedText[]
  transition: (data: QsPlottedTextTransitionData) => void
}
