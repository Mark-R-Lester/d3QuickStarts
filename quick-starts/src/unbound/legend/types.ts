import { QsShape } from '../../core/customShapes/qsTypes'
import {
  ConfigStrokeDefaults,
  ConfigTextDefaults,
} from '../../core/types/types'

export interface LegendConfig extends ConfigTextDefaults, ConfigStrokeDefaults {
  height: number
  width: number
  verticalSpacing: number
  relativeTextX: number
  relativeTextY: number
  x: number
  y: number
  defaultFillColor: string
  defaultFillOpacity: number
  shape: QsShape
}
