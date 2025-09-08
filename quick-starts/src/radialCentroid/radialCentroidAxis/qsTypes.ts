import { Selection } from 'd3'
import { QsCalculatedDataCentroidAxis, RadialAxisConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
export { QsRingConfig } from './types'

export type QsRadialAxisConfig = Partial<RadialAxisConfig>

export interface QsRadialAxis {
  classNameTicks: string
  classNameText: string
  calculatedData: QsCalculatedDataCentroidAxis[]
}
