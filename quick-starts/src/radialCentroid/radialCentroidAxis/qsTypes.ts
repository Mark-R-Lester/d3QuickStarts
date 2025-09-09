import { QsCalculatedDataCentroidAxis, CentroidAxisConfig } from './types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCentroidTickConfig as QsRingConfig } from './types'

export type QsCentroidAxisConfig = Partial<CentroidAxisConfig>

export interface QsCentroidAxis {
  classNameTicks: string
  classNameText: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidAxis[]
}
