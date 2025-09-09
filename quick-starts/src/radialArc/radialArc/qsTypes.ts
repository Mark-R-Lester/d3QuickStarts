import { QsCalculatedDataRadialArc, RadialArcConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataRadialArc } from './types'

export type QsRadialArcConfig = Partial<RadialArcConfig>

export interface QsRadialTransitionData {
  data: QsRadialData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadial {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataRadialArc[]
  transition: (data: QsRadialTransitionData) => void
}

export interface QsRadialData extends Partial<StrokeData> {
  value: number
  fillColor?: string
  fillOpacity?: number
}
