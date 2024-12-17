import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { QsCanvas } from '../../canvas/canvas'

export interface Meta {
  id: string
  class: string
  pointData: number[]
}

export const getMeta = (canvas: QsCanvas, data: number[]): Meta[] => {
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config

  const meta: Meta[] = []
  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])
  data.forEach((d, i) => {
    const radians = angleScale(i)
    const hypotenuse = radialScale(d)
    const x = Math.sin(radians) * hypotenuse
    const y = Math.cos(radians) * hypotenuse * -1

    meta.push({
      id: `radialPoint${uuidv4()}`,
      class: 'radialPoint',
      pointData: [x, y],
    })
  })
  return meta
}
