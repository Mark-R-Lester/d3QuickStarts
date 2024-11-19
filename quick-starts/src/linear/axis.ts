import { scaleLinear, scalePoint, scaleBand } from 'd3-scale'
import { Canvas } from '../d3QuickStart'
import { BaseType, Selection } from 'd3-selection'
import {
  axisBottom,
  axisTop,
  axisLeft,
  axisRight,
  AxisScale,
  Axis,
} from 'd3-axis'
import { toStrings } from '../core/conversion'

export interface AxisConfig {
  [key: string]: number | boolean | string | undefined
  alignmentBaseline?: string
  tickSize?: number
  tickSizeInner?: number
  tickSizeOuter?: number
  tickPadding?: number
  fontSize?: number
  font?: string
  textAngle?: number
  textAnchor?: string
  textX?: string
  textY?: string
  hideAxisDomain?: boolean
  x?: number
  y?: number
}

export interface AxisArgs {
  data: string[] | number[]
  topOrRight: boolean
  banded: boolean
  isX: boolean
}

export interface AxisSelection {
  selection: Selection<BaseType, unknown, SVGGElement, unknown>
}

interface StrictAxisConfig {
  [key: string]: number | boolean | string | undefined
  alignmentBaseline: string
  tickSize: number
  tickSizeInner: number
  tickSizeOuter: number
  tickPadding: number
  fontSize: number
  font: string
  textAngle: number
  textAnchor: string
  textX: string
  textY: string
  hideAxisDomain: boolean
  x: number
  y: number
}

const configuration: StrictAxisConfig = {
  alignmentBaseline: '',
  tickSize: 6,
  tickSizeInner: 6,
  tickSizeOuter: 0,
  tickPadding: 3,
  fontSize: 5,
  font: 'sans-serif',
  textAngle: 0,
  textAnchor: '',
  textX: '',
  textY: '',
  hideAxisDomain: false,
  x: 0,
  y: 0,
}

const updateConfig = (customConfig?: AxisConfig) => {
  if (customConfig)
    Object.keys(customConfig).forEach(
      (key) => (configuration[key] = customConfig[key])
    )
}

const xAxisTop = (
  canvas: Canvas,
  data: string[] | number[],
  config?: AxisConfig
) => {
  updateConfig(config)
  const args: AxisArgs = { data, topOrRight: true, banded: false, isX: true }
  return draw(canvas, args, configuration)
}

const xAxisBottom = (
  canvas: Canvas,
  data: string[] | number[],
  config?: AxisConfig
) => {
  updateConfig(config)
  const args: AxisArgs = { data, topOrRight: false, banded: false, isX: true }
  return draw(canvas, args, configuration)
}

const xAxisBottomBanded = (
  canvas: Canvas,
  data: string[] | number[],
  config?: AxisConfig
) => {
  updateConfig(config)
  const args: AxisArgs = { data, topOrRight: false, banded: true, isX: true }
  return draw(canvas, args, configuration)
}

const xAxisTopBanded = (
  canvas: Canvas,
  data: string[] | number[],
  config?: AxisConfig
) => {
  updateConfig(config)
  const args: AxisArgs = { data, topOrRight: true, banded: true, isX: true }
  return draw(canvas, args, configuration)
}

const yAxisLeft = (
  canvas: Canvas,
  data: string[] | number[],
  config?: AxisConfig
) => {
  updateConfig(config)
  const args: AxisArgs = { data, topOrRight: false, banded: false, isX: false }
  return draw(canvas, args, configuration)
}

const yAxisRight = (
  canvas: Canvas,
  data: string[] | number[],
  config?: AxisConfig
) => {
  updateConfig(config)
  const args: AxisArgs = { data, topOrRight: true, banded: false, isX: false }
  return draw(canvas, args, configuration)
}

const yAxisLeftBanded = (
  canvas: Canvas,
  data: string[] | number[],
  config?: AxisConfig
) => {
  updateConfig(config)
  const args: AxisArgs = { data, topOrRight: false, banded: true, isX: false }
  return draw(canvas, args, configuration)
}

const yAxisRightBanded = (
  canvas: Canvas,
  data: string[] | number[],
  config?: AxisConfig
) => {
  updateConfig(config)
  const args: AxisArgs = { data, topOrRight: true, banded: true, isX: false }
  return draw(canvas, args, configuration)
}

export const axisGenerator = {
  xAxisTop,
  xAxisBottom,
  xAxisBottomBanded,
  xAxisTopBanded,
  yAxisLeft,
  yAxisRight,
  yAxisLeftBanded,
  yAxisRightBanded,
}

const draw = (
  canvas: Canvas,
  args: AxisArgs,
  config: StrictAxisConfig
): AxisSelection => {
  const { config: canvasConfig, displayGroup: canvasDisplayGroup } = canvas
  const { min, max, displayAreaWidth, displayAreaHeight } = canvasConfig
  const {
    x,
    y,
    textX,
    textY,
    tickSize,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    font,
    fontSize,
    textAngle,
    textAnchor,
    hideAxisDomain,
    alignmentBaseline,
  } = config
  const { data, topOrRight, banded, isX } = args

  let numbers: number[]
  let strings: string[]
  let scale: AxisScale<string>
  let axis: Axis<string>
  let percentRange: number[]

  const applyScaleToAxis = (
    scale: AxisScale<string>
  ): { axis: Axis<string>; percentRange: number[] } => {
    if (isX) {
      return {
        axis: topOrRight ? axisTop(scale) : axisBottom(scale),
        percentRange: topOrRight
          ? [displayAreaHeight, 0]
          : [0, displayAreaHeight],
      }
    } else {
      return {
        axis: topOrRight ? axisRight(scale) : axisLeft(scale),
        percentRange: topOrRight
          ? [displayAreaWidth, 0]
          : [0, displayAreaWidth],
      }
    }
  }

  const range: Iterable<number> = isX
    ? [0, displayAreaWidth]
    : [displayAreaHeight, 0]
  if (banded) {
    strings = toStrings(data)
    scale = scaleBand().domain(strings).range(range)
    const result = applyScaleToAxis(scale)
    axis = result.axis
    percentRange = result.percentRange
  } else {
    if (data.some((d) => typeof d === 'string')) {
      strings = toStrings(data)
      scale = scalePoint().domain(strings).range(range)
      const result = applyScaleToAxis(scale)
      axis = result.axis
      percentRange = result.percentRange
    } else {
      numbers = data.map((d) => Number(d))
      const linerScale = scaleLinear()
        .domain([min, max !== 0 ? max : Math.max(...numbers)])
        .range(range)
      scale = scalePoint().domain(toStrings(linerScale.domain())).range(range)
      const result = applyScaleToAxis(scale)
      axis = result.axis
      percentRange = result.percentRange
    }
  }

  const textPercentScale = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaHeight])
  const percentScale = scaleLinear().domain([0, 100]).range(percentRange)

  const translation = isX
    ? `translate(0, ${displayAreaHeight - percentScale(y)})`
    : `translate(${percentScale(x)}, 0)`
  axis.tickSize(tickSize)
  axis.tickSizeInner(tickSizeInner)
  axis.tickSizeOuter(tickSizeOuter)
  axis.tickPadding(tickPadding)

  const axisGroup = canvasDisplayGroup
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', translation)
    .call(axis)

  const axisText = axisGroup.selectAll('text')

  axisText
    .attr('text-anchor', textAnchor)
    .attr('transform', `rotate(${textAngle})`)
    .attr('font-size', textPercentScale(fontSize))
    .attr('font', font)
    .style('alignment-baseline', alignmentBaseline)
  if (textY) {
    axisText.attr('dy', textY)
  }
  if (textX) {
    axisText.attr('dx', textX)
  }
  const axisDomain = axisGroup.select('.domain')
  if (hideAxisDomain) {
    axisDomain.remove()
  }

  return { selection: axisText }
}
