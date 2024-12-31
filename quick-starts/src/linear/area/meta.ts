import { range } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { QsAreaData } from './types'
import { QsCanvas } from '../../d3QuickStart'

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

export const getMeta = (canvas: QsCanvas, areaData: QsAreaData) => {
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
