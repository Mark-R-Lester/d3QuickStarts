import {
  range,
  scaleLinear,
  curveLinear,
  CurveFactory,
  area as d3area,
} from 'd3'
import { Canvas } from '../canvas/canvas'
import { v4 as uuidv4 } from 'uuid'

export interface AreaConfig {
  [key: string]: CurveFactory | string | undefined
  curve?: CurveFactory
  color?: string
}

interface AreaConfigStrict {
  [key: string]: CurveFactory | string | undefined
  curve: CurveFactory
  color: string
}

interface AreaMeta {
  class: string
  id: string
  areaData: number[][]
  areaDataMin: number[][]
}

interface AreaArgs {
  lowerData?: number[]
  higherData: number[]
  minimised: boolean
}

const updateConfig = (customConfig?: AreaConfig): AreaConfigStrict => {
  const defaults: AreaConfigStrict = {
    curve: curveLinear,
    color: 'red',
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export interface AreaData {
  lowerData?: number[]
  higherData: number[]
}

const horizontal = (
  canvas: Canvas,
  data: AreaData,
  customConfig?: AreaConfig
) => {
  const args: AreaArgs = {
    lowerData: data.lowerData,
    higherData: data.higherData,
    minimised: false,
  }
  const config: AreaConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalMinimised = (
  canvas: Canvas,
  data: AreaData,
  customConfig?: AreaConfig
) => {
  const args: AreaArgs = {
    lowerData: data.lowerData,
    higherData: data.higherData,
    minimised: true,
  }
  const config: AreaConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearAreaGenerator = {
  horizontal,
  horizontalMinimised,
}

function draw(canvas: Canvas, args: AreaArgs, config: AreaConfigStrict) {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaHeight,
    displayAreaWidth,
  } = canvas.config
  const { curve, color } = config
  const { higherData, lowerData, minimised } = args
  const meta: AreaMeta[] = []

  const populateMeta = (higherData: number[], lowerData?: number[]) => {
    const xVals = range(
      0,
      displayAreaWidth,
      displayAreaWidth / higherData.length
    )
    meta.push({
      class: 'area',
      id: `area-${uuidv4()}`,
      areaData: higherData.map((d, i) => [
        xVals[i],
        d,
        lowerData ? lowerData[i] : 0,
      ]),
      areaDataMin: higherData.map((d, i) => [xVals[i], 0, 0]),
    })
  }
  populateMeta(higherData, lowerData)

  const xScale = scaleLinear()
    .domain([0, Math.max(...meta[0].areaData.map((d) => d[0]))])
    .range([0, displayAreaWidth])
  const yScale = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0
        ? highestViewableValue
        : Math.max(...meta[0].areaData.map((d) => d[1])),
    ])
    .range([displayAreaHeight, 0])

  const area = d3area<number[]>()
    .x((d) => xScale(d[0]))
    .y1((d) => yScale(d[1]))
    .y0((d) => yScale(d[2]))
    .curve(curve)

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta[0].class)
    .attr('id', meta[0].id)
    .attr('d', area(minimised ? meta[0].areaDataMin : meta[0].areaData))
    .attr('fill', color)
  return {
    area: group.select(`.${meta[0].class}`),
    group,
    meta,
    minimise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .transition()
        .duration(3000)
        .attr('d', area(meta[0].areaDataMin))
    },
    maximise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .transition()
        .duration(3000)
        .attr('d', area(meta[0].areaData))
    },
  }
}
