import { QsCanvas } from '../canvas/canvas'
import { scaleLinear } from 'd3'
import { LegendConfigStrict, QsValuedColor } from './types'

export interface Meta {
  x: number
  y: number
  width: number
  height: number
  colour: string
  value: string
  textX: number
  textY: number
}

export const getMeta = (
  canvas: QsCanvas,
  data: QsValuedColor[],
  config: LegendConfigStrict
): Meta[] => {
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const { height, width, space, x, y } = config

  const xScale = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yScale = scaleLinear().domain([0, 100]).range([displayAreaHeight, 0])

  const invertIndex = (array: any[], index: number) => data.length - (index + 1)

  const meta: Meta[] = data.map((d, i) => {
    return {
      x: xScale(x),
      y: yScale(y + height + space * invertIndex(data, i)),
      textX: xScale(x + width * 1.3),
      textY: yScale(y + space * invertIndex(data, i)),
      width: xScale(width),
      height: xScale(height),
      colour: d.color,
      value: d.value,
    }
  })

  return meta
}
