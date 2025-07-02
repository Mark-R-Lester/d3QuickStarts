import { ScaleOrdinal, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { RadialArcConfig } from './types'
import {
  findOrdinalValue,
  getColorScale,
  getPrecidendedColor,
  getScaledColor,
} from '../../core/color/color'

import { QsRadialData } from './qsTypes'
import { Canvas } from '../../core/canvas/canvas'
import { QsEnumColorScale } from '../../core/enums/qsEnums'

export interface CalculatedData {
  id: string
  arcData: ArcData
  x: number
  y: number
}

export interface ArcData {
  data: number
  cornerRadius: number
  outerRadius: number
  innerRadius: number
  newStartAngle: number
  startAngle: number
  newEndAngle: number
  endAngle: number
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
  strokeOpacity: number
  index?: number
  value?: number
  padding: number
}

export const updateCalculatedData = (
  canvas: Canvas,
  data: QsRadialData[],
  config: RadialArcConfig,
  calculatedData: CalculatedData[]
): CalculatedData[] => {
  const newCalculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  for (let i = 0; i < calculatedData.length; i++) {
    newCalculatedData[i].id = calculatedData[i].id
    newCalculatedData[i].arcData.endAngle = calculatedData[i].arcData.endAngle
    newCalculatedData[i].arcData.startAngle =
      calculatedData[i].arcData.startAngle
  }
  return newCalculatedData
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsRadialData[],
  config: RadialArcConfig
): CalculatedData[] => {
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const {
    outerRadius,
    innerRadius,
    cornerRadius,
    isPieDiagram,
    x,
    y,
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
    fillColorScaleData,
    strokeColorScaleData,
  } = config

  let padding = genralPercentScale(config.padding)

  const calculatedData: CalculatedData[] = []

  let totalValue = 0
  data.forEach((d) => {
    totalValue = totalValue + d.value
  })

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

  const radiansDividedByTotalValue = (Math.PI * 2) / totalValue
  let startAngle = 0

  data.forEach((d, i) => {
    const endAngle = startAngle + radiansDividedByTotalValue * d.value

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
      id: `arc${uuidv4()}`,
      x: xPercentScale(x),
      y: yPercentScale(y),

      arcData: {
        data: d.value,
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
        index: i,
        value: d.value,
        cornerRadius: yPercentScale(cornerRadius / 2),
        outerRadius: yPercentScale(outerRadius / 2),
        innerRadius: yPercentScale(isPieDiagram ? 0 : innerRadius / 2),
        startAngle,
        newStartAngle: startAngle,
        endAngle,
        padding,
        newEndAngle: endAngle,
        fillOpacity: d.fillOpacity ?? defaultFillOpacity,
        strokeWidth: genralPercentScale(d.strokeWidth ?? defaultStrokeWidth),
        strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
      },
    })
    startAngle = endAngle
  })
  return calculatedData
}
