import { ConfigTextDefaults } from '../../core/types/types'

export interface PlottedTextConfig extends ConfigTextDefaults {
  [key: string]: number | string | undefined | boolean
  useDataArea: boolean
  defaultDecimalPoints: number
}
