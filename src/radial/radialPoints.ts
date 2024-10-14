import { Canvas, CanvasConfigStrict } from '../canvas/canvas'
import { Selection } from 'd3-selection'
import { scaleLinear, scaleBand, scaleOrdinal} from 'd3-scale'
import { v4 as uuidv4 } from 'uuid'

export interface RadialPointsConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  x?: number
  y?: number 
  pointRadius?: number
}

export interface StrictRadialPointsConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string>  | undefined
  x: number
  y: number 
  pointRadius: number
}

export class RadialPoints  {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGSVGElement, unknown, HTMLElement, any>
  config: StrictRadialPointsConfig
  colors: any


  updateConfig(customConfig: RadialPointsConfig) {
    if(customConfig)
      Object.keys(customConfig).forEach(key => (this.config[key] = customConfig[key]))
  }

  constructor(canvas: Canvas, config: RadialPointsConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {
      x: 50,
      y: 50,
      pointRadius: 1.2
    }
    this.updateConfig(config)
  }

  radialPoints(data: number[][], minimised: boolean) {
    const { x, y, pointRadius } = this.config
    const { min, max, displayAreaHeight, displayAreaWidth } = this.canvasConfig
    const meta: any[] = []
    const angleScale = scaleLinear()
      .domain([0, data.length])
      .range([0, 2 * Math.PI])
    const radialScale = scaleLinear()
      .domain([min, max])
      .range([0, displayAreaHeight / 2])
    const xScale = scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth])
    const yScale = scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight])

    data.forEach((d, i) => {
      const radians = angleScale(i)
      const hypotenuse = radialScale(d[0])
      const x = Math.sin(radians) * hypotenuse
      const y = Math.cos(radians) * hypotenuse * -1

      meta.push({
        id: `radialPoint${uuidv4()}`,
        class: 'radialPoint',
        pointData: [x, y],
        pointDataMin: [0, 0]
      })
    })

    const dataPoints = this.canvasDisplayGroup.append('g')
    dataPoints
      .selectAll('circle')
      .data(meta)
      .enter()
      .append('circle')
      .attr('class', d => d.class)
      .attr('id', d => d.id)
      .attr('cx', d => (minimised ? d.pointDataMin[0] : d.pointData[0]))
      .attr('cy', d => (minimised ? d.pointDataMin[1] : d.pointData[1]))
      .attr('r', minimised ? 0 : yScale(pointRadius))
      .attr('transform', `translate(${xScale(x)}, ${yScale(y)})`)
    return {
      points: dataPoints.selectAll('circle'),
      meta,
      maximise: () => {
        dataPoints
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('cx', d => d.pointData[0])
          .attr('cy', d => d.pointData[1])
          .attr('r', yScale(pointRadius))
      },
      minimise: () => {
        dataPoints
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('cx', d => d.pointDataMin[0])
          .attr('cy', d => d.pointDataMin[1])
          .attr('r', yScale(pointRadius))
      }
    }
  }

  radialPointsMinimised(data: number[][]) {
    return this.radialPoints(data, true)
  }
}
