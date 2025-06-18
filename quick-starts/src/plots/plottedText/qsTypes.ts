import { Selection } from 'd3'
import { PlottedTextConfig } from './types'
import { QsCoordinate } from '../../d3QuickStart'

export type QsPlottedTextConfig = Partial<PlottedTextConfig>

export interface QsPlottedText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}

export interface QsPlottedTextArgs extends QsCoordinate {
  text: string
}
