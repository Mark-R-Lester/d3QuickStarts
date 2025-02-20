import { scaleLinear, ScaleOrdinal, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { RadialPointsConfigStrict } from './types'
import {
  getColorScale,
  getPrecidendedColor,
  getScaledColor,
} from '../../core/color/color'
import { Canvas, QsCoordinate } from '../../d3QuickStart'
import { QsRadialPointData } from './qsTypes'

export interface CalculatedData {
  id: string
  class: string
  coordinate: QsCoordinate
  x: number
  y: number
  radius: number
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsRadialPointData[],
  config: RadialPointsConfigStrict
): CalculatedData[] => {
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config
  const { genralPercentScale, xPercentScale, yPercentScale } = canvas.scales
  const {
    x,
    y,
    defaultRadius,
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
    fillColorScaleData,
    strokeColorScaleData,
  } = config

  const calculatedData: CalculatedData[] = []
  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])

  let fillColorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (fillColorScaleData) fillColorScale = getColorScale(fillColorScaleData)

  let strokeColorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (strokeColorScaleData)
    strokeColorScale = getColorScale(strokeColorScaleData)

  data.forEach((d, i) => {
    const radians = angleScale(i)
    const hypotenuse = radialScale(d.value)
    const coordinate: QsCoordinate = {
      x: Math.sin(radians) * hypotenuse,
      y: Math.cos(radians) * hypotenuse * -1,
    }

    const scaledFillColor: string | unknown | undefined = getScaledColor(
      d.value,
      fillColorScale
    )

    const scaledStrokeColor: string | unknown | undefined = getScaledColor(
      d.value,
      strokeColorScale
    )

    calculatedData.push({
      id: `radialPoint${uuidv4()}`,
      class: 'radialPoint',
      coordinate,
      fillColor: getPrecidendedColor(
        d.fillColor,
        defaultFillColor,
        scaledFillColor
      ),
      strokeColor: getPrecidendedColor(
        d.strokeColor,
        defaultStrokeColor,
        scaledStrokeColor
      ),
      x: xPercentScale(x),
      y: yPercentScale(y),
      radius: genralPercentScale(d.radius ?? defaultRadius),
      fillOpacity: d.fillOpacity ?? defaultFillOpacity,
      strokeWidth: genralPercentScale(d.strokeWidth ?? defaultStrokeWidth),
      strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
    })
  })
  return calculatedData
}
