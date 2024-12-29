import { QsCanvas } from '../../canvas/canvas'
import { scaleLinear, ScaleLinear } from 'd3'
import { QsRadialLineData } from './types'

export interface Meta {
  class: string
  id: string
  lineData: Iterable<[number, number]>
  xAxis: ScaleLinear<number, number, never>
  yAxis: ScaleLinear<number, number, never>
}

export const getMeta = (canvas: QsCanvas, lineData: QsRadialLineData): Meta => {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaHeight,
    displayAreaWidth,
  } = canvas.config
  const { data } = lineData

  const dataCopy = data.slice()

  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])

  dataCopy.push(data[0])
  return {
    class: 'radialLine',
    id: 'radialLine',
    lineData: dataCopy.map((d, i) => [angleScale(i), radialScale(d)]),
    xAxis,
    yAxis,
  }
}
