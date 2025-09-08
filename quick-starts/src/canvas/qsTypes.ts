import { Selection } from 'd3'
import { CanvasConfig } from './types'
import { QsTransitionArgs } from '../core/types/qsTypes'
import { QsGeneratorOrthogonal } from './generators/generatorsOrthogonal'
import { QsGeneratorPlotted } from './generators/generatorsPlotted'
import { ConfigSetters } from '../core/config/configStore.class'
import { QsGeneratorRadial } from './generators/generatorsRadial'

export interface QsCanvasConfig extends Partial<CanvasConfig> {
  chartName: string
  width: number
}

export interface QsCanvasConfigOrthogonal extends QsCanvasConfig {
  highestViewableValueY?: never
  lowestViewableValueY?: never
  highestViewableValueX?: never
  lowestViewableValueX?: never
  dataScaleX?: never
  dataScaleY?: never
}

export interface QsCanvasConfigRadial extends QsCanvasConfig {
  highestViewableValueY?: never
  lowestViewableValueY?: never
  highestViewableValueX?: never
  lowestViewableValueX?: never
  dataScaleX?: never
  dataScaleY?: never
}

export interface QsCanvasConfigPlotted extends QsCanvasConfig {
  highestViewableValue?: never
  lowestViewableValue?: never
  dataScale?: never
}

interface QsCanvas {
  canvasSVG: Selection<SVGSVGElement, CanvasConfig, HTMLElement, any>
  canvasGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  canvasDataGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  config: CanvasConfig
  configStore: ConfigSetters
}

export interface QsCanvasOrthogonal extends QsCanvas {
  generate: QsGeneratorOrthogonal
}

export interface QsCanvasPlotted extends QsCanvas {
  generate: QsGeneratorPlotted
}

export interface QsCanvasRadial extends QsCanvas {
  generate: QsGeneratorRadial
}
