import { Canvas, CanvasConfigStrict } from '../canvas/canvas'
import { Selection } from 'd3-selection'
import { scaleLinear, curveLinear, CurveFactory, lineRadial } from 'd3'

export interface RadialLineConfig {
  [key: string]: number | CurveFactory | undefined
  x?: number
  y?: number
  curve?: CurveFactory
}

export interface StrictRadialLineConfig {
  [key: string]: number | CurveFactory | undefined
  x: number
  y: number
  curve: CurveFactory
}

export interface RadialLineArgs {
  data: number[][]
  vertical: boolean
  minimised: boolean
}

export class RadialLine {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictRadialLineConfig

  updateConfig(customConfig: RadialLineConfig) {
    if (customConfig)
      Object.keys(customConfig).forEach(
        (key) => (this.config[key] = customConfig[key])
      )
  }

  constructor(canvas: Canvas, customConfig: RadialLineConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup
    this.config = {
      curve: curveLinear,
      x: 50,
      y: 50,
    }
    this.updateConfig(customConfig)
  }

  radialLine(data: number[][], minimise: boolean) {
    const { x, y, curve } = this.config
    const { min, max, displayAreaHeight, displayAreaWidth } = this.canvasConfig
    const meta: any[] = []
    const angleScale = scaleLinear()
      .domain([0, data.length])
      .range([0, 2 * Math.PI])
    const radialScale = scaleLinear()
      .domain([min, max])
      .range([0, displayAreaHeight / 2])
    const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
    const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

    const dataCopy = data.slice()
    dataCopy.push(data[0])

    meta.push({
      class: 'radialLine',
      id: 'radialLine',
      lineDataMin: dataCopy.map((d, i) => [angleScale(i), 0]),
      lineData: dataCopy.map((d, i) => [angleScale(i), radialScale(d[0])]),
    })

    const radialLine = lineRadial().curve(curve)
    const group = this.canvasDisplayGroup.append('g')
    group
      .append('path')
      .attr('class', meta[0].class)
      .attr('id', meta[0].id)
      .attr('d', radialLine(minimise ? meta[0].lineDataMin : meta[0].lineData))
      .attr('fill', 'none')
      .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
    return {
      line: group.selectAll(`.${meta[0].class}`),
      group,
      meta,
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .transition()
          .duration(3000)
          .attr('d', radialLine(meta[0].lineData))
      },
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .transition()
          .duration(3000)
          .attr('d', radialLine(meta[0].lineDataMin))
      },
    }
  }

  radialLineMinimised(data: number[][]) {
    return this.radialLine(data, true)
  }
}
