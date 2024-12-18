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
} from 'd3'
import { toStrings } from '../../core/conversion'
import { ScaleType } from '../../core/enums'
import { QsCanvas } from '../../canvas/canvas'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/qsEnums'

export interface QsAxisConfig {
  [key: string]: number | boolean | string | undefined
  alignmentBaseline?: QsEnumAlignmentBaseline
  tickSize?: number
  tickSizeInner?: number
  tickSizeOuter?: number
  tickPadding?: number
  numberOfTicks?: number
  hideAxisLine?: boolean
  percentageMovement?: number

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
  alignmentBaseline: QsEnumAlignmentBaseline
  tickSize: number
  tickSizeInner: number
  tickSizeOuter: number
  tickPadding: number
  numberOfTicks: number
  hideAxisLine: boolean
  percentageMovement: number

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
    tickSize: 6,
    tickSizeInner: 6,
    tickSizeOuter: 0,
    tickPadding: 3,
    numberOfTicks: 0,
    hideAxisLine: false,
    percentageMovement: 0,

    textFont: QsEnumTextFont.SERIF,
    textFontSize: 10,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: 'black',
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
  canvas: QsCanvas,
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
  canvas: QsCanvas,
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
  canvas: QsCanvas,
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
  canvas: QsCanvas,
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
  canvas: QsCanvas,
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
  canvas: QsCanvas,
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
  canvas: QsCanvas,
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
  canvas: QsCanvas,
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
  canvas: QsCanvas,
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
    textX,
    textY,
    hideAxisLine,
    tickSize,
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
  } = config
  const { data, topOrRight, scaleType, isX } = args
  let strings: string[]
  let scale: any
  let axis: Axis<string>
  let percentRange: number[]

  const applyScaleToAxis = (
    scale: any
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

  if (scaleType === ScaleType.BANDED) {
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
      const linerScale = scaleLinear()
        .domain([lowestViewableValue, highestViewableValue])
        .range(range)
      const result = applyScaleToAxis(linerScale)
      axis = result.axis
      percentRange = result.percentRange
    }
  }

  const textPercentScale = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaHeight])
  const percentScale = scaleLinear().domain([0, 100]).range(percentRange)

  const translation = isX
    ? `translate(0, ${displayAreaHeight - percentScale(percentageMovement)})`
    : `translate(${percentScale(percentageMovement)}, 0)`
  axis.tickSize(tickSize)
  axis.tickSizeInner(tickSizeInner)
  axis.tickSizeOuter(tickSizeOuter)
  axis.tickPadding(tickPadding)
  if (numberOfTicks) axis.ticks(numberOfTicks)

  const axisGroup = canvasDisplayGroup
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', translation)
    .call(axis)

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

  if (hideAxisLine) {
    axisGroup.select('.domain').remove()
  }

  return { element: axisText }
}
