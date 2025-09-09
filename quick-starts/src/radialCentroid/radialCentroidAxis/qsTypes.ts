import { QsCalculatedDataCentroidAxis, RadialAxisConfig } from './types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsRingConfig } from './types'

export type QsRadialAxisConfig = Partial<RadialAxisConfig>

export interface QsRadialAxis {
  classNameTicks: string
  classNameText: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidAxis[]
}
