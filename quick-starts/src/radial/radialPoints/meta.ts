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

export interface Meta {
  id: string
  class: string
  coordinate: QsCoordinate
  color: string
  x: number
  y: number
  pointRadius: number
}

export const getMeta = (
  canvas: Canvas,
  data: QsRadialPointData[],
  config: RadialPointsConfigStrict
): Meta[] => {
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config
  const { genralPercentScale, xPercentScale, yPercentScale } = canvas.scales
  const { colorScaleData, defaultColor, x, y, pointRadius } = config

  const meta: Meta[] = []
  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])

  let colorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (colorScaleData) colorScale = getColorScale(colorScaleData)

  data.forEach((d, i) => {
    const radians = angleScale(i)
    const hypotenuse = radialScale(d.value)
    const coordinate: QsCoordinate = {
      x: Math.sin(radians) * hypotenuse,
      y: Math.cos(radians) * hypotenuse * -1,
    }

    const scaledColor: string | unknown | undefined = getScaledColor(
      d.value,
      colorScale
    )

    meta.push({
      id: `radialPoint${uuidv4()}`,
      class: 'radialPoint',
      coordinate,
      color: getPrecidendedColor(d.color, defaultColor, scaledColor),
      x: xPercentScale(x),
      y: yPercentScale(y),
      pointRadius: genralPercentScale(pointRadius),
    })
  })
  return meta
}
