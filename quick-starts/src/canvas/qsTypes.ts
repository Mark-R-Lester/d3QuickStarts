import { QsGenerator } from './generators'
import { ConfigSetters } from './setConfigs'
import { CanvasConfigStrict } from './types'
import { Selection } from 'd3'

export { QsGenerator } from './generators'

export interface QsCanvasConfig {
  [key: string]: string | number | undefined
  chartName: string
  width?: number
  height?: number
  marginRight?: number
  marginLeft?: number
  marginTop?: number
  marginBottom?: number
  highestViewableValue: number
  lowestViewableValue?: number
  borderColor?: string
}

export interface QsCanvas {
  displayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: CanvasConfigStrict
  generate: QsGenerator
  configOverrides: ConfigSetters
}
