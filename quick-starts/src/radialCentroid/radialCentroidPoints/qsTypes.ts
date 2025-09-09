import { QsCalculatedDataCentroidPoints, RadialPointsConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataCentroidPoints } from './types'

export type QsRadialPointsConfig = Partial<RadialPointsConfig>

export interface QsRadialPointsTransitionData {
  data: QsRadialPointData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialPoints {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidPoints[]
  transition: (data: QsRadialPointsTransitionData) => void
}

export interface QsRadialPointData extends Partial<StrokeData> {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
}
