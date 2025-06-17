import { Selection } from 'd3'
import { QsCoordinate } from '../../d3QuickStart'
import { PlottedTextConfigStrict } from './types'

export type QsPlottedTextConfig = Partial<PlottedTextConfigStrict>

export interface QsPlottedText {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
}

export interface QsPlottedTextArgs extends QsCoordinate {
  text: string
}
