import { RectangleParams } from '../../core/customShapes/customRectangle'
import { Orientation } from '../../core/enums/enums'
import { QsColorScaleData } from '../../core/types/qsTypes'
import { QsBarData } from './qsTypes'

export interface CalculatedDataBarData {
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
  rectangleParams: RectangleParams
}

export interface DrawArgs {
  data: QsBarData[]
  orientation: Orientation
}

export interface BarConfig {
  [key: string]: number | string | QsColorScaleData | undefined
  padding: number
  defaultFillColor: string
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
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
