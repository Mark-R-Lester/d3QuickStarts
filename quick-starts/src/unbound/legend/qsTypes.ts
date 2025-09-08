import { BaseType, Selection } from 'd3'
import { LegendConfig } from './types'
import { TextData } from '../../core/types/types'

export type QsLegendConfig = Partial<LegendConfig>

export interface QsLegendData extends Partial<TextData> {
  value: string
  fillColor: string
}

export interface QsLegend {
  className: string
  classNameText: string
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
