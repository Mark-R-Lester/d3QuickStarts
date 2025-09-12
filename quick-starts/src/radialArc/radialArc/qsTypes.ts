import {
  QsCalculatedDataArc,
  ArcSliceConfig,
  ArcSegmentConfig,
  ArcEnvelopeConfig,
} from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
export { QsCalculatedDataArc as QsCalculatedDataRadialArc } from './types'

export interface QsArcSliceConfig extends Partial<ArcSliceConfig> {}
export interface QsArcSegmentConfig extends Partial<ArcSegmentConfig> {
  outerRadius?: never
  innerRadius?: never
}
export interface QsArcEnvelopeConfig extends Partial<ArcEnvelopeConfig> {
  outerRadius?: never
  innerRadius?: never
}

export interface QsArcTransitionData {
  data: QsArcSliceData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsArcSegmentTransitionData {
  data: QsArcSegmentData[]
  transitionArgs?: QsTransitionArgs
}

export interface QsArcEnvelopeTransitionData {
  data: QsArcEnvelopeData[]
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
      | QsArcEnvelopeTransitionData
  ) => void
}

export interface QsArcSliceData extends Partial<StrokeData> {
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

export interface QsArcEnvelopeData extends Partial<StrokeData> {
  valueArc: number
  valueRad: number
  fillColor?: string
  fillOpacity?: number
}
