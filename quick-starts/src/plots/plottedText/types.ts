import { ConfigTextDefaults } from '../../core/types/types'

export interface PlottedTextConfig extends ConfigTextDefaults {
  [key: string]: number | string | undefined
  defaultDecimalPoints: number
}
