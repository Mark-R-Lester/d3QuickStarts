import { scaleLinear } from 'd3'
import { Canvas } from '../../canvas/canvas'
import { QsRadialLineData } from './qsTypes'
import { RadialLineConfig } from './types'
import { GlobalDefaultSettings } from '../../core/enums/enums'

export interface CalculatedData {
  class: string
  id: string
  lineData: Iterable<[number, number]>
  x: number
  y: number
  strokeOpacity: number
  strokeColor: string
  strokeWidth: number
}

export const getCalculatedData = (
  canvas: Canvas,
  lineData: QsRadialLineData,
  config: RadialLineConfig
): CalculatedData => {
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const { x, y, defaultStrokeColor, defaultStrokeWidth, defaultStrokeOpacity } =
    config
  const { data, strokeOpacity, strokeColor, strokeWidth } = lineData
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
    strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,
    strokeColor: strokeColor ?? defaultStrokeColor,
    strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
  }
}
