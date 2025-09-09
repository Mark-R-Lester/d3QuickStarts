import { LayerActions } from '../../canvas/createCanvasElement'
import { AxisConfig, QsCalculatedDataOrthogonalAxis } from './types'
export { QsCalculatedDataOrthogonalAxis } from './types'

export type QsAxisConfig = Partial<AxisConfig>

export interface QsAxis {
  classNameAxis: string
  classNameDomain: string
  classNameTick: string
  classNameText: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataOrthogonalAxis
}
