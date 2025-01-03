import { v4 as uuidv4 } from 'uuid'
import { RadialTextConfigStrict } from './types'
import { ScaleType } from '../../core/enums/enums'
import { Canvas } from '../../d3QuickStart'
import { QsValuedText } from './qsTypes'

export interface Meta {
  arcClass: string
  textClass: string
  textArcData: BandData[]
  x: number
  y: number
  textFontSize: number
}

export interface BandData {
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

export const updateMeta = (
  canvas: Canvas,
  data: QsValuedText[],
  config: RadialTextConfigStrict,
  scaleType: ScaleType,
  meta: Meta
): Meta => {
  const newMeta: Meta = getMeta(canvas, data, config, scaleType)

  for (let i = 0; i < meta.textArcData.length; i++) {
    newMeta.textArcData[i].arcId = meta.textArcData[i].arcId
    newMeta.textArcData[i].textId = meta.textArcData[i].textId
    newMeta.textArcData[i].endAngle = meta.textArcData[i].endAngle
    newMeta.textArcData[i].startAngle = meta.textArcData[i].startAngle
    newMeta.textArcData[i].data = meta.textArcData[i].data
  }
  return newMeta
}

export const getMeta = (
  canvas: Canvas,
  data: QsValuedText[],
  config: RadialTextConfigStrict,
  scaleType: ScaleType
): Meta => {
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const { radius, x, y, textFontSize } = config

  const bandData = (data: QsValuedText[], min?: boolean): BandData[] => {
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
  const pointData = (data: QsValuedText[], min?: boolean): BandData[] =>
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
      scaleType === ScaleType.BANDED ? bandData(data) : pointData(data),
    x: xPercentScale(x),
    y: yPercentScale(y),
    textFontSize: genralPercentScale(textFontSize),
  }
}
