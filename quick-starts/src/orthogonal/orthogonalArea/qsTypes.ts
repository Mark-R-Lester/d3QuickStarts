import { AreaConfig, QsCalculatedDataOrthogonalArea } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
export { QsCalculatedDataOrthogonalArea } from './types'

export interface QsAreaData extends Partial<StrokeData> {
  lowValues?: number[]
  highValues: number[]
  fillColor?: string
  fillOpacity?: number
}

export type QsAreaConfig = Partial<AreaConfig>

export interface QsAreaTransitionData {
  data: QsAreaData
  transitionArgs?: QsTransitionArgs
}

export interface QsArea {
  className: string
  calculatedData: QsCalculatedDataOrthogonalArea
  transition: (data: QsAreaTransitionData) => void
}
