import { ConfigTextDefaults } from '../../core/types/types'

export interface LegendConfig extends ConfigTextDefaults {
  [key: string]: number | string | undefined
  height: number
  width: number
  verticalSpacing: number
  relativeTextX: number
  relativeTextY: number
  x: number
  y: number
}
