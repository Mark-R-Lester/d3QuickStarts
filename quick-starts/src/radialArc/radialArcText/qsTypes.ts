import { QsCalculatedDataRadialText, RadialArcTextConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
export { QsCalculatedDataRadialText } from './types'

export type QsRadialArcTextConfig = Partial<RadialArcTextConfig>

export interface QsRadialArcTextTransitionArgs extends QsTransitionArgs {}

export interface QsRadialArcTextTransitionData {
  data: QsRadialTextData[]
  transitionArgs?: QsRadialArcTextTransitionArgs
}

export interface QsRadialArcText {
  className: string
  classNameArc: string
  calculatedData: QsCalculatedDataRadialText
  transition: (data: QsRadialArcTextTransitionData) => void
}

export interface QsRadialArcTextFollow {
  className: string
  calculatedData: QsCalculatedDataRadialText
  transition: (data: QsRadialArcTextTransitionData) => void
}

export interface QsRadialTextData {
  value: number
  text?: string
}
