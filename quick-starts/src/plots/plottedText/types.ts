import { ConfigTextDefaults } from '../../core/types/types'
import { QsEnumCoordinateView } from './qsEnums'

export interface PlottedTextConfig extends ConfigTextDefaults {
  [key: string]: number | string | undefined | boolean
  useDataArea: boolean
  defaultDecimalPoints: number
  defaultCooridinateView: QsEnumCoordinateView
}
