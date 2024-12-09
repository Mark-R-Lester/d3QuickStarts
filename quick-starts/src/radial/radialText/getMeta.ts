import { Canvas } from '../../canvas/canvas'
import { scaleLinear, ScaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { QsValuedText, RadialTextConfigStrict } from './types'
import { ScaleType } from '../../core/enums'

export interface Meta {
  arcClass: string
  textClass: string
  textArcData: BandData[]
  xAxis: ScaleLinear<number, number, never>
  yAxis: ScaleLinear<number, number, never>
}

export interface BandData {
  textId: string
  textClass: string
  arcId: string
  arcClass: string
  data: QsValuedText
  index: number
  value: string | number
  startAngle: number
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
  }
  return newMeta
}

export const getMeta = (
  canvas: Canvas,
  data: QsValuedText[],
  config: RadialTextConfigStrict,
  scaleType: ScaleType
): Meta => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const { radius } = config

  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

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
        data,
        index,
        value,
        startAngle,
        endAngle,
        outerRadius: min ? 0 : yAxis(radius / 2),
        innerRadius: min ? 0 : yAxis(radius / 2),
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
    xAxis,
    yAxis,
  }
}
