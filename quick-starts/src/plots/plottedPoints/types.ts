import { ConfigStrokeDefaults } from '../../core/types/types'

export interface PlottedPointsConfig extends ConfigStrokeDefaults {
  [key: string]: number | string | undefined | boolean
  useDataArea: boolean
  defaultRadius: number
  defaultFillColor: string
  defaultFillOpacity: number
}
