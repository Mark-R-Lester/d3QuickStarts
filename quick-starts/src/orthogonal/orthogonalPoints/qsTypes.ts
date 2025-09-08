import { PointsConfig, QsCalculatedDataOthogonalPoints } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
export { QsCalculatedDataOthogonalPoints } from './types'

export interface QsPointData extends Partial<StrokeData> {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
}

export type QsPointsConfig = Partial<PointsConfig>

export interface QsPointsTransitionData {
  data: QsPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPoints {
  className: string
  calculatedData: QsCalculatedDataOthogonalPoints[]
  transition: (data: QsPointsTransitionData) => void
}
