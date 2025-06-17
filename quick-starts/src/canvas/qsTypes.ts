import { ConfigSetters } from '../core/config/configStore.class'
import { QsGenerator } from './generators'

import { CanvasConfigStrict } from './types'
import { Selection } from 'd3'

export { QsGenerator } from './generators'

export type QsCanvasConfig = Partial<CanvasConfigStrict>

export interface QsCanvas {
  displayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: CanvasConfigStrict
  generate: QsGenerator
  configStore: ConfigSetters
}
