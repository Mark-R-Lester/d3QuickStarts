import { Canvas } from '../../canvas/types'

import { QsCalculatedDataUnboundText, QsUnboundTextData } from './qsTypes'
import { UnboundTextConfig } from './types'

export const updateCalculatedData = (
  canvas: Canvas,
  data: QsUnboundTextData[],
  config: UnboundTextConfig,
  calculatedData: QsCalculatedDataUnboundText[]
): QsCalculatedDataUnboundText[] => {
  const newCalculatedData: QsCalculatedDataUnboundText[] = getCalculatedData(
    canvas,
    data,
    config
  )
  for (let i = 0; i < calculatedData.length; i++) {
    newCalculatedData[i].text = calculatedData[i].text
    newCalculatedData[i].coordinate = calculatedData[i].coordinate
  }
  return newCalculatedData
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsUnboundTextData[],
  config: UnboundTextConfig
): QsCalculatedDataUnboundText[] => {
  const {
    xCanvasPercentScale,
    yCanvasPercentScaleInverted,
    genralPercentScale,
  } = canvas.scales
  const {
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

  const calculatedData: QsCalculatedDataUnboundText[] = data.map((d) => ({
    text: d.text,
    newText: d.text,
    coordinate: {
      x: xCanvasPercentScale(d.x),
      y: yCanvasPercentScaleInverted(d.y),
    },
    newCoordinate: {
      x: xCanvasPercentScale(d.x),
      y: yCanvasPercentScaleInverted(d.y),
    },
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
  }))

  return calculatedData
}
