import { range } from 'd3'
import { Canvas } from '../../canvas/canvas'
import { v4 as uuidv4 } from 'uuid'
import { AreaData } from './types'

export interface Meta {
  class: string
  id: string
  areaData: number[][]
}

export const getMeta = (canvas: Canvas, areaData: AreaData) => {
  const { displayAreaWidth } = canvas.config
  const { higherData, lowerData } = areaData
  const xVals = range(0, displayAreaWidth, displayAreaWidth / higherData.length)
  const meta: Meta[] = []

  meta.push({
    class: 'area',
    id: `area-${uuidv4()}`,
    areaData: higherData.map((d, i) => [
      xVals[i],
      d,
      lowerData ? lowerData[i] : 0,
    ]),
  })
  return meta
}
