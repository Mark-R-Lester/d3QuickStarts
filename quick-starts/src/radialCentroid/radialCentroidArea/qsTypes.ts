import {
  QsCalculatedDataCentroidArea,
  CentroidAreaConfig as CentroidAreaConfig,
} from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataCentroidArea } from './types'

export type QsCentroidAreaConfig = Partial<CentroidAreaConfig>

export interface QsCentroidAreaTransitionData {
  data: QsCentroidAreaData
  config?: QsCentroidAreaConfig
  transitionArgs?: QsTransitionArgs
}

export interface QsCentroidArea {
  classNameArea: string
  classNameLine: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidArea
  transition: (data: QsCentroidAreaTransitionData) => void
}

export interface QsCentroidAreaData extends Partial<StrokeData> {
  [key: string]: number[] | string | number | undefined
  highValues: number[]
  lowValues?: number[]
  fillColor?: string
  fillOpacity?: number
}
