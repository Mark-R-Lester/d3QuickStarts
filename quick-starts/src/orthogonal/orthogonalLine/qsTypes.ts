import { LineConfig, QsCalculatedDataOrthogonalLine } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'

import { StrokeData } from '../../core/types/types'
export { QsCalculatedDataOrthogonalLine } from './types'

export interface QsLineData extends Partial<StrokeData> {
  [key: string]: number[] | string | number | undefined
  values: number[]
}

export type QsLineConfig = Partial<LineConfig>

export interface QsLineTransitionData {
  data: QsLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsLine {
  className: string
  calculatedData: QsCalculatedDataOrthogonalLine
  transition: (data: QsLineTransitionData) => void
}
