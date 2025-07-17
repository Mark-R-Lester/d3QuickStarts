import { ConfigSetters } from '../config/configStore.class'
import { QsTransitionArgs } from '../types/qsTypes'
import { QsGenerator } from './generators'

import { CanvasConfig } from './types'
import { Selection } from 'd3'

export { QsGenerator } from './generators'

export interface QsCanvasConfig extends Partial<CanvasConfig> {
  chartName: string
  width: number
  highestViewableValue: number
}

export interface QsCanvasTransitionConfig extends Partial<CanvasConfig> {}

export interface QsCanvasTransitionData {
  config: QsCanvasTransitionConfig
  transitionArgs?: QsTransitionArgs
}

export interface QsCanvas {
  canvasSVG: Selection<SVGSVGElement, CanvasConfig, HTMLElement, any>
  canvasGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  canvasDataGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  config: CanvasConfig
  generate: QsGenerator
  configStore: ConfigSetters
}
