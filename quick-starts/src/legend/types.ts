export interface QsValuedColor {
  value: string
  color: string
}

export interface LegendConfigStrict {
  [key: string]: number | string | undefined
  size: number
  space: number
  x: number
  y: number
  font: string
  fill: string
  stroke: string
  alignmentBaseline: string
  textAnchor: string
  angle: number
}
