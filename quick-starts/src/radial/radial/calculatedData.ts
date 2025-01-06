import { ScaleOrdinal, ScaleLinear, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { RadialConfigStrict } from './types'
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
  index?: number
  value?: number
}

export const updateCalculatedData = (
  canvas: Canvas,
  data: QsRadialData[],
  config: RadialConfigStrict,
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
  config: RadialConfigStrict
): CalculatedData[] => {
  const { xPercentScale, yPercentScale } = canvas.scales
  const {
    defaultColor,
    colorScaleData,
    outerRadius,
    innerRadius,
    cornerRadius,
    isPieDiagram,
    x,
    y,
  } = config
  let { padAngle } = config

  const calculatedData: CalculatedData[] = []

  let totalValue = 0
  data.forEach((d) => {
    totalValue = totalValue + d.value
  })
  if (data.length < 2) padAngle = 0

  let colorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (colorScaleData) colorScale = getColorScale(colorScaleData)

  const radiansDividedByTotalValue = (Math.PI * 2) / totalValue
  let startAngle = 0

  data.forEach((d, i) => {
    const endAngle = startAngle + radiansDividedByTotalValue * d.value
    startAngle = startAngle + padAngle / 2

    const scaledColor: string | unknown | undefined = getScaledColor(
      d.value,
      colorScale
    )

    calculatedData.push({
      class: `arc`,
      id: `arc${uuidv4()}`,

      arcData: {
        data: d.value,
        fillColor: getPrecidendedColor(d.fillColor, defaultColor, scaledColor),
        index: i,
        value: d.value,
        cornerRadius: yPercentScale(cornerRadius / 2),
        outerRadius: yPercentScale(outerRadius / 2),
        innerRadius: yPercentScale(isPieDiagram ? 0 : innerRadius / 2),
        startAngle,
        newStartAngle: startAngle,
        endAngle,
        newEndAngle: endAngle,
      },
      x: xPercentScale(x),
      y: yPercentScale(y),
    })
    startAngle = endAngle
  })
  return calculatedData
}
