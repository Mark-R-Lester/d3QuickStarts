import { v4 as uuidv4 } from 'uuid'
import { RadialArcTextConfig } from './types'
import { QsValuedText } from './qsTypes'
import { Canvas } from '../../canvas/orthogonal/canvasOrthogonal'
import { QsEnumScaleType } from '../../core/enums/qsEnums'

export interface CalculatedData {
  arcClass: string
  textClass: string
  textArcData: TextArcData[]
  x: number
  y: number
  textFontSize: number
}

export interface TextArcData {
  textId: string
  textClass: string
  arcId: string
  arcClass: string
  newData: QsValuedText
  data: QsValuedText
  index: number
  value: string | number
  newStartAngle: number
  startAngle: number
  newEndAngle: number
  endAngle: number
  outerRadius: number
  innerRadius: number
}

export const updateCalculatedData = (
  canvas: Canvas,
  data: QsValuedText[],
  config: RadialArcTextConfig,
  calculatedData: CalculatedData
): CalculatedData => {
  const newCalculatedData: CalculatedData = getCalculatedData(
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
  data: QsValuedText[],
  config: RadialArcTextConfig
): CalculatedData => {
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const { radius, x, y, textFontSize, scaleType } = config

  const bandData = (data: QsValuedText[], min?: boolean): TextArcData[] => {
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
        textClass: `text`,
        arcId: `arc${uuidv4()}`,
        arcClass: `arc`,
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
      }
      startAngle = endAngle
      return res
    })
  }
  const pointData = (data: QsValuedText[], min?: boolean): TextArcData[] =>
    bandData(data, min).map((d) => {
      const offSet = (d.endAngle - d.startAngle) / 2
      d.startAngle = d.startAngle - offSet
      d.endAngle = d.endAngle - offSet
      return d
    })

  return {
    arcClass: 'arc',
    textClass: 'text',
    textArcData:
      scaleType === QsEnumScaleType.BANDED ? bandData(data) : pointData(data),
    x: xPercentScale(x),
    y: yPercentScale(y),
    textFontSize: genralPercentScale(textFontSize),
  }
}
