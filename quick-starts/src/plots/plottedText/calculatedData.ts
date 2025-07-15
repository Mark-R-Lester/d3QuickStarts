import { Canvas } from '../../core/canvas/canvas'
import { TextData } from '../../core/types/types'
import { QsCoordinate } from '../../d3QuickStart'
import { QsPlottedTextData } from './qsTypes'
import { PlottedTextConfig } from './types'

export interface CalculatedData extends TextData {
  text?: string
  newText?: string
  coordinate: QsCoordinate
  viewableCoordinate: QsCoordinate
  newViewableCoordinate: QsCoordinate
  defaultDecimalPoints: number
}

export const updateCalculatedData = (
  canvas: Canvas,
  data: QsPlottedTextData[],
  config: PlottedTextConfig,
  calculatedData: CalculatedData[]
): CalculatedData[] => {
  const newCalculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )
  for (let i = 0; i < calculatedData.length; i++) {
    newCalculatedData[i].text = calculatedData[i].text
    newCalculatedData[i].viewableCoordinate =
      calculatedData[i].viewableCoordinate
  }
  return newCalculatedData
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsPlottedTextData[],
  config: PlottedTextConfig
): CalculatedData[] => {
  const { xDataScalePlotted, yDataScalePlotted, genralPercentScale } =
    canvas.scales
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
    coordinate: { x: xDataScalePlotted(d.x), y: yDataScalePlotted(d.y) },
    viewableCoordinate: { x: d.x, y: d.y },
    newViewableCoordinate: { x: d.x, y: d.y },
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
