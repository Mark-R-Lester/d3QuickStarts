import { ConfigSetters } from '../config/configStore.class'
import { QsGenerator } from './generators'

import { CanvasConfig } from './types'
import { Selection } from 'd3'

export { QsGenerator } from './generators'

export interface QsCanvasConfig extends Partial<CanvasConfig> {
  chartName: string
  width: number
  highestViewableValue: number
}

export interface QsCanvas {
  canvasSVG: Selection<SVGSVGElement, unknown, HTMLElement, any>
  canvasGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  canvasDataGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: CanvasConfig
  generate: QsGenerator
  configStore: ConfigSetters
}
