import { QsTransitionArgs } from '../../core/types/qsTypes'
import { BarGroupConfig, QsCalculatedDataOrthogonalBarGroups } from './types'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataOrthogonalBarGroups } from './types'

export type QsBarGroupConfig = Partial<BarGroupConfig>

export interface QsBarGroupedData extends Partial<StrokeData> {
  value: number
  fillColor?: string
  fillOpacity?: number
}

export interface QsBarGroupTransitionData {
  data: QsBarGroupedData[][]
  transitionArgs?: QsTransitionArgs
}

export interface QsBarGroups {
  className: string
  classNameGroup: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataOrthogonalBarGroups[]
  transition: (data: QsBarGroupTransitionData) => void
}
