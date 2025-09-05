import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { CalculatedData, RadialAreaConfig } from './types'
import { Canvas } from '../../canvas/types'
import { QsRadialAreaData } from './qsTypes'

export const getCalculatedData = (
  canvas: Canvas,
  areaData: QsRadialAreaData,
  config: RadialAreaConfig
): CalculatedData => {
  const {
    x,
    y,
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
  } = config
  const {
    highValues,
    lowValues,
    fillColor,
    fillOpacity,
    strokeOpacity,
    strokeColor,
    strokeWidth,
  } = areaData
  const { lowestViewableValue } = canvas.config

  const { xPercentScale, yPercentScale, genralPercentScale, radialDataScale } =
    canvas.scales

  let dataInnerCopy: number[]

  const dataOuterCopy: number[] = highValues.slice()
  dataOuterCopy.push(highValues[0])

  const angleScale = scaleLinear()
    .domain([0, highValues.length])
    .range([0, 2 * Math.PI])

  if (lowValues) {
    dataInnerCopy = lowValues.slice()
    dataInnerCopy.push(lowValues[0])
  }
  const calculatedData: CalculatedData = {
    id: `radialArea${uuidv4()}`,
    areaData: dataOuterCopy.map((d, i) => {
      return {
        angle: angleScale(i),
        outer: radialDataScale(d),
        inner: radialDataScale(
          dataInnerCopy ? dataInnerCopy[i] : lowestViewableValue
        ),
      }
    }),
    x: xPercentScale(x),
    y: yPercentScale(y),
    fillColor: fillColor ?? defaultFillColor,
    fillOpacity: fillOpacity ?? defaultFillOpacity,
    strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,
    strokeColor: strokeColor ?? defaultStrokeColor,
    strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
  }

  return calculatedData
}
