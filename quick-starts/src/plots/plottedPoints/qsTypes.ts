import { PlottedPointsConfig } from './calculatedData'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { QsCalculatedDataPlottedPoints } from './types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataPlottedPoints } from './types'

export type QsPlottedPointsConfig = Partial<PlottedPointsConfig>

export interface QsPlottedPointsData extends QsCoordinate, Partial<StrokeData> {
  [key: string]: number | string | undefined
  radius?: number
  opacity?: number
  fillColor?: string
  fillOpacity?: number
}

export interface QsPlottedPointsTransitionData {
  data: QsPlottedPointsData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsPlottedPoints {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataPlottedPoints[]
  transition: (data: QsPlottedPointsTransitionData) => void
}
