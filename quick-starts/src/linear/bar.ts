import { Canvas } from '../canvas/canvas'
import { range } from 'd3'
import { scaleLinear, scaleBand, scaleOrdinal, ScaleOrdinal } from 'd3-scale'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../core/conversion'

export interface BarConfig {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding?: number
  colorDomain?: number[]
  colorRange?: Iterable<unknown>
}
interface BarConfigStrict {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding: number
  colorDomain: number[]
  colorRange: Iterable<unknown>
}

interface DrawArgs {
  data: number[]
  horizontal: boolean
  minimised: boolean
}
interface BarData {
  x: number
  y: number
  height: number
  width: number
  color: string
}
interface Meta {
  class: string
  id: string
  barData: BarData
  barDataMin: BarData
}

const updateConfig = (customConfig?: BarConfig): BarConfigStrict => {
  const defaults: BarConfigStrict = {
    padding: 8,
    colorDomain: range(4),
    colorRange: ['purple'],
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}
const vertical = (canvas: Canvas, data: number[], customConfig?: BarConfig) => {
  const args: DrawArgs = { data, horizontal: false, minimised: false }
  const config: BarConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontal = (
  canvas: Canvas,
  data: number[],
  customConfig?: BarConfig
) => {
  const args: DrawArgs = { data, horizontal: true, minimised: false }
  const config: BarConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const verticalMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: BarConfig
) => {
  const args: DrawArgs = { data, horizontal: false, minimised: true }
  const config: BarConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: BarConfig
) => {
  const args: DrawArgs = { data, horizontal: true, minimised: true }
  const config: BarConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearBarGenerator = {
  horizontal,
  vertical,
  horizontalMinimised,
  verticalMinimised,
}

const draw = (canvas: Canvas, args: DrawArgs, config: BarConfigStrict) => {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaWidth,
    displayAreaHeight,
  } = canvas.config
  const { padding, colorDomain, colorRange } = config
  const { data, horizontal, minimised } = args
  const colors: ScaleOrdinal<string, unknown, never> = scaleOrdinal()
    .domain(toStrings(colorDomain))
    .range(colorRange)

  const meta: Meta[] = []
  const bandStepScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, horizontal ? displayAreaHeight : displayAreaWidth])
  const bandWidthScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, horizontal ? displayAreaHeight : displayAreaWidth])
    .padding(padding / 100)
  const heightScale = scaleLinear()
    .domain([
      lowestViewableValue,
      highestViewableValue !== 0 ? highestViewableValue : Math.max(...data),
    ])
    .range([0, horizontal ? displayAreaWidth : displayAreaHeight])

  const barSpaceing = (d: number, i: number) => {
    const adjustmentToCorrectD3 =
      (bandStepScale.step() - bandWidthScale.bandwidth()) / 2
    //TODO requires error handling
    const bandStep = bandStepScale(i.toString())
    if (bandStep) return bandStep + adjustmentToCorrectD3
    return 0
  }
  const x = (d: number, i: number) => (horizontal ? 0 : barSpaceing(d, i))
  const y = (d: number, i: number) =>
    horizontal ? barSpaceing(d, i) : displayAreaHeight - heightScale(d)
  const height = (d: number) =>
    horizontal ? bandWidthScale.bandwidth() : heightScale(d)
  const width = (d: number) =>
    horizontal ? heightScale(d) : bandWidthScale.bandwidth()
  const getColor = (
    i: number,
    colorScale: ScaleOrdinal<string, unknown, never>
  ): string => {
    let c: string | unknown = colorScale(i.toString())
    //TODO if c is not a string throw.
    return typeof c == 'string' ? c : '#cbc9e2'
  }

  data.forEach((d, i) => {
    const barData: BarData = {
      x: x(d, i),
      y: y(d, i),
      height: height(d),
      width: width(d),
      color: getColor(i, colors),
    }
    const barDataMin: BarData = {
      x: x(d, i),
      y: displayAreaHeight,
      height: 0,
      width: width(d),
      color: getColor(i, colors),
    }
    meta.push({
      class: 'bar',
      id: `bar-${uuidv4()}`,
      barData,
      barDataMin,
    })
  })

  const group = canvas.displayGroup.append('g')
  group
    .selectAll(`.${meta[0].class}`)
    .data(meta)
    .enter()
    .append('rect')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('x', (d) => (minimised ? d.barDataMin.x : d.barData.x))
    .attr('y', (d) => (minimised ? d.barDataMin.y : d.barData.y))
    .attr('width', (d) => (minimised ? d.barDataMin.width : d.barData.width))
    .attr('height', (d) => (minimised ? d.barDataMin.height : d.barData.height))
    .attr('fill', (d) => (minimised ? d.barDataMin.color : d.barData.color))
  return {
    bars: group.selectAll(`.${meta[0].class}`),
    group,
    meta,
    minimise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('height', (d) => d.barDataMin.height)
        .attr('y', (d) => d.barDataMin.y)
    },
    maximise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('height', (d) => d.barData.height)
        .attr('y', (d) => d.barData.y)
    },
  }
}
