import { LegendConfig } from './types'
import { TextData } from '../../core/types/types'
import { LayerActions } from '../../canvas/createCanvasElement'

export type QsLegendConfig = Partial<LegendConfig>

export interface QsLegendData extends Partial<TextData> {
  value: string
  fillColor: string
}

export interface QsLegend {
  className: string
  classNameText: string
  layerActions: LayerActions
  calculatedData: QsCalculatedDataUnboundLegend[]
}

export interface QsCalculatedDataUnboundLegend extends TextData {
  x: number
  y: number
  width: number
  height: number
  fillColor: string
  value: string
  textX: number
  textY: number
  textFontSize: number
}
