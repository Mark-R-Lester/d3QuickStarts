
import { scaleLinear, scaleBand, NumberValue, range} from 'd3'
import { Canvas, CanvasConfigStrict } from '../d3QuickStart'
import { Selection } from 'd3-selection'
import { v4 as uuidv4 } from 'uuid'

export interface PointsConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
}

export interface StrictPointsConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string>  | undefined
  radius: number
}

export interface PointsArgs {
  data: number[]
  vertical: boolean
  banded: boolean
  minimised: boolean
}

export class Points {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGSVGElement, unknown, HTMLElement, any>
  config: StrictPointsConfig

  updateConfig(customConfig: PointsConfig) {
    if(customConfig)
      Object.keys(customConfig).forEach(key => (this.config[key] = customConfig[key]))
  }

  constructor(canvas: Canvas, config: PointsConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {
      radius: 3
    }
    this.updateConfig(config)
  }

  drawPoints(args: PointsArgs) {
    const { displayAreaHeight, displayAreaWidth, min, max } = this.canvasConfig
    const { radius } = this.config
    const { data, vertical, banded, minimised } = args
    const meta: any[]= []
    const pointSpacing = range(0, displayAreaWidth, displayAreaWidth / data.length)
    const coordinates = data.map((d, i) => (vertical ? [d, pointSpacing[i]] : [pointSpacing[i], d]))
    const dataScale = scaleLinear()
      .domain(
        vertical
          ? [min, max !== 0 ? max : Math.max(...coordinates.map(d => +d[0]))]
          : [min, max !== 0 ? max : Math.max(...coordinates.map(d => +d[1]))]
      )
      .range(vertical ? [0, displayAreaWidth] : [displayAreaHeight, 0])

    let spacingScale: any
    if (banded) {
      spacingScale = scaleBand()
        .domain(vertical ? coordinates.map(d => d[1].toString()) : coordinates.map(d => d[0].toString()))
        .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
    } else {
      spacingScale = scaleLinear()
        .domain(vertical ? [0, Math.max(...coordinates.map(d => d[1]))] : [0, Math.max(...coordinates.map(d => d[0]))])
        .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
    }
    const x = (d: NumberValue[]) => {
      const space = banded ? spacingScale(d[0]) + spacingScale.bandwidth() / 2 : spacingScale(d[0])
      return vertical ? dataScale(d[0]) : space
    }
    const y = (d: NumberValue[]) => {
      const space = banded ? spacingScale(d[1]) + spacingScale.bandwidth() / 2 : spacingScale(d[1])
      return vertical ? space : dataScale(d[1])
    }

    coordinates.forEach((d, i) => {
      meta.push({
        class: 'point',
        id: `point${uuidv4()}`,
        pointDataMin: [x(d), dataScale(0)],
        pointData: [x(d), y(d)],
        radiusMin: 0,
        radius: radius
      })
    })

    const group = this.canvasDisplayGroup.append('g')
    group
      .selectAll('circle')
      .data(meta)
      .enter()
      .append('circle')
      .attr('class', d => d.class)
      .attr('id', d => d.id)
      .attr('cy', d => {
        return minimised ? d.pointDataMin[1] : d.pointData[1]
      })
      .attr('cx', d => {
        return minimised ? d.pointDataMin[0] : d.pointData[0]
      })
      .attr('r', minimised ? 0 : radius)
    return {
      points: group.selectAll(`.${meta[0].class}`),
      group,
      meta,
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('cy', d => {
            return d.pointData[1]
          })
          .attr('r', radius)
      },
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('cy', d => d.pointDataMin[1])
          .attr('r', 0)
      }
    }
  }

  horizontal(data: number[]) {
    return this.drawPoints({ data, vertical: false, banded: false, minimised: false })
  }

  vertical(data: number[]) {
    return this.drawPoints({ data, vertical: true, banded: false, minimised: false })
  }

  horizontalBanded(data: number[]) {
    return this.drawPoints({ data, vertical: false, banded: true, minimised: false })
  }

  verticalBanded(data: number[]) {
    return this.drawPoints({ data, vertical: true, banded: true, minimised: false })
  }

  horizontalMinimised(data: number[]) {
    return this.drawPoints({ data, vertical: false, banded: false, minimised: true })
  }

  verticalMinimised(data: number[]) {
    return this.drawPoints({ data, vertical: true, banded: false, minimised: true })
  }

  horizontalBandedMinimised(data: number[]) {
    return this.drawPoints({ data, vertical: false, banded: true, minimised: true })
  }

  verticalBandedMinimised(data: number[]) {
    return this.drawPoints({ data, vertical: true, banded: true, minimised: true })
  }
}
