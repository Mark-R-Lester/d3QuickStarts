import { Canvas } from '../../canvas/orthogonal/canvasOrthogonal'
import { TextData } from '../../core/types/types'
import { QsCoordinate } from '../../d3QuickStart'
import { QsUnboundTextData } from './qsTypes'
import { UnboundTextConfig } from './types'

export interface CalculatedData extends TextData {
  text?: string
  newText?: string
  coordinate: QsCoordinate
  newCoordinate: QsCoordinate
  defaultDecimalPoints: number
}

export const updateCalculatedData = (
  canvas: Canvas,
  data: QsUnboundTextData[],
  config: UnboundTextConfig,
  calculatedData: CalculatedData[]
): CalculatedData[] => {
  const newCalculatedData: CalculatedData[] = getCalculatedData(
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
): CalculatedData[] => {
  const {
    xCanvasPercentScale,
    yCanvasPercentScaleInverted,
    genralPercentScale,
  } = canvas.scales
  const {
    defaultDecimalPoints,
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

  const calculatedData: CalculatedData[] = data.map((d) => ({
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
    defaultDecimalPoints,
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
