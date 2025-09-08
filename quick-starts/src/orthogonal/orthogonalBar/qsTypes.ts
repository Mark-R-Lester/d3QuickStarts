import { BarConfig, QsCalculatedDataOthogonalBars } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
export { QsCalculatedDataOthogonalBars } from './types'

export interface QsBarData extends Partial<StrokeData> {
  lowValue?: number
  highValue: number
  fillColor?: string
  fillOpacity?: number
  topLeftCornerRadiusCx?: number
  topLeftCornerRadiusCy?: number
  topRightCornerRadiusCy?: number
  topRightCornerRadiusCx?: number
  bottomLeftCornerRadiusCx?: number
  bottomLeftCornerRadiusCy?: number
  bottomRightCornerRadiusCx?: number
  bottomRightCornerRadiusCy?: number
}

export type QsBarConfig = Partial<BarConfig>

export interface QsBarTransitionArgs extends QsTransitionArgs {}

export interface QsBarTransitionData {
  data: QsBarData[]
  transitionArgs?: QsBarTransitionArgs
}

export interface QsBars {
  className: string
  calculatedData: QsCalculatedDataOthogonalBars[]
  transition: (data: QsBarTransitionData) => void
}
