import {
  scalePoint,
  scaleBand,
  axisBottom,
  axisTop,
  axisLeft,
  axisRight,
  Axis,
  ScaleLinear,
} from 'd3'
import { toStrings } from '../../core/conversion'
import { ChartEdge } from '../../core/enums/enums'
import {
  Canvas,
  QsEnumAxisScaleType,
  QsEnumScaleType,
} from '../../d3QuickStart'
import { DrawArgs, AxisConfigStrict } from './types'

export interface CalculatedData {
  translation: string
  axis: Axis<string>
  domainWidth: number
  tickWidth: number
  textFontSize: number
}

export const getCalculatedData = (
  canvas: Canvas,
  args: DrawArgs,
  config: AxisConfigStrict
): CalculatedData => {
  const {
    genralPercentScale,
    xPercentScale,
    xPercentScaleInverted,
    yPercentScale,
    yPercentScaleInverted,
    yDataScale,
    xDataScale,
  } = canvas.scales
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const {
    percentageMovement,
    domainScale,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    numberOfTicks,
    domainWidth,
    tickWidth,
    textFontSize,
  } = config
  const { data, chartEdge } = args

  interface AxisScales {
    axis: Axis<string>
    percentScale: ScaleLinear<number, number, never>
  }

  const applyScaleToAxis = (): AxisScales => {
    const getScale = () => {
      const range: Iterable<number> =
        chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
          ? [0, displayAreaWidth]
          : [displayAreaHeight, 0]

      if (domainScale === QsEnumAxisScaleType.LINEAR)
        return chartEdge === (ChartEdge.BOTTOM || ChartEdge.TOP)
          ? xDataScale
          : yDataScale
      if (domainScale === QsEnumAxisScaleType.POINT)
        return scalePoint().domain(toStrings(data)).range(range)
      return scaleBand().domain(toStrings(data)).range(range)
    }

    const scale: any = getScale()

    type Scales = {
      [key in ChartEdge]: AxisScales
    }

    const scales: Scales = {
      [ChartEdge.BOTTOM]: {
        axis: axisBottom(scale),
        percentScale: yPercentScale,
      },
      [ChartEdge.TOP]: {
        axis: axisTop(scale),
        percentScale: yPercentScaleInverted,
      },
      [ChartEdge.LEFT]: {
        axis: axisLeft(scale),
        percentScale: xPercentScale,
      },
      [ChartEdge.RIGHT]: {
        axis: axisRight(scale),
        percentScale: xPercentScaleInverted,
      },
    }

    return scales[chartEdge]
  }

  const { axis, percentScale } = applyScaleToAxis()
  const translation =
    chartEdge === ChartEdge.BOTTOM || chartEdge === ChartEdge.TOP
      ? `translate(0, ${displayAreaHeight - percentScale(percentageMovement)})`
      : `translate(${percentScale(percentageMovement)}, 0)`

  axis.tickSizeInner(
    tickSizeInner >= 0
      ? genralPercentScale(tickSizeInner)
      : percentScale(tickSizeInner)
  )
  axis.tickSizeOuter(
    tickSizeOuter >= 0
      ? genralPercentScale(tickSizeOuter)
      : percentScale(tickSizeOuter)
  )
  axis.tickPadding(tickPadding)

  if (numberOfTicks) axis.ticks(numberOfTicks)

  const calculatedData: CalculatedData = {
    translation,
    axis,
    domainWidth: genralPercentScale(domainWidth) / 5,
    tickWidth: genralPercentScale(tickWidth) / 5,
    textFontSize: genralPercentScale(textFontSize),
  }

  return calculatedData
}
