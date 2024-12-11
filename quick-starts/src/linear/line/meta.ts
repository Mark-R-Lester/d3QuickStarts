import { scaleLinear, scaleBand, range, ScaleBand, ScaleLinear } from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { DrawArgs, LineConfigStrict } from './types'
import { Orientation, ScaleType } from '../../core/enums'
import { QsCoordinate } from '../../core/qsTypes'

export interface Meta {
  class: string
  id: string
  lineData: [number, number][]
  spacingScale: any // due to and impossible to construt intersection type this has to remain as any
  dataScale: ScaleLinear<number, number, never>
  bandingAdjustment: number
}

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
  const { data, orientation, scaleType } = args

  const xVals: number[] = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.length
  )
  const yVals: number[] = range(
    0,
    displayAreaHeight,
    displayAreaHeight / data.length
  )

  const isVertical = orientation === Orientation.VERTICAL
  const coordinates: QsCoordinate[] = []
  const lineData: [number, number][] = []

  data.forEach((d, i) => {
    coordinates.push(isVertical ? { x: d, y: yVals[i] } : { x: xVals[i], y: d })
    lineData.push(isVertical ? [d, yVals[i]] : [xVals[i], d])
  })

  let spacingScale
  let bandingAdjustment: number

  const dataScale: ScaleLinear<number, number, never> = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range(isVertical ? [0, displayAreaWidth] : [displayAreaHeight, 0])

  if (scaleType === ScaleType.BANDED) {
    spacingScale = scaleBand()
      .domain(
        coordinates.map((coordinate) =>
          isVertical ? coordinate.y.toString() : coordinate.x.toString()
        )
      )
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
    bandingAdjustment = spacingScale.bandwidth() / 2
  } else {
    spacingScale = scaleLinear()
      .domain([
        0,
        Math.max(...coordinates.map((d) => (isVertical ? d.y : d.x))),
      ])
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
    bandingAdjustment = 0
  }

  return {
    class: 'line',
    id: `line${uuidv4()}`,
    lineData,
    spacingScale,
    dataScale,
    bandingAdjustment,
  }
}
