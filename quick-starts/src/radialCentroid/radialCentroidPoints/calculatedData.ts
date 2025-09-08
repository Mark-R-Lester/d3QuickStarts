import { scaleLinear, ScaleOrdinal, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { QsCalculatedDataCentroidPoints, RadialPointsConfig } from './types'
import {
  findOrdinalValue,
  getColorScale,
  getPrecidendedColor,
  getScaledColor,
} from '../../core/color/color'
import { QsRadialPointData } from './qsTypes'
import { QsCoordinate } from '../../core/types/qsTypes'
import { Canvas } from '../../canvas/types'
import { QsEnumColorScale } from '../../core/enums/qsEnums'

export const getCalculatedData = (
  canvas: Canvas,
  data: QsRadialPointData[],
  config: RadialPointsConfig
): QsCalculatedDataCentroidPoints[] => {
  const { genralPercentScale, xPercentScale, yPercentScale, radialDataScale } =
    canvas.scales
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

  const calculatedData: QsCalculatedDataCentroidPoints[] = []
  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])

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
    const hypotenuse = radialDataScale(d.value)
    const coordinate: QsCoordinate = {
      x: Math.sin(radians) * hypotenuse,
      y: Math.cos(radians) * hypotenuse * -1,
    }

    const scaledFillColor: string | unknown | undefined = getScaledColor(
      fillColorScaleData?.type === QsEnumColorScale.ORDINAL
        ? findOrdinalValue(i, fillColorScaleData)
        : d.value,
      fillColorScale
    )
    const scaledStrokeColor: string | unknown | undefined = getScaledColor(
      fillColorScaleData?.type === QsEnumColorScale.ORDINAL
        ? findOrdinalValue(i, fillColorScaleData)
        : d.value,
      strokeColorScale
    )

    calculatedData.push({
      id: `radialPoint${uuidv4()}`,
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
