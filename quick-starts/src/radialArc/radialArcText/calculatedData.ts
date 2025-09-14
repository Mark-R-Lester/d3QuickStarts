import { v4 as uuidv4 } from 'uuid'
import { QsCalculatedDataArcText, ArcTextConfig, TextArcData } from './types'
import { QsArcTextData } from './qsTypes'
import { Canvas } from '../../canvas/types'
import { QsEnumArcTextRadialPosition } from './qsEnums'

export const updateCalculatedData = (
  canvas: Canvas,
  data: QsArcTextData[],
  config: ArcTextConfig,
  calculatedData: QsCalculatedDataArcText
): QsCalculatedDataArcText => {
  const newCalculatedData: QsCalculatedDataArcText = getCalculatedData(
    canvas,
    data,
    config
  )

  for (let i = 0; i < calculatedData.textArcData.length; i++) {
    newCalculatedData.textArcData[i].arcId = calculatedData.textArcData[i].arcId
    newCalculatedData.textArcData[i].textId =
      calculatedData.textArcData[i].textId
    newCalculatedData.textArcData[i].endAngle =
      calculatedData.textArcData[i].endAngle
    newCalculatedData.textArcData[i].startAngle =
      calculatedData.textArcData[i].startAngle
    newCalculatedData.textArcData[i].data = calculatedData.textArcData[i].data
  }
  return newCalculatedData
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsArcTextData[],
  config: ArcTextConfig
): QsCalculatedDataArcText => {
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const {
    radius,
    x,
    y,
    radialPosition,
    defaultTextFont,
    defaultTextFontSize,
    defaultTextFontStyle,
    defaultTextFontWeight,
    defaultTextDecorationLine,
    defaultTextFill,
    defaultTextAnchor,
    defaultTextStroke,
    defaultDecimalPoints,
    defaultTextAlignmentBaseline,
  } = config

  const offsetBandData = (
    data: QsArcTextData[],
    min?: boolean
  ): TextArcData[] => {
    let totalValue = 0
    data.forEach((d) => {
      totalValue = totalValue + d.value
    })

    const radiansDividedByTotalValue = (Math.PI * 2) / totalValue
    let startAngle = 0

    return data.map((d, i) => {
      const data = d
      const index = i
      const value = d.text ? d.text : d.value
      const endAngle = startAngle + radiansDividedByTotalValue * d.value
      const res = {
        textId: `text${uuidv4()}`,
        arcId: `arc${uuidv4()}`,
        newData: data,
        data,
        index,
        value,
        newStartAngle: startAngle,
        startAngle,
        newEndAngle: endAngle,
        endAngle,
        outerRadius: min ? 0 : yPercentScale(radius / 2),
        innerRadius: min ? 0 : yPercentScale(radius / 2),
        textFont: d.textFont ?? defaultTextFont,
        textFontSize: genralPercentScale(d.textFontSize ?? defaultTextFontSize),
        textFontStyle: d.textFontStyle ?? defaultTextFontStyle,
        textFontWeight: d.textFontWeight ?? defaultTextFontWeight,
        textDecorationLine: d.textDecorationLine ?? defaultTextDecorationLine,
        textFill: d.textFill ?? defaultTextFill,
        textAnchor: d.textAnchor ?? defaultTextAnchor,
        textStroke: d.textStroke ?? defaultTextStroke,
        decimalPoints: d.decimalPoints ?? defaultDecimalPoints,
        textAlignmentBaseline:
          d.textAlignmentBaseline ?? defaultTextAlignmentBaseline,
      }
      startAngle = endAngle
      return res
    })
  }

  const centroidPointData = (data: QsArcTextData[]): TextArcData[] => {
    const anglePerElement = (2 * Math.PI) / data.length
    return offsetBandData(data).map((d, index) => {
      const startAngle = anglePerElement * index - anglePerElement / 2
      const endAngle = startAngle + anglePerElement
      return { ...d, startAngle, endAngle }
    })
  }

  const bandData = (data: QsArcTextData[]): TextArcData[] =>
    offsetBandData(data).map((d) => ({
      ...d,
      startAngle: d.startAngle - (d.endAngle - d.startAngle) / 2,
      endAngle: d.endAngle - (d.endAngle - d.startAngle) / 2,
    }))

  return {
    textArcData:
      radialPosition === QsEnumArcTextRadialPosition.BANDED
        ? bandData(data)
        : radialPosition === QsEnumArcTextRadialPosition.POINT
          ? centroidPointData(data)
          : offsetBandData(data),
    x: xPercentScale(x),
    y: yPercentScale(y),
  }
}
