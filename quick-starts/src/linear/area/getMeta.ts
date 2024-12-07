import { range } from 'd3'
import { Canvas } from '../../canvas/canvas'
import { v4 as uuidv4 } from 'uuid'
import { QsAreaData } from './types'

export interface Meta {
  class: string
  id: string
  areaData: AreaData[]
}

export interface AreaData {
  x: number
  y0: number
  y1: number
}

export const getMeta = (canvas: Canvas, areaData: QsAreaData) => {
  const { displayAreaWidth } = canvas.config
  const { higherData, lowerData } = areaData
  const xVals = range(0, displayAreaWidth, displayAreaWidth / higherData.length)

  const meta: Meta = {
    class: 'area',
    id: `area-${uuidv4()}`,
    areaData: higherData.map((d, i) => ({
      x: xVals[i],
      y1: d,
      y0: lowerData ? lowerData[i] : 0,
    })),
  }
  return meta
}
