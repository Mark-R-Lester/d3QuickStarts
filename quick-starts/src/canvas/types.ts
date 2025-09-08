import { Selection } from 'd3'
import { ConfigGetters } from '../core/config/configStore.class'
import { CanvasScales } from '../core/scales/getScales'
import { QsDataScale } from '../core/types/qsTypes'
import { LayerResult } from './createCanvasElement'

export interface CanvasConfig {
  [key: string]: string | number | undefined | QsDataScale
  ry: number
  rx: number
  chartName: string
  width: number
  height: number
  marginRight: number
  marginLeft: number
  marginTop: number
  marginBottom: number
  borderColor: string
  borderWidth: number
  fillColor: string
  displayAreaHeight: number
  displayAreaWidth: number
  highestViewableValueY: number
  lowestViewableValueY: number
  highestViewableValueX: number
  lowestViewableValueX: number
  highestViewableValue: number
  lowestViewableValue: number
  dataScale?: QsDataScale
  dataScaleX?: QsDataScale
  dataScaleY?: QsDataScale
}

export interface ElementWithData {
  element: any
  data: any
}

export interface Canvas {
  addUnboundLayer: () => LayerResult
  addDataLayer: () => LayerResult
  config: CanvasConfig
  scales: CanvasScales
  configStore: ConfigGetters
  elements: ElementWithData[]
}
