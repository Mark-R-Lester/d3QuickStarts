import { QsCalculatedDataCentroidPoints, CentroidPointsConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataCentroidPoints } from './types'

export type QsCentroidPointsConfig = Partial<CentroidPointsConfig>

export interface QsCentroidPointsTransitionData {
  data: QsCentroidPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsCentroidPoints {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidPoints[]
  transition: (data: QsCentroidPointsTransitionData) => void
}

export interface QsCentroidPointData extends Partial<StrokeData> {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
}
