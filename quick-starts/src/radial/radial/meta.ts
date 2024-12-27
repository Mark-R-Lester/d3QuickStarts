import { QsCanvas } from '../../canvas/canvas'
import {
  scaleLinear,
  scaleOrdinal,
  ScaleOrdinal,
  ScaleLinear,
  interpolateRgbBasis,
  ScaleSequential,
  scaleSequential,
} from 'd3'
import { v4 as uuidv4 } from 'uuid'

import { toStrings } from '../../core/conversion'
import { QsRadialData, RadialConfigStrict } from './types'
import { QsEnumColorScale } from '../../core/enums/qsEnums'
import { getPrecidendedColor, getScaledColor } from '../../core/color/getColor'

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

export const updateMeta = (
  canvas: QsCanvas,
  data: QsRadialData[],
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
  data: QsRadialData[],
  config: RadialConfigStrict
): Meta[] => {
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const {
    defaultColor,
    colorScale,
    outerRadius,
    innerRadius,
    cornerRadius,
    isPieDiagram,
  } = config
  let { padAngle } = config

  const meta: Meta[] = []

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

  let sequentialColorScale: ScaleSequential<string, never> | undefined
  let ordinalColorScale: any | undefined

  const createSequentialColorScale = ():
    | ScaleSequential<string, never>
    | undefined => {
    if (colorScale) {
      return scaleSequential(
        colorScale.domain,
        interpolateRgbBasis(colorScale.range)
      )
    }
  }

  const createOridinalColorScale = ():
    | ScaleOrdinal<string, unknown, never>
    | undefined => {
    if (colorScale)
      return scaleOrdinal()
        .domain(toStrings(colorScale.domain))
        .range(colorScale.range)
  }

  if (colorScale && colorScale.type === QsEnumColorScale.SEQUENTIAL)
    sequentialColorScale = createSequentialColorScale()
  else ordinalColorScale = createOridinalColorScale()

  data.forEach((d, i) => {
    const endAngle =
      startAngle + radiansDividedByTotalValue * d.value - padAngle / 2
    startAngle = startAngle + padAngle / 2

    const scaledColor: string | unknown | undefined = getScaledColor(
      d.value,
      sequentialColorScale,
      ordinalColorScale
    )
    meta.push({
      class: `arc`,
      id: `arc${uuidv4()}`,
      arcData: {
        data: d.value,
        color: getPrecidendedColor(d.color, defaultColor, scaledColor),
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
