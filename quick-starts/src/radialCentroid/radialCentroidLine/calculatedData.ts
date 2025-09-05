import { scaleLinear } from 'd3'
import { Canvas } from '../../canvas/types'
import { QsRadialLineData } from './qsTypes'
import { RadialLineConfig } from './types'
import { GlobalDefaultSettings } from '../../core/enums/enums'

export interface CalculatedData {
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
  const { xPercentScale, yPercentScale, genralPercentScale, radialDataScale } =
    canvas.scales
  const { x, y, defaultStrokeColor, defaultStrokeWidth, defaultStrokeOpacity } =
    config
  const { values, strokeOpacity, strokeColor, strokeWidth } = lineData

  const angleScale = scaleLinear()
    .domain([0, values.length])
    .range([0, 2 * Math.PI])

  const valuesCopy = values.slice()
  valuesCopy.push(values[0])
  return {
    id: 'radialLine',
    lineData: valuesCopy.map((d, i) => [angleScale(i), radialDataScale(d)]),
    x: xPercentScale(x),
    y: yPercentScale(y),
    strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,
    strokeColor: strokeColor ?? defaultStrokeColor,
    strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
  }
}
