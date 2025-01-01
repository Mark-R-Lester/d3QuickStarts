import { scaleLinear, ScaleOrdinal, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { QsRadialPointData, RadialPointsConfigStrict } from './types'
import {
  getColorScale,
  getPrecidendedColor,
  getScaledColor,
} from '../../core/color/color'
import { Canvas } from '../../d3QuickStart'

export interface Meta {
  id: string
  class: string
  pointData: number[]
  color: string
}

export const getMeta = (
  canvas: Canvas,
  data: QsRadialPointData[],
  config: RadialPointsConfigStrict
): Meta[] => {
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config
  const { colorScaleData, defaultColor } = config

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
    const x = Math.sin(radians) * hypotenuse
    const y = Math.cos(radians) * hypotenuse * -1
    const scaledColor: string | unknown | undefined = getScaledColor(
      d.value,
      colorScale
    )

    meta.push({
      id: `radialPoint${uuidv4()}`,
      class: 'radialPoint',
      pointData: [x, y],
      color: getPrecidendedColor(d.color, defaultColor, scaledColor),
    })
  })
  return meta
}
