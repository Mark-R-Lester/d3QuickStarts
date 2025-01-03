import { scaleLinear } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { QsRadialLineData } from './qsTypes'
import { RadialLineConfigStrict } from './types'

export interface CalculatedData {
  class: string
  id: string
  lineData: Iterable<[number, number]>
  x: number
  y: number
}

export const getCalculatedData = (
  canvas: Canvas,
  lineData: QsRadialLineData,
  config: RadialLineConfigStrict
): CalculatedData => {
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config
  const { xPercentScale, yPercentScale } = canvas.scales
  const { x, y } = config
  const { data } = lineData
  const dataCopy = data.slice()

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
    x: xPercentScale(x),
    y: yPercentScale(y),
  }
}
