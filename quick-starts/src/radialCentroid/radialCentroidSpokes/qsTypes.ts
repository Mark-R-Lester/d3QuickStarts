import { LayerActions } from '../../canvas/createCanvasElement'
import { QsCalculatedDataCentroidSpokes, RadialSpokesConfig } from './types'
export { QsSpokeConfig } from './types'

export interface QsRadialSpokesConfig extends Partial<RadialSpokesConfig> {
  numberOfSpokes: number
}

export interface QsRadialSpokes {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidSpokes[]
}
