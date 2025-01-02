import { scaleLinear, scaleBand, range, line as d3line } from 'd3'
import { Canvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { DrawArgs, LineConfigStrict, Meta } from './types'
import { ScaleType } from '../../core/enums/enums'
import { QsCoordinate } from '../../core/types/qsTypes'
import { constantsCurves } from '../../core/constants/constants'

export const getMeta = (
  canvas: Canvas,
  args: DrawArgs,
  config: LineConfigStrict
): Meta => {
  const { displayAreaHeight } = canvas.config
  const { xDataScale } = canvas.scales
  const { data, scaleType } = args
  const { curve } = config

  const yVals: number[] = range(
    0,
    displayAreaHeight,
    displayAreaHeight / data.data.length
  )

  const coordinates: QsCoordinate[] = []
  const lineData: [number, number][] = []

  data.data.reverse().forEach((d, i) => {
    coordinates.push({ x: d, y: yVals[i] })
    lineData.push([d, yVals[i]])
  })

  let spacingScale: any
  let bandingAdjustment: number

  if (scaleType === ScaleType.BANDED) {
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

  const lineFunction = d3line()
    .x((d) => xDataScale(d[0]))
    .y((d) => spacingScale(d[1]) + bandingAdjustment)
    .curve(constantsCurves[curve])

  return {
    class: 'line',
    id: `line${uuidv4()}`,
    lineData,
    lineFunction,
  }
}
