import {
  scaleLinear,
  scaleBand,
  curveLinear,
  range,
  CurveFactory,
  line as d3line,
} from 'd3'
import { Canvas } from '../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'

export interface LineConfig {
  [key: string]: CurveFactory | undefined
  curve?: CurveFactory
}

interface LineConfigStrict {
  [key: string]: CurveFactory | undefined
  curve: CurveFactory
}

interface DrawArgs {
  data: number[]
  vertical: boolean
  banded: boolean
  minimised: boolean
}

interface Meta {
  class: string
  id: string
  coordinates: [number, number][]
  coordinatesMin: [number, number][]
}

const updateConfig = (customConfig?: LineConfig): LineConfigStrict => {
  const defauls: LineConfigStrict = {
    curve: curveLinear,
  }

  if (!customConfig) return defauls

  Object.keys(customConfig).forEach((key) => (defauls[key] = customConfig[key]))
  return defauls
}

const horizontal = (
  canvas: Canvas,
  data: number[],
  customConfig?: LineConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: false,
    minimised: false,
  }
  const config: LineConfigStrict = updateConfig(customConfig)
  return drawLine(canvas, args, config)
}

const vertical = (
  canvas: Canvas,
  data: number[],
  customConfig?: LineConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: false,
    minimised: false,
  }
  const config: LineConfigStrict = updateConfig(customConfig)
  return drawLine(canvas, args, config)
}

const horizontalBanded = (
  canvas: Canvas,
  data: number[],
  customConfig?: LineConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: true,
    minimised: false,
  }
  const config: LineConfigStrict = updateConfig(customConfig)
  return drawLine(canvas, args, config)
}

const verticalBanded = (
  canvas: Canvas,
  data: number[],
  customConfig?: LineConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: true,
    minimised: false,
  }
  const config: LineConfigStrict = updateConfig(customConfig)
  return drawLine(canvas, args, config)
}

const horizontalMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: LineConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: false,
    minimised: true,
  }
  const config: LineConfigStrict = updateConfig(customConfig)
  return drawLine(canvas, args, config)
}

const verticalMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: LineConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: false,
    minimised: true,
  }
  const config: LineConfigStrict = updateConfig(customConfig)
  return drawLine(canvas, args, config)
}

const horizontalBandedMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: LineConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: true,
    minimised: true,
  }
  const config: LineConfigStrict = updateConfig(customConfig)
  return drawLine(canvas, args, config)
}

const verticalBandedMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: LineConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: true,
    minimised: true,
  }
  const config: LineConfigStrict = updateConfig(customConfig)
  return drawLine(canvas, args, config)
}

export const linearLineGenerator = {
  horizontal,
  vertical,
  horizontalBanded,
  verticalBanded,
  horizontalMinimised,
  verticalMinimised,
  horizontalBandedMinimised,
  verticalBandedMinimised,
}

const drawLine = (canvas: Canvas, args: DrawArgs, config: LineConfigStrict) => {
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { data, vertical, banded, minimised } = args
  const meta: Meta[] = []
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
  const coordinates: [number, number][] = data.map((d, i) =>
    vertical ? [d, yVals[i]] : [xVals[i], d]
  )
  const coordinatesMin: [number, number][] = data.map((d, i) =>
    vertical ? [0, yVals[i]] : [xVals[i], 0]
  )
  meta.push({
    class: 'line',
    id: `line${uuidv4()}`,
    coordinates,
    coordinatesMin,
  })

  let spacingScale: any
  let bandingAdjustment: number
  if (banded) {
    spacingScale = scaleBand()
      .domain(
        coordinates.map((coordinate) =>
          vertical ? coordinate[1].toString() : coordinate[0].toString()
        )
      )
      .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
    bandingAdjustment = spacingScale.bandwidth() / 2
  } else {
    spacingScale = scaleLinear()
      .domain([
        0,
        Math.max(...coordinates.map((d) => (vertical ? d[1] : d[0]))),
      ])
      .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
    bandingAdjustment = 0
  }
  const dataScale = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0
        ? highestViewableValue
        : Math.max(...coordinates.map((d) => (vertical ? d[0] : d[1]))),
    ])
    .range(vertical ? [0, displayAreaWidth] : [displayAreaHeight, 0])

  const line = d3line()
    .x((d) =>
      vertical ? dataScale(d[0]) : spacingScale(d[0]) + bandingAdjustment
    )
    .y((d) =>
      vertical ? spacingScale(d[1]) + bandingAdjustment : dataScale(d[1])
    )
    .curve(config.curve)

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta[0].class)
    .attr('id', meta[0].id)
    .attr('d', line(minimised ? coordinatesMin : coordinates))
    .attr('stroke', 'black')
    .attr('fill-opacity', '0')
  return {
    line: group.select(`.${meta[0].class}`),
    group,
    meta,
    minimise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .transition()
        .duration(3000)
        .attr('d', line(coordinatesMin))
    },
    maximise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .transition()
        .duration(3000)
        .attr('d', line(coordinates))
    },
  }
}
