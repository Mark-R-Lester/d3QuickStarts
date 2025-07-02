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
  const { displayAreaWidth } = canvas.config
  const { yDataScale, genralPercentScale } = canvas.scales
  const { data } = args
  const { strokeOpacity, strokeColor, strokeWidth } = data
  const {
    scaleType,
    curve,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
  } = config

  const xVals: number[] = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.data.length
  )

  const coordinates: QsCoordinate[] = []
  const lineData: [number, number][] = []

  data.data.forEach((d, i) => {
    coordinates.push({ x: xVals[i], y: d })
    lineData.push([xVals[i], d])
  })

  let spacingScale: any
  let bandingAdjustment: number

  if (scaleType === QsEnumScaleType.BANDED) {
    spacingScale = scaleBand()
      .domain(coordinates.map((coordinate) => coordinate.x.toString()))
      .range([0, displayAreaWidth])
    bandingAdjustment = spacingScale.bandwidth() / 2
  } else {
    spacingScale = scaleLinear()
      .domain([0, Math.max(...coordinates.map((d) => d.x))])
      .range([0, displayAreaWidth])
    bandingAdjustment = 0
  }

  let lineFunction
  if (scaleType === QsEnumScaleType.BANDED) {
    lineFunction = d3line()
      .x((d) => spacingScale(d[0].toString()) + bandingAdjustment)
      .y((d) => yDataScale(d[1]))
      .curve(constantsCurves[curve])
  } else {
    lineFunction = d3line()
      .x((d) => spacingScale(d[0]))
      .y((d) => yDataScale(d[1]))
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
