import { ConfigTextDefaults, TextData } from '../../core/types/types'
import { QsCoordinate } from '../../d3QuickStart'
import { QsEnumCoordinateView } from './qsEnums'

export interface PlottedTextConfig extends ConfigTextDefaults {
  [key: string]: number | string | undefined | boolean
  useDataArea: boolean
  defaultDecimalPoints: number
  defaultCooridinateView: QsEnumCoordinateView
}

export interface QsCalculatedDataPlottedText extends TextData {
  text?: string
  newText?: string
  coordinate: QsCoordinate
  viewableCoordinate: QsCoordinate
  newViewableCoordinate: QsCoordinate
  defaultDecimalPoints: number
}
