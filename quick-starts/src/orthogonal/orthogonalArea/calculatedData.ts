import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'

import { QsAreaData } from './qsTypes'
import { AreaConfig, CalculatedData } from './types'
import { Canvas } from '../../canvas/types'

export const getCalculatedData = (
  canvas: Canvas,
  areaData: QsAreaData,
  config: AreaConfig
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
