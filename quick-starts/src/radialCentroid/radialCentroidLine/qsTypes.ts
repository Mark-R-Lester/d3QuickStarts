import { QsCalculatedDataCentroidLine, CentroidLineConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataCentroidLine } from './types'

export type QsCentroidLineConfig = Partial<CentroidLineConfig>

export interface QsCentroidLineTransitionData {
  data: QsCentroidLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsCentroidLine {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidLine
  transition: (data: QsCentroidLineTransitionData) => void
}

export interface QsCentroidLineData extends Partial<StrokeData> {
  [key: string]: number[] | string | number | undefined
  values: number[]
}
