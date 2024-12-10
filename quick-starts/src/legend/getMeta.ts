import { QsCanvas } from '../canvas/canvas'
import { scaleLinear } from 'd3-scale'
import { LegendConfigStrict, QsValuedColor } from './types'

export interface Meta {
  x: number
  y: number
  tx: number
  ty: number
  width: number
  height: number
  colour: string
  value: string
}

export const getMeta = (
  canvas: QsCanvas,
  data: QsValuedColor[],
  config: LegendConfigStrict
): Meta[] => {
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const { size, space, x, y } = config

  const xScale = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yScale = scaleLinear().domain([0, 100]).range([displayAreaHeight, 0])

  const invertIndex = (array: any[], index: number) => data.length - (index + 1)

  const meta: Meta[] = data.map((d, i) => {
    return {
      x: xScale(x),
      y: yScale(y + size + space * invertIndex(data, i)),
      tx: xScale(x + size * 1.3),
      ty: yScale(y + space * invertIndex(data, i)),
      width: xScale(size),
      height: xScale(size),
      colour: d.color,
      value: d.color,
    }
  })

  return meta
}
