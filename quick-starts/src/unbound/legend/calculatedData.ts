import { LegendConfig } from './types'
import { QsLegendData } from './qsTypes'
import { Canvas } from '../../core/canvas/canvas'

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
  const {
    xCanvasPercentScale,
    yCanvasPercentScale,
    yCanvasPercentScaleInverted,
    xCanvasPercentScaleInverted,
    genralPercentScale,
  } = canvas.scales
  const { textFontSize, height, width, space, x, y } = config

  const invertIndex = (data: any[], index: number) => data.length - (index + 1)

  const calculatedData: CalculatedData[] = data.map((d, i) => {
    return {
      x: xCanvasPercentScale(x),
      y: yCanvasPercentScaleInverted(y + height + space * invertIndex(data, i)),
      textX: xCanvasPercentScale(x + width * 1.3),
      textY: yCanvasPercentScaleInverted(y + space * invertIndex(data, i)),
      width: xCanvasPercentScale(width),
      height: xCanvasPercentScale(height),
      fillColor: d.fillColor,
      value: d.value,
      textFontSize: genralPercentScale(textFontSize),
    }
  })

  return calculatedData
}
