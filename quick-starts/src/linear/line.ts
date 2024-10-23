import {
  scaleLinear,
  scaleBand,
  curveLinear,
  range,
  CurveFactory,
  line as d3line,
} from 'd3'
import { Canvas, CanvasConfigStrict } from '../d3QuickStart'
import { Selection } from 'd3-selection'
import { v4 as uuidv4 } from 'uuid'

export interface LineConfig {
  [key: string]: CurveFactory | undefined
  curve?: CurveFactory
}

export interface StrictLineConfig {
  [key: string]: CurveFactory | undefined
  curve: CurveFactory
}

export interface LineArgs {
  data: number[]
  vertical: boolean
  banded: boolean
  minimised: boolean
}

export class Line {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictLineConfig

  updateConfig(customConfig: LineConfig) {
    if (customConfig)
      Object.keys(customConfig).forEach(
        (key) => (this.config[key] = customConfig[key])
      )
  }

  constructor(canvas: Canvas, customConfig: LineConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {
      curve: curveLinear,
    }
    this.updateConfig(customConfig)
  }

  drawLine(args: LineArgs) {
    const { displayAreaHeight, displayAreaWidth, min, max } = this.canvasConfig
    const { data, vertical, banded, minimised } = args
    const meta: any[] = []
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
        min,
        max !== 0
          ? max
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
      .curve(this.config.curve)

    const group = this.canvasDisplayGroup.append('g')
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

  horizontal(data: number[]) {
    return this.drawLine({
      data,
      vertical: false,
      banded: false,
      minimised: false,
    })
  }

  vertical(data: number[]) {
    return this.drawLine({
      data,
      vertical: true,
      banded: false,
      minimised: false,
    })
  }

  horizontalBanded(data: number[]) {
    return this.drawLine({
      data,
      vertical: false,
      banded: true,
      minimised: false,
    })
  }

  verticalBanded(data: number[]) {
    return this.drawLine({
      data,
      vertical: true,
      banded: true,
      minimised: false,
    })
  }

  horizontalMinimised(data: number[]) {
    return this.drawLine({
      data,
      vertical: false,
      banded: false,
      minimised: true,
    })
  }

  verticalMinimised(data: number[]) {
    return this.drawLine({
      data,
      vertical: true,
      banded: false,
      minimised: true,
    })
  }

  horizontalBandedMinimised(data: number[]) {
    return this.drawLine({
      data,
      vertical: false,
      banded: true,
      minimised: true,
    })
  }

  verticalBandedMinimised(data: number[]) {
    return this.drawLine({
      data,
      vertical: true,
      banded: true,
      minimised: true,
    })
  }
}
