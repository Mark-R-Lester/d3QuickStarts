import { LayerActions } from '../../canvas/createCanvasElement'
import { QsCalculatedDataCentroidSpokes, CentroidSpokesConfig } from './types'
export { QsSpokeConfig } from './types'

export interface QsCentroidSpokesConfig extends Partial<CentroidSpokesConfig> {
  numberOfSpokes: number
}

export interface QsCentroidSpokes {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidSpokes[]
}
