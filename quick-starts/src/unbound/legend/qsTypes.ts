import { LegendConfig } from './types'
import { StrokeData, TextData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'
import { Shape } from '../../core/customShapes/types'

export type QsLegendConfig = Partial<LegendConfig>

export interface QsLegendData extends Partial<TextData>, Partial<StrokeData> {
  value: string
  fillColor: string
  fillOpacity?: number
}

export interface QsLegend {
  classNameShape: string
  classNameText: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataUnboundLegend[]
}

export interface QsCalculatedDataUnboundLegend extends TextData, StrokeData {
  fillColor: string
  fillOpacity: number
  value: string
  textX: number
  textY: number
  textFontSize: number
  shape: Shape
}
