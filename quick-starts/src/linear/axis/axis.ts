import {
  scaleLinear,
  scalePoint,
  scaleBand,
  BaseType,
  Selection,
  axisBottom,
  axisTop,
  axisLeft,
  axisRight,
  Axis,
  ScaleLinear,
} from 'd3'
import { toStrings } from '../../core/conversion'
import { GlobalDefaults, ScaleType } from '../../core/enums/enums'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/enums/qsEnums'
import { Canvas } from '../../d3QuickStart'

export interface QsAxisConfig {
  [key: string]: number | boolean | string | undefined
  percentageMovement?: number

  domainColor?: string
  domainOpacity?: number
  domainWidth?: number
  tickColor?: string
  tickOpacity?: number
  tickWidth?: number
  tickSizeInner?: number
  tickSizeOuter?: number
  tickPadding?: number
  numberOfTicks?: number

  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAngle?: number
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
  textAlignmentBaseline?: QsEnumAlignmentBaseline
  textX?: number
  textY?: number
}

export interface QsAxis {
  element: Selection<BaseType, unknown, SVGGElement, unknown>
}

interface AxisConfigStrict {
  [key: string]: number | boolean | string | undefined
  percentageMovement: number

  domainColor: string
  domainOpacity: number
  domainWidth: number
  tickColor: string
  tickOpacity: number
  tickWidth: number
  tickSizeInner: number
  tickSizeOuter: number
  tickPadding: number
  numberOfTicks: number

  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAngle: number
  textAnchor: QsEnumTextAnchor
  textStroke: string
  textAlignmentBaseline: QsEnumAlignmentBaseline
  textX: number
  textY: number
}

interface DrawArgs {
  data: string[] | number[]
  topOrRight: boolean
  scaleType: ScaleType
  isX: boolean
}

const addDefaultsToConfig = (customConfig?: QsAxisConfig): AxisConfigStrict => {
  const defaults: AxisConfigStrict = {
    alignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
    percentageMovement: 0,

    domainColor: GlobalDefaults.DEFAULT_AXIS_COLOR,
    domainOpacity: 1,
    domainWidth: 2,
    tickColor: GlobalDefaults.DEFAULT_AXIS_COLOR,
    tickOpacity: 1,
    tickWidth: 2,
    tickSizeInner: 2,
    tickSizeOuter: 2,
    tickPadding: 1,
    numberOfTicks: 0,

    textFont: QsEnumTextFont.SERIF,
    textFontSize: 10,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: GlobalDefaults.DEFAULT_AXIS_COLOR,
    textAngle: 0,
    textStroke: '',
    textAnchor: QsEnumTextAnchor.START,
    textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
    textX: 0,
    textY: 0,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}
const xAxisTop = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    topOrRight: true,
    scaleType: ScaleType.LINEAR,
    isX: true,
  }
  return draw(canvas, args, config)
}

const xAxisBottom = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    topOrRight: false,
    scaleType: ScaleType.LINEAR,
    isX: true,
  }
  return draw(canvas, args, config)
}

const xAxisBottomBanded = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    topOrRight: false,
    scaleType: ScaleType.BANDED,
    isX: true,
  }
  return draw(canvas, args, config)
}

const xAxisTopBanded = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    topOrRight: true,
    scaleType: ScaleType.BANDED,
    isX: true,
  }
  return draw(canvas, args, config)
}

const yAxisLeft = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    topOrRight: false,
    scaleType: ScaleType.LINEAR,
    isX: false,
  }
  return draw(canvas, args, config)
}

const yAxisRight = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    topOrRight: true,
    scaleType: ScaleType.LINEAR,
    isX: false,
  }
  return draw(canvas, args, config)
}

const yAxisLeftBanded = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    topOrRight: false,
    scaleType: ScaleType.BANDED,
    isX: false,
  }
  return draw(canvas, args, config)
}

const yAxisRightBanded = (
  canvas: Canvas,
  data: string[] | number[],
  customConfig?: QsAxisConfig
): QsAxis => {
  const config: AxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    topOrRight: true,
    scaleType: ScaleType.BANDED,
    isX: false,
  }
  return draw(canvas, args, config)
}

export const qsLinearAxisGenerator = {
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
  args: DrawArgs,
  config: AxisConfigStrict
): QsAxis => {
  const { config: canvasConfig, displayGroup: canvasDisplayGroup } = canvas
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaWidth,
    displayAreaHeight,
  } = canvasConfig
  const {
    percentageMovement,

    domainColor,
    domainOpacity,
    domainWidth,
    tickColor,
    tickOpacity,
    tickWidth,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    numberOfTicks,
    textFont,
    textFontStyle,
    textFontSize,
    textFontWeight,
    textAngle,
    textAnchor,
    textStroke,
    textFill,
    textDecorationLine,
    textAlignmentBaseline,
    textX,
    textY,
  } = config
  const { data, topOrRight, scaleType, isX } = args
  let strings: string[]
  let scale: any
  let axis: Axis<string>
  let percentScale: ScaleLinear<number, number, never>

  interface AxisAndPercentScale {
    axis: Axis<string>
    percentScale: ScaleLinear<number, number, never>
  }

  const applyScaleToAxis = (scale: any): AxisAndPercentScale => {
    if (isX) {
      const percentRange = topOrRight
        ? [displayAreaHeight, 0]
        : [0, displayAreaHeight]
      return {
        axis: topOrRight ? axisTop(scale) : axisBottom(scale),
        percentScale: scaleLinear().domain([0, 100]).range(percentRange),
      }
    } else {
      const percentRange = topOrRight
        ? [displayAreaWidth, 0]
        : [0, displayAreaWidth]
      return {
        axis: topOrRight ? axisRight(scale) : axisLeft(scale),
        percentScale: scaleLinear().domain([0, 100]).range(percentRange),
      }
    }
  }

  const range: Iterable<number> = isX
    ? [0, displayAreaWidth]
    : [displayAreaHeight, 0]

  if (scaleType === ScaleType.BANDED) {
    strings = toStrings(data)
    scale = scaleBand().domain(strings).range(range)
    const result = applyScaleToAxis(scale)
    axis = result.axis
    percentScale = result.percentScale
  } else {
    if (data.some((d) => typeof d === 'string')) {
      strings = toStrings(data)
      scale = scalePoint().domain(strings).range(range)
      const result = applyScaleToAxis(scale)
      axis = result.axis
      percentScale = result.percentScale
    } else {
      const linerScale = scaleLinear()
        .domain([lowestViewableValue, highestViewableValue])
        .range(range)
      const result = applyScaleToAxis(linerScale)
      axis = result.axis
      percentScale = result.percentScale
    }
  }

  const textPercentScale = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaHeight])

  const translation = isX
    ? `translate(0, ${displayAreaHeight - percentScale(percentageMovement)})`
    : `translate(${percentScale(percentageMovement)}, 0)`
  axis.tickSizeInner(percentScale(tickSizeInner))
  axis.tickSizeOuter(percentScale(tickSizeOuter))
  axis.tickPadding(tickPadding)

  if (numberOfTicks) axis.ticks(numberOfTicks)

  const axisGroup = canvasDisplayGroup
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', translation)
    .call(axis)
  console.log(axisGroup.selectChildren())

  axisGroup
    .select('.domain')
    .attr('stroke', domainColor)
    .attr('stroke-width', textPercentScale(domainWidth) / 5)
    .attr('opacity', domainOpacity)
  axisGroup
    .selectAll('.tick')
    .select('line')
    .attr('stroke', tickColor)
    .attr('stroke-width', textPercentScale(tickWidth) / 5)
    .attr('opacity', tickOpacity)

  const axisText = axisGroup.selectAll('text')
  axisText
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', textPercentScale(textFontSize))
    .attr('text-decoration', textDecorationLine)
    .attr('fill', textFill)
    .attr('stroke', textStroke)
    .attr('transform', `rotate(${textAngle})`)
    .style('text-anchor', textAnchor)
    .style('alignment-baseline', textAlignmentBaseline)
    .attr('text-anchor', textAnchor)
    .attr('dy', textY)
    .attr('dx', textX)

  return { element: axisText }
}
