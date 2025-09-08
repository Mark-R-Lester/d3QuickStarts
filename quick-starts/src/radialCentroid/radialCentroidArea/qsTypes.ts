import { QsCalculatedDataCentroidArea, RadialAreaConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
export { QsCalculatedDataCentroidArea } from './types'

export type QsRadialAreaConfig = Partial<RadialAreaConfig>

export interface QsRadialAreaTransitionData {
  data: QsRadialAreaData
  config?: QsRadialAreaConfig
  transitionArgs?: QsTransitionArgs
}

export interface QsRadialArea {
  classNameArea: string
  classNameLine: string
  calculatedData: QsCalculatedDataCentroidArea
  transition: (data: QsRadialAreaTransitionData) => void
}

export interface QsRadialAreaData extends Partial<StrokeData> {
  [key: string]: number[] | string | number | undefined
  highValues: number[]
  lowValues?: number[]
  fillColor?: string
  fillOpacity?: number
}
