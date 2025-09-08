import { PlottedLineConfig, QsCalculatedDataPlottedLine } from './types'
import { QsCoordinate, QsTransitionArgs } from '../../core/types/qsTypes'
import { StrokeData } from '../../core/types/types'
export { QsCalculatedDataPlottedLine } from './types'

export interface QsPlottedLineConfig extends Partial<PlottedLineConfig> {}

export interface QsPlottedLineData extends Partial<StrokeData> {
  [key: string]: number | string | QsCoordinate[] | undefined
  coordinates: QsCoordinate[]
}

export interface QsPlottedLineTransitionData {
  data: QsPlottedLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsLinePlot {
  className: string
  calculatedData: QsCalculatedDataPlottedLine
  transition: (data: QsPlottedLineTransitionData) => void
}
