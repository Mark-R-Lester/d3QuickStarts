import { LegendConfig } from './types'
import { QsLegendData } from './qsTypes'
import { Canvas } from '../canvas/canvas'

export interface CalculatedData {
  x: number
  y: number
  width: number
  height: number
  fillColor: string
  value: string
  textX: number
  textY: number
  textFontSize: number
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsLegendData[],
  config: LegendConfig
): CalculatedData[] => {
  const { xPercentScale, yPercentScaleInverted, genralPercentScale } =
    canvas.scales
  const { textFontSize, height, width, space, x, y } = config

  const invertIndex = (data: any[], index: number) => data.length - (index + 1)

  const calculatedData: CalculatedData[] = data.map((d, i) => {
    return {
      x: xPercentScale(x),
      y: yPercentScaleInverted(y + height + space * invertIndex(data, i)),
      textX: xPercentScale(x + width * 1.3),
      textY: yPercentScaleInverted(y + space * invertIndex(data, i)),
      width: xPercentScale(width),
      height: xPercentScale(height),
      fillColor: d.fillColor,
      value: d.value,
      textFontSize: genralPercentScale(textFontSize),
    }
  })

  return calculatedData
}
