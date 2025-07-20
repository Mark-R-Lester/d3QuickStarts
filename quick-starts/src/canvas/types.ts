import { Selection } from 'd3'
import { ConfigGetters } from '../core/config/configStore.class'
import { CanvasScales } from '../core/scales/getScales'
import { QSDataScale } from '../core/types/qsTypes'

export interface CanvasConfig {
  [key: string]: string | number | undefined | QSDataScale
  ry: number
  rx: number
  chartName: string
  width: number
  height: number
  marginRight: number
  marginLeft: number
  marginTop: number
  marginBottom: number
  highestViewableValue: number
  lowestViewableValue: number
  highestViewableValuePlottedX?: number
  lowestViewableValuePlottedX?: number
  borderColor: string
  borderWidth: number
  fillColor: string
  displayAreaHeight: number
  displayAreaWidth: number
  dataScale?: QSDataScale
}

export interface ElementWithData {
  element: any
  data: any
}

export interface Canvas {
  canvasGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  canvasDataGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  config: CanvasConfig
  scales: CanvasScales
  configStore: ConfigGetters
  elements: ElementWithData[]
}
