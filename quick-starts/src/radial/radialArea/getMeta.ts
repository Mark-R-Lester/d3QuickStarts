import { Canvas } from '../../canvas/canvas'
import { ScaleLinear, scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { RadialAreaData } from './types'

export interface Meta {
  class: string
  id: string
  areaData: RadialAreaData[]
  xAxis: ScaleLinear<number, number, never>
  yAxis: ScaleLinear<number, number, never>
}

export const getMeta = (
  canvas: Canvas,
  dataOuter: number[],
  dataInner?: number[]
): Meta => {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaHeight,
    displayAreaWidth,
  } = canvas.config

  let dataInnerCopy: number[]
  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const dataOuterCopy: number[] = dataOuter.slice()
  dataOuterCopy.push(dataOuter[0])

  const angleScale = scaleLinear()
    .domain([0, dataOuter.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])

  if (dataInner) {
    dataInnerCopy = dataInner.slice()
    dataInnerCopy.push(dataInner[0])
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
    xAxis,
    yAxis,
  }
}
