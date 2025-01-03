import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { RadialAreaConfigStrict, RadialAreaCalculatedDataData } from './types'
import { Canvas } from '../../d3QuickStart'

export interface CalculatedData {
  class: string
  id: string
  areaData: RadialAreaCalculatedDataData[]
  x: number
  y: number
}

export const getCalculatedData = (
  canvas: Canvas,
  outerData: number[],
  config: RadialAreaConfigStrict,
  innerData?: number[]
): CalculatedData => {
  const { x, y } = config
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config

  const { xPercentScale, yPercentScale } = canvas.scales

  let dataInnerCopy: number[]

  const dataOuterCopy: number[] = outerData.slice()
  dataOuterCopy.push(outerData[0])

  const angleScale = scaleLinear()
    .domain([0, outerData.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])

  if (innerData) {
    dataInnerCopy = innerData.slice()
    dataInnerCopy.push(innerData[0])
  }
  return {
    class: 'radialArea',
    id: `radialArea${uuidv4()}`,
    areaData: dataOuterCopy.map((d, i) => {
      return {
        angle: angleScale(i),
        outer: radialScale(d),
        inner: radialScale(
          dataInnerCopy ? dataInnerCopy[i] : lowestViewableValue
        ),
      }
    }),
    x: xPercentScale(x),
    y: yPercentScale(y),
  }
}
