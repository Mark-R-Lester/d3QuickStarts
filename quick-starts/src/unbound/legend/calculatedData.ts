import { LegendConfig } from './types'
import { QsLegendData } from './qsTypes'
import { Canvas } from '../../canvas/orthogonal/canvasOrthogonal'
import { TextData } from '../../core/types/types'

export interface CalculatedData extends TextData {
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
    height,
    width,
    verticalSpacing,
    relativeTextX,
    relativeTextY,
    x,
    y,
    defaultTextFont,
    defaultTextFontSize,
    defaultTextFontStyle,
    defaultTextFontWeight,
    defaultTextDecorationLine,
    defaultTextFill,
    defaultTextAngle,
    defaultTextAnchor,
    defaultTextStroke,
    defaultTextAlignmentBaseline,
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
      textFont: d.textFont ?? defaultTextFont,
      textFontSize: genralPercentScale(d.textFontSize ?? defaultTextFontSize),
      textFontStyle: d.textFontStyle ?? defaultTextFontStyle,
      textFontWeight: d.textFontWeight ?? defaultTextFontWeight,
      textDecorationLine: d.textDecorationLine ?? defaultTextDecorationLine,
      textFill: d.textFill ?? defaultTextFill,
      textAngle: d.textAngle ?? defaultTextAngle,
      textAnchor: d.textAnchor ?? defaultTextAnchor,
      textStroke: d.textStroke ?? defaultTextStroke,
      textAlignmentBaseline:
        d.textAlignmentBaseline ?? defaultTextAlignmentBaseline,
    }
  })
  return calculatedData
}
