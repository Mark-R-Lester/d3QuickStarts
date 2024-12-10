import { scaleLinear, scaleBand, range, ScaleBand, ScaleLinear } from 'd3'
import { QsCanvas } from '../../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { DrawArgs, LineConfigStrict } from './types'
import { Orientation, ScaleType } from '../../core/enums'

export interface Meta {
  class: string
  id: string
  coordinates: [number, number][]
  // spacingScale: ScaleBand<string> | ScaleLinear<number, number, never> TODO get this typing to work
  spacingScale: any
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

  const coordinates: [number, number][] = data.map((d, i) =>
    isVertical ? [d, yVals[i]] : [xVals[i], d]
  )

  let spacingScale
  let bandingAdjustment: number
  if (scaleType === ScaleType.BANDED) {
    spacingScale = scaleBand()
      .domain(
        coordinates.map((coordinate) =>
          isVertical ? coordinate[1].toString() : coordinate[0].toString()
        )
      )
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
    bandingAdjustment = spacingScale.bandwidth() / 2
  } else {
    spacingScale = scaleLinear()
      .domain([
        0,
        Math.max(...coordinates.map((d) => (isVertical ? d[1] : d[0]))),
      ])
      .range(isVertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
    bandingAdjustment = 0
  }

  const dataScale: ScaleLinear<number, number, never> = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0
        ? highestViewableValue
        : Math.max(...coordinates.map((d) => (isVertical ? d[0] : d[1]))),
    ])
    .range(isVertical ? [0, displayAreaWidth] : [displayAreaHeight, 0])

  return {
    class: 'line',
    id: `line${uuidv4()}`,
    coordinates,
    spacingScale,
    dataScale,
    bandingAdjustment,
  }
}
