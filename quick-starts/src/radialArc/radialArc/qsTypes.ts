import { QsCalculatedDataArc, ArcConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataArc as QsCalculatedDataRadialArc } from './types'

export type QsArcConfig = Partial<ArcConfig>

export interface QsArcTransitionData {
  data: QsArcData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadial {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataArc[]
  transition: (data: QsArcTransitionData) => void
}

export interface QsArcData extends Partial<StrokeData> {
  value: number
  fillColor?: string
  fillOpacity?: number
}
