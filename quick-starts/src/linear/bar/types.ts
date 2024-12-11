import { Orientation } from '../../core/enums'

export interface QsBarConfigStrict {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding: number
  colorDomain: number[]
  colorRange: Iterable<unknown>
}

export interface BarData {
  x: number
  y: number
  height: number
  width: number
  color: string
}

export interface QsBarBoundries {
  lowerBoundry?: number
  upperBoundry: number
}

export interface DrawArgs {
  data: QsBarBoundries[]
  orientation: Orientation
}
