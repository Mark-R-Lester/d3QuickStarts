import { ConfigTextDefaults } from '../../core/types/types'

export interface UnboundTextConfig extends ConfigTextDefaults {
  [key: string]: number | string | undefined
  defaultDecimalPoints: number
}
