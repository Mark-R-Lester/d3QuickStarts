import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { Canvas } from '../../d3QuickStart'
import { QsAreaData } from './qsTypes'
import { AreaConfigStrict, CalculatedData } from './types'

export const getCalculatedData = (
  canvas: Canvas,
  areaData: QsAreaData,
  config: AreaConfigStrict
) => {
  const { displayAreaWidth } = canvas.config
  const { yDataScale, genralPercentScale } = canvas.scales
  const {
    higherData,
    lowerData,
    fillColor,
    fillOpacity,
    strokeOpacity,
    strokeColor,
    strokeWidth,
  } = areaData
  const {
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
  } = config

  const xDataScale = scaleLinear()
    .domain([0, higherData.length - 1])
    .range([0, displayAreaWidth])

  const calculatedData: CalculatedData = {
    class: 'area',
    id: `area-${uuidv4()}`,
    areaData: higherData.map((d, i) => ({
      x: xDataScale(i),
      y1: yDataScale(d),
      y0: yDataScale(lowerData ? lowerData[i] : 0),
    })),
    fillColor: fillColor ?? defaultFillColor,
    fillOpacity: fillOpacity ?? defaultFillOpacity,
    strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,
    strokeColor: strokeColor ?? defaultStrokeColor,
    strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
  }
  return calculatedData
}
