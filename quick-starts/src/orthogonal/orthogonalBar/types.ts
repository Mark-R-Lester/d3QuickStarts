import { RectangleParams } from '../../core/customShapes/customRectangle'
import { QsColorScaleData } from '../../core/types/qsTypes'
import { ConfigStrokeDefaults, StrokeData } from '../../core/types/types'

export interface CalculatedDataBarData extends StrokeData {
  fillColor: string
  fillOpacity: number
  rectangleParams: RectangleParams
}

export interface BarConfig extends ConfigStrokeDefaults {
  [key: string]: number | string | QsColorScaleData | undefined | boolean
  useDataArea: boolean
  padding: number
  defaultFillColor: string
  defaultFillOpacity: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
  defaultTopLeftCornerRadiusCx?: number
  defaultTopLeftCornerRadiusCy?: number
  defaultTopRightCornerRadiusCx?: number
  defaultTopRightCornerRadiusCy?: number
  defaultTBottomLeftCornerRadiusCx?: number
  defaultTBottomLeftCornerRadiusCy?: number
  defaultTBottomRightCornerRadiusCx?: number
  defaultTBottomRightCornerRadiusCy?: number
}
