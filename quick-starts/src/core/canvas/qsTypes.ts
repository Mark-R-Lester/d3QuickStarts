import { ConfigSetters } from '../config/configStore.class'
import { QsGenerator } from './generators'

import { CanvasConfig } from './types'
import { Selection } from 'd3'

export { QsGenerator } from './generators'

export type QsCanvasConfig = Partial<CanvasConfig>

export interface QsCanvas {
  canvasGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  canvasDataGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: CanvasConfig
  generate: QsGenerator
  configStore: ConfigSetters
}
