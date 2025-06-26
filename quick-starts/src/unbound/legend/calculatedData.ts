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
    yCanvasPercentScaleInverted,
    genralPercentScale,
  } = canvas.scales
  const {
    textFontSize,
    height,
    width,
    verticalSpacing,
    relativeTextX,
    relativeTextY,
    x,
    y,
  } = config

  const invertIndex = (data: any[], index: number) => data.length - (index + 1)

  const calculatedData: CalculatedData[] = data.map((d, i) => {
    return {
      x: xCanvasPercentScale(x),
      y: yCanvasPercentScaleInverted(
        y + verticalSpacing * invertIndex(data, i)
      ),
      width: genralPercentScale(width),
      height: genralPercentScale(height),
      textX: xCanvasPercentScale(x) + genralPercentScale(relativeTextX),
      textY:
        yCanvasPercentScaleInverted(
          y + verticalSpacing * invertIndex(data, i)
        ) +
        genralPercentScale(height) / 2 -
        genralPercentScale(relativeTextY),
      fillColor: d.fillColor,
      value: d.value,
      textFontSize: genralPercentScale(textFontSize),
    }
  })
  return calculatedData
}
