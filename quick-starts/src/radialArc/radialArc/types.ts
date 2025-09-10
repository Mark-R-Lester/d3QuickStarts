import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigStrokeDefaults, StrokeData } from '../../core/types/types'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export interface ArcConfig extends ConfigStrokeDefaults {
  [key: string]: number | QsColorScaleData | string | undefined | boolean
  layerType: QsEnumLayerType
  outerRadius: number
  innerRadius: number
  padding: number
  cornerRadius: number
  x: number
  y: number
  defaultFillColor: string
  defaultFillOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}

export interface QsCalculatedDataArc {
  id: string
  arcData: CalculatedArcData
  x: number
  y: number
}

export interface CalculatedArcData extends StrokeData {
  data: number
  cornerRadius: number
  outerRadius: number
  innerRadius: number
  newStartAngle: number
  startAngle: number
  newEndAngle: number
  endAngle: number
  fillColor: string
  fillOpacity: number
  index?: number
  value?: number
  padding: number
}

export interface ArcData extends Partial<StrokeData> {
  valueArc: number
  valueRad: number | undefined
  fillColor?: string
  fillOpacity?: number
}
