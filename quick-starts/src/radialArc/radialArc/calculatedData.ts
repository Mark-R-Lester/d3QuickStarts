import { ScaleOrdinal, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { RadialArcConfigStrict } from './types'
import {
  getColorScale,
  getPrecidendedColor,
  getScaledColor,
} from '../../core/color/color'
import { Canvas } from '../../d3QuickStart'
import { QsRadialData } from './qsTypes'

export interface CalculatedData {
  class: string
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
}

export const updateCalculatedData = (
  canvas: Canvas,
  data: QsRadialData[],
  config: RadialArcConfigStrict,
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
  config: RadialArcConfigStrict
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
  let { padAngle } = config

  const calculatedData: CalculatedData[] = []

  let totalValue = 0
  data.forEach((d) => {
    totalValue = totalValue + d.value
  })
  if (data.length < 2) padAngle = 0

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
    startAngle = startAngle + padAngle / 2

    const scaledFillColor: string | unknown | undefined = getScaledColor(
      d.value,
      fillColorScale
    )

    const scaledStrokeColor: string | unknown | undefined = getScaledColor(
      d.value,
      strokeColorScale
    )

    calculatedData.push({
      class: `arc`,
      id: `arc${uuidv4()}`,

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
        newEndAngle: endAngle,
        fillOpacity: d.fillOpacity ?? defaultFillOpacity,
        strokeWidth: genralPercentScale(d.strokeWidth ?? defaultStrokeWidth),
        strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
      },
      x: xPercentScale(x),
      y: yPercentScale(y),
    })
    startAngle = endAngle
  })
  return calculatedData
}
