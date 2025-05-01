import { scaleLinear, scaleBand, range } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { DrawArgs, TextConfigStrict } from './types'
import { v4 as uuidv4 } from 'uuid'
import { Orientation } from '../../core/enums/enums'
import { QsCoordinate } from '../../core/types/qsTypes'
import { QsTextData } from './qsTypes'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
  QsEnumScaleType,
} from '../../core/enums/qsEnums'

export interface CalculatedData {
  class: string
  id: string
  coordinate: QsCoordinate
  text?: string
  newText?: string
  value: number
  newValue: number
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAngle: number
  textAnchor: QsEnumTextAnchor
  textStroke: string
  textAlignmentBaseline: QsEnumAlignmentBaseline
}

export const updateCalculatedData = (
  canvas: Canvas,
  args: DrawArgs,
  config: TextConfigStrict,
  calculatedData: CalculatedData[]
): CalculatedData[] => {
  const newCalculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    args,
    config
  )
  for (let i = 0; i < calculatedData.length; i++) {
    newCalculatedData[i].text = calculatedData[i].text
    newCalculatedData[i].value = calculatedData[i].value
  }
  return newCalculatedData
}

export const getCalculatedData = (
  canvas: Canvas,
  args: DrawArgs,
  config: TextConfigStrict
): CalculatedData[] => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { xDataScale, yDataScale, genralPercentScale } = canvas.scales
  const { data, orientation } = args
  const isVertical = orientation === Orientation.VERTICAL
  const {
    scaleType,
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
  const isBanded = scaleType === QsEnumScaleType.BANDED

  const pointSpacing = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.length
  )

  interface CoordinateAugmented extends QsCoordinate {
    [key: string]: number | string | undefined
    value: number
    text?: string
    textFont?: QsEnumTextFont | string
    textFontSize?: number
    textFontStyle?: QsEnumTextFontStyle
    textFontWeight?: QsEnumTextFontWeight | number
    textDecorationLine?: QsEnumTextDecorationLine
    textFill?: string
    textAngle?: number
    textAnchor?: QsEnumTextAnchor
    textStroke?: string
    textAlignmentBaseline?: QsEnumAlignmentBaseline
  }

  const getCoordinates = (data: QsTextData[]): CoordinateAugmented[] =>
    data.map((d, i) => ({
      x: isVertical ? d.value : pointSpacing[i],
      y: isVertical ? pointSpacing[data.length - i - 1] : d.value,
      value: d.value,
      text: d.text,
      textFont: d.textFont,
      textFontSize: d.textFontSize,
      textFontStyle: d.textFontStyle,
      textFontWeigh: d.textFontWeight,
      textDecorationLine: d.textDecorationLine,
      textFill: d.textFill,
      textAngle: d.textAngle,
      textAnchor: d.textAnchor,
      textStroke: d.textStroke,
      textAlignmentBaseline: d.textAlignmentBaseline,
    }))

  const coordinates: CoordinateAugmented[] = getCoordinates(data)
  const dataScale = isVertical ? xDataScale : yDataScale

  let spacingScale: any
  if (isBanded) {
    spacingScale = scaleBand()
      .domain(
        isVertical
          ? coordinates.map((d) => d.y.toString())
          : coordinates.map((d) => d.x.toString())
      )
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  } else {
    spacingScale = scaleLinear()
      .domain(
        isVertical
          ? [0, Math.max(...coordinates.map((d) => d.y))]
          : [0, Math.max(...coordinates.map((d) => d.x))]
      )
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  }

  const x = (d: QsCoordinate) => {
    const space = isBanded
      ? spacingScale(d.x.toString()) + spacingScale.bandwidth() / 2
      : spacingScale(d.x)
    return isVertical ? dataScale(d.x) : space
  }
  const y = (d: QsCoordinate) => {
    const space = isBanded
      ? spacingScale(d.y.toString()) + spacingScale.bandwidth() / 2
      : spacingScale(d.y)
    return isVertical ? space : dataScale(d.y)
  }

  const calculatedData: CalculatedData[] = coordinates.map((d, i) => {
    return {
      class: 'linearText',
      id: `linearText${uuidv4()}`,
      coordinate: { x: x(d), y: y(d) },
      text: d.text,
      newText: d.text,
      value: d.value,
      newValue: d.value,
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
