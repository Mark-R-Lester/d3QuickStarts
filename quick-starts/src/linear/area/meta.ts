import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { Canvas } from '../../d3QuickStart'
import { QsAreaData } from './qsTypes'

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
  const { yDataScale } = canvas.scales
  const { higherData, lowerData } = areaData

  const xDataScale = scaleLinear()
    .domain([0, higherData.length - 1])
    .range([0, displayAreaWidth])

  const meta: Meta = {
    class: 'area',
    id: `area-${uuidv4()}`,
    areaData: higherData.map((d, i) => ({
      x: xDataScale(i),
      y1: yDataScale(d),
      y0: yDataScale(lowerData ? lowerData[i] : 0),
    })),
  }
  return meta
}
