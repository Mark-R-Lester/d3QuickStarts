import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigStrokeDefaults } from '../../core/types/types'
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
  arcData: ArcData
  x: number
  y: number
}

export interface ArcData {
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
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
  index?: number
  value?: number
  padding: number
}
