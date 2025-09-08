import { BarStackedConfig, QsalculatedDataOrthogonalBarStacks } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
export { QsalculatedDataOrthogonalBarStacks } from './types'

export type QsBarStackedConfig = Partial<BarStackedConfig>

export interface QsBarStackedData extends Partial<StrokeData> {
  value: number
  fillColor?: string
  fillOpacity?: number
}

export interface QsBarStackedTransitionData {
  data: QsBarStackedData[][]
  transitionArgs?: QsTransitionArgs
}

export interface QsBarStack {
  className: string
  classNameStack: string
  calculatedData: QsalculatedDataOrthogonalBarStacks[]
  transition: (data: QsBarStackedTransitionData) => void
}
