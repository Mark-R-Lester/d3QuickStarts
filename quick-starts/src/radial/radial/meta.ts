import { QsCanvas } from '../../canvas/canvas'
import { scaleLinear, scaleOrdinal, ScaleOrdinal, ScaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'

import { toStrings } from '../../core/conversion'
import { QsColorName, QsDomainName } from '../../core/types/qsTypes'
import { QsRadialArgs, RadialConfigStrict } from './types'

export interface Meta {
  class: string
  id: string
  arcData: ArcData
  xAxis: ScaleLinear<number, number, never>
  yAxis: ScaleLinear<number, number, never>
}

export interface ArcData {
  data: number
  cornerRadius: number
  outerRadius: number
  innerRadius: number
  newStartAngle: number
  startAngle: number
  newEndAngle: number
  endAngle: number
  color: string
  index?: number
  value?: number
}

const getColor = (
  color: QsColorName | QsDomainName | undefined,
  i: number,
  colorScale: ScaleOrdinal<string, unknown, never>
): string => {
  if (color?.colorName) return color.colorName

  let c: string | unknown = color?.domainName
    ? colorScale(color.domainName)
    : colorScale(i.toString())
  //TODO if c is not a string throw.
  return typeof c == 'string' ? c : '#cbc9e2'
}

export const updateMeta = (
  canvas: QsCanvas,
  data: QsRadialArgs[],
  config: RadialConfigStrict,
  meta: Meta[]
): Meta[] => {
  const newMeta: Meta[] = getMeta(canvas, data, config)

  for (let i = 0; i < meta.length; i++) {
    newMeta[i].id = meta[i].id
    newMeta[i].arcData.endAngle = meta[i].arcData.endAngle
    newMeta[i].arcData.startAngle = meta[i].arcData.startAngle
  }
  return newMeta
}

export const getMeta = (
  canvas: QsCanvas,
  data: QsRadialArgs[],
  config: RadialConfigStrict
): Meta[] => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const {
    colorDomain,
    colorRange,
    outerRadius,
    innerRadius,
    cornerRadius,
    isPieDiagram,
  } = config
  let { padAngle } = config

  const meta: Meta[] = []

  const colors: ScaleOrdinal<string, unknown, never> = scaleOrdinal()
    .domain(toStrings(colorDomain))
    .range(colorRange)

  const xAxis: ScaleLinear<number, number, never> = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaWidth])
  const yAxis: ScaleLinear<number, number, never> = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaHeight])

  let totalValue = 0
  data.forEach((d) => {
    totalValue = totalValue + d.value
  })
  if (data.length < 2) padAngle = 0

  const radiansDividedByTotalValue = (Math.PI * 2) / totalValue
  let startAngle = 0

  data.forEach((d, i) => {
    const endAngle =
      startAngle + radiansDividedByTotalValue * d.value - padAngle / 2
    startAngle = startAngle + padAngle / 2
    meta.push({
      class: `arc`,
      id: `arc${uuidv4()}`,
      arcData: {
        data: d.value,
        color: getColor(d.color, i, colors),
        index: i,
        value: d.value,
        cornerRadius: yAxis(cornerRadius / 2),
        outerRadius: yAxis(outerRadius / 2),
        innerRadius: yAxis(isPieDiagram ? 0 : innerRadius / 2),
        startAngle,
        newStartAngle: startAngle,
        endAngle,
        newEndAngle: endAngle,
      },
      xAxis: xAxis,
      yAxis: yAxis,
    })
    startAngle = endAngle
  })
  return meta
}
