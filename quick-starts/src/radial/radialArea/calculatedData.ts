import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { CalculatedData, RadialAreaConfigStrict } from './types'
import { Canvas, QsRadialAreaData } from '../../d3QuickStart'

export const getCalculatedData = (
  canvas: Canvas,
  areaData: QsRadialAreaData,
  config: RadialAreaConfigStrict
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
    outerData,
    innerData,
    fillColor,
    fillOpacity,
    strokeOpacity,
    strokeColor,
    strokeWidth,
  } = areaData
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config

  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales

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
    fillColor: fillColor === undefined ? defaultFillColor : fillColor,
    fillOpacity: fillOpacity === undefined ? defaultFillOpacity : fillOpacity,
    strokeOpacity:
      strokeOpacity === undefined ? defaultStrokeOpacity : strokeOpacity,
    strokeColor: strokeColor === undefined ? defaultStrokeColor : strokeColor,
    strokeWidth: genralPercentScale(
      strokeWidth === undefined ? defaultStrokeWidth : strokeWidth
    ),
  }
}
