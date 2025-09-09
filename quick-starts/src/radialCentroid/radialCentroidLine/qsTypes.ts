import { QsCalculatedDataCentroidLine, RadialLineConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataCentroidLine } from './types'

export type QsRadialLineConfig = Partial<RadialLineConfig>

export interface QsRadialLineTransitionData {
  data: QsRadialLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialLine {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataCentroidLine
  transition: (data: QsRadialLineTransitionData) => void
}

export interface QsRadialLineData extends Partial<StrokeData> {
  [key: string]: number[] | string | number | undefined
  values: number[]
}
