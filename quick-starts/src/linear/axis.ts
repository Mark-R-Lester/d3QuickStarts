import { scaleLinear, scalePoint, scaleBand } from 'd3-scale'
import { Canvas, CanvasConfigStrict } from '../d3QuickStart'
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

export interface StrictAxisConfig {
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

export interface AxisArgs {
  data: string[] | number[]
  topOrRight: boolean
  banded: boolean
  sX: boolean
}

export interface AxisSelection {
  selection: Selection<BaseType, unknown, SVGGElement, unknown>
}

export class Axiss {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictAxisConfig
  colors: any

  constructor(canvas: Canvas, customConfig?: AxisConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {
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
    if (customConfig) this.updateConfig(customConfig)
  }

  updateConfig(customConfig: AxisConfig) {
    if (customConfig)
      Object.keys(customConfig).forEach(
        (key) => (this.config[key] = customConfig[key])
      )
  }

  draw(
    data: string[] | number[],
    topOrRight: boolean,
    banded: boolean,
    isX: boolean
  ): AxisSelection {
    const { min, max, displayAreaWidth, displayAreaHeight } = this.canvasConfig
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
    } = this.config

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

    const axisGroup = this.canvasDisplayGroup
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

  xAxis(data: string[] | number[]) {
    return this.draw(data, false, false, true)
  }

  xAxisTop(data: string[] | number[]) {
    return this.draw(data, true, false, true)
  }

  xAxisBottom(data: string[] | number[]) {
    return this.draw(data, false, false, true)
  }

  xAxisBanded(data: string[] | number[]) {
    return this.draw(data, false, true, true)
  }

  xAxisBottomBanded(data: string[] | number[]) {
    return this.draw(data, false, true, true)
  }

  xAxisTopBanded(data: string[] | number[]) {
    return this.draw(data, true, true, true)
  }

  yAxis(data: string[] | number[]) {
    return this.draw(data, false, false, false)
  }

  yAxisLeft(data: string[] | number[]) {
    return this.draw(data, false, false, false)
  }

  yAxisRight(data: string[] | number[]) {
    return this.draw(data, true, false, false)
  }

  yAxisBanded(data: string[] | number[]) {
    return this.draw(data, false, true, false)
  }

  yAxisLeftBanded(data: string[] | number[]) {
    return this.draw(data, false, true, false)
  }

  yAxisRightBanded(data: string[] | number[]) {
    return this.draw(data, true, true, false)
  }
}
