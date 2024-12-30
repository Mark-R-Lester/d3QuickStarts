import {
  scaleLinear,
  scaleBand,
  range,
  ScaleLinear,
  line as d3line,
  Line,
} from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { DrawArgs, LineConfigStrict, Meta } from './types'
import { ScaleType } from '../../core/enums/enums'
import { QsCoordinate } from '../../core/types/qsTypes'
import { constantsCurves } from '../../core/constants/constants'

export const getMeta = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: LineConfigStrict
): Meta => {
  const {
    displayAreaWidth,
    displayAreaHeight,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { data, scaleType } = args
  const { curve } = config

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

  const dataScale: ScaleLinear<number, number, never> = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([displayAreaHeight, 0])

  if (scaleType === ScaleType.BANDED) {
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

  const lineFunction = d3line()
    .x((d) => spacingScale(d[0]) + bandingAdjustment)
    .y((d) => dataScale(d[1]))
    .curve(constantsCurves[curve])

  return {
    class: 'line',
    id: `line${uuidv4()}`,
    lineData,
    lineFunction,
  }
}
