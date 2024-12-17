import { QsEnumAlignmentBaseline, QsEnumTextAnchor } from '../core/qsEnums'

export interface QsValuedColor {
  value: string
  color: string
}

export interface LegendConfigStrict {
  [key: string]: number | string | undefined
  height: number
  width: number
  space: number
  x: number
  y: number
  fontSize: number
  font: string
  fill: string
  stroke: string
  alignmentBaseline: QsEnumAlignmentBaseline
  textAnchor: QsEnumTextAnchor
  angle: number
}
