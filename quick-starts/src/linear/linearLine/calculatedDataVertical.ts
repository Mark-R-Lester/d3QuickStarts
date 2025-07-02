import { scaleLinear, scaleBand, range, line as d3line } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { DrawArgs, LineConfig, CalculatedData } from './types'
import { QsCoordinate } from '../../core/types/qsTypes'
import { constantsCurves } from '../../core/constants/constants'
import { Canvas } from '../../core/canvas/canvas'
import { QsEnumScaleType } from '../../core/enums/qsEnums'

export const getCalculatedData = (
  canvas: Canvas,
  args: DrawArgs,
  config: LineConfig
): CalculatedData => {
  const { displayAreaHeight } = canvas.config
  const { xDataScale, genralPercentScale } = canvas.scales
  const { data } = args
  const { strokeOpacity, strokeColor, strokeWidth } = data
  const {
    scaleType,
    curve,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
  } = config

  const yVals: number[] = range(
    0,
    displayAreaHeight,
    displayAreaHeight / data.data.length
  )

  const coordinates: QsCoordinate[] = []
  const lineData: [number, number][] = []

  data.data.forEach((d, i) => {
    coordinates.push({ x: d, y: yVals[i] })
    lineData.push([d, yVals[i]])
  })

  let spacingScale: any
  let bandingAdjustment: number

  if (scaleType === QsEnumScaleType.BANDED) {
    spacingScale = scaleBand()
      .domain(coordinates.map((coordinate) => coordinate.y.toString()))
      .range([displayAreaHeight, 0])
    bandingAdjustment = spacingScale.bandwidth() / 2
  } else {
    spacingScale = scaleLinear()
      .domain([0, Math.max(...coordinates.map((d) => d.y))])
      .range([displayAreaHeight, 0])
    bandingAdjustment = 0
  }

  let lineFunction
  if (scaleType === QsEnumScaleType.BANDED) {
    lineFunction = d3line()
      .x((d) => xDataScale(d[0]))
      .y((d) => spacingScale(d[1].toString()) + bandingAdjustment)
      .curve(constantsCurves[curve])
  } else {
    lineFunction = d3line()
      .x((d) => xDataScale(d[0]))
      .y((d) => spacingScale(d[1]) + bandingAdjustment)
      .curve(constantsCurves[curve])
  }

  return {
    id: `line${uuidv4()}`,
    lineData,
    lineFunction,
    strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,
    strokeColor: strokeColor ?? defaultStrokeColor,
    strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
  }
}
