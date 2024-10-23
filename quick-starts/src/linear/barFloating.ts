import { scaleLinear, scaleBand, scaleOrdinal, NumberValue } from 'd3-scale'
import { Canvas, CanvasConfigStrict } from '../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'
import { range, Selection } from 'd3'
import { toStrings } from '../core/conversion'
import { findMax } from '../core/max'

export interface BarFloatingConfig {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding?: number
  colorDomain?: number[]
  colorRange?: Iterable<unknown>
}

interface StrictBarFloatingConfig {
  [key: string]: number | Iterable<unknown> | number[] | undefined
  padding: number
  colorDomain: number[]
  colorRange: Iterable<unknown>
}

export interface BarFloatingArgs {
  data: number[][]
  vertical: boolean
  minimised: boolean
}

export class BarFloating {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictBarFloatingConfig
  colors: any

  updateConfig(customConfig: BarFloatingConfig) {
    if (customConfig)
      Object.keys(customConfig).forEach(
        (key) => (this.config[key] = customConfig[key])
      )
  }

  constructor(canvas: Canvas, customConfig: BarFloatingConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {
      padding: 8,
      colorDomain: range(4),
      colorRange: ['purple'],
    }
    this.updateConfig(customConfig)
    this.colors = scaleOrdinal()
      .domain(toStrings(this.config.colorDomain))
      .range(this.config.colorRange)
  }

  draw(args: BarFloatingArgs) {
    const { min, max, displayAreaWidth, displayAreaHeight } = this.canvasConfig
    const { padding } = this.config
    const { data, vertical, minimised } = args
    const meta: any[] = []
    const bandStepScale = scaleBand()
      .domain(toStrings(range(data.length)))
      .range([0, vertical ? displayAreaHeight : displayAreaWidth])
    const bandWidthScale = scaleBand()
      .domain(toStrings(range(data.length)))
      .range([0, vertical ? displayAreaHeight : displayAreaWidth])
      .padding(padding / 100)
    const heightScale = scaleLinear()
      .domain([min, max !== 0 ? max : findMax(data)])
      .range([0, vertical ? displayAreaWidth : displayAreaHeight])

    const barSpaceing = (d: NumberValue[], i: number) => {
      const adjustmentToCorrectD3 =
        (bandStepScale.step() - bandWidthScale.bandwidth()) / 2
      //TODO requires error handling
      const bandStep = bandStepScale(i.toString())
      if (bandStep) return bandStep + adjustmentToCorrectD3
      return 0
    }
    const x = (d: NumberValue[], i: number) =>
      vertical ? heightScale(d[0]) : barSpaceing(d, i)
    const y = (d: NumberValue[], i: number) =>
      vertical ? barSpaceing(d, i) : displayAreaHeight - heightScale(d[1])
    const height = (d: number[]) =>
      vertical ? bandWidthScale.bandwidth() : heightScale(d[1] - d[0])
    const width = (d: number[]) =>
      vertical ? heightScale(d[1] - d[0]) : bandWidthScale.bandwidth()
    const color = (d: any[], i: number) => this.colors(d[1] ? d[1] : i)

    data.forEach((d, i) => {
      const barData = {
        x: x(d, i),
        y: y(d, i),
        height: height(d),
        width: width(d),
        color: color(d, i),
      }
      const barDataMin = {
        x: x(d, i),
        y: displayAreaHeight,
        height: 0,
        width: width(d),
        color: color(d, i),
      }
      meta.push({
        class: 'bar',
        id: `bar-${uuidv4()}`,
        barData,
        barDataMin,
      })
    })
    const group = this.canvasDisplayGroup.append('g')
    group
      .selectAll('.bar')
      .data(meta)
      .enter()
      .append('rect')
      .attr('class', (d) => d.class)
      .attr('id', (d) => d.id)
      .attr('x', (d) => (minimised ? d.barDataMin.x : d.barData.x))
      .attr('y', (d) => (minimised ? d.barDataMin.y : d.barData.y))
      .attr('width', (d) => (minimised ? d.barDataMin.width : d.barData.width))
      .attr('height', (d) =>
        minimised ? d.barDataMin.height : d.barData.height
      )
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

  horizontal(data: number[][]) {
    return this.draw({ data, vertical: false, minimised: false })
  }

  vertical(data: number[][]) {
    return this.draw({ data, vertical: true, minimised: false })
  }

  horizontalMinimised(data: number[][]) {
    return this.draw({ data, vertical: false, minimised: true })
  }

  verticalMinimised(data: number[][]) {
    return this.draw({ data, vertical: true, minimised: true })
  }
}
