import { QsCalculatedDataArc, ArcConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataArc as QsCalculatedDataRadialArc } from './types'

export interface QsArcConfig extends Partial<ArcConfig> {}
export interface QsArcSegmentConfig extends Partial<ArcConfig> {
  outerRadius?: never
}
export interface QsArcPetalConfig extends Partial<ArcConfig> {
  outerRadius?: never
}

export interface QsArcTransitionData {
  data: QsArcData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsArcSegmentTransitionData {
  data: QsArcSegmentData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsArcPetalTransitionData {
  data: QsArcPetalData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsRadial {
  className: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataArc[]
  transition: (
    data:
      | QsArcTransitionData
      | QsArcSegmentTransitionData
      | QsArcPetalTransitionData
  ) => void
}

export interface QsArcData extends Partial<StrokeData> {
  valueArc: number
  valueRad?: never
  fillColor?: string
  fillOpacity?: number
}

export interface QsArcSegmentData extends Partial<StrokeData> {
  valueArc?: never
  valueRad: number
  fillColor?: string
  fillOpacity?: number
}

export interface QsArcPetalData extends Partial<StrokeData> {
  valueArc: number
  valueRad: number
  fillColor?: string
  fillOpacity?: number
}
