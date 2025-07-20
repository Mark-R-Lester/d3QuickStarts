import { Selection } from 'd3'
import { CanvasConfig } from './types'
import { QsTransitionArgs } from '../core/types/qsTypes'
import { QsGenerator } from './plotted/generators'
import { ConfigSetters } from '../core/config/configStore.class'

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
