import { scaleLinear, scaleBand, NumberValue, range } from 'd3'
import { Canvas } from '../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'

export interface PointsConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
}

interface PointsConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
}

interface DrawArgs {
  data: number[]
  vertical: boolean
  banded: boolean
  minimised: boolean
}

interface Meta {
  class: string
  id: string
  pointDataMin: any[]
  pointData: any[]
  radiusMin: number
  radius: number
}

const updateConfig = (customConfig?: PointsConfig): PointsConfigStrict => {
  const defaults: PointsConfigStrict = {
    radius: 3,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const horizontal = (
  canvas: Canvas,
  data: number[],
  customConfig?: PointsConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: false,
    minimised: false,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: Canvas,
  data: number[],
  customConfig?: PointsConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: false,
    minimised: false,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalBanded = (
  canvas: Canvas,
  data: number[],
  customConfig?: PointsConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: true,
    minimised: false,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const verticalBanded = (
  canvas: Canvas,
  data: number[],
  customConfig?: PointsConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: true,
    minimised: false,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: PointsConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: false,
    minimised: true,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const verticalMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: PointsConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: false,
    minimised: true,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalBandedMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: PointsConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: true,
    minimised: true,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const verticalBandedMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: PointsConfig
) => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: true,
    minimised: true,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearPointGenerator = {
  horizontal,
  horizontalBanded,
  vertical,
  verticalBanded,
  horizontalMinimised,
  horizontalBandedMinimised,
  verticalMinimised,
  verticalBandedMinimised,
}

const draw = (canvas: Canvas, args: DrawArgs, config: PointsConfigStrict) => {
  const { displayAreaHeight, displayAreaWidth, min, max } = canvas.config
  const { radius } = config
  const { data, vertical, banded, minimised } = args

  const meta: Meta[] = []
  const pointSpacing = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.length
  )
  const coordinates = data.map((d, i) =>
    vertical ? [d, pointSpacing[i]] : [pointSpacing[i], d]
  )
  const dataScale = scaleLinear()
    .domain(
      vertical
        ? [min, max !== 0 ? max : Math.max(...coordinates.map((d) => +d[0]))]
        : [min, max !== 0 ? max : Math.max(...coordinates.map((d) => +d[1]))]
    )
    .range(vertical ? [0, displayAreaWidth] : [displayAreaHeight, 0])

  let spacingScale: any
  if (banded) {
    spacingScale = scaleBand()
      .domain(
        vertical
          ? coordinates.map((d) => d[1].toString())
          : coordinates.map((d) => d[0].toString())
      )
      .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  } else {
    spacingScale = scaleLinear()
      .domain(
        vertical
          ? [0, Math.max(...coordinates.map((d) => d[1]))]
          : [0, Math.max(...coordinates.map((d) => d[0]))]
      )
      .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth])
  }
  const x = (d: NumberValue[]) => {
    const space = banded
      ? spacingScale(d[0]) + spacingScale.bandwidth() / 2
      : spacingScale(d[0])
    return vertical ? dataScale(d[0]) : space
  }
  const y = (d: NumberValue[]) => {
    const space = banded
      ? spacingScale(d[1]) + spacingScale.bandwidth() / 2
      : spacingScale(d[1])
    return vertical ? space : dataScale(d[1])
  }

  coordinates.forEach((d, i) => {
    meta.push({
      class: 'point',
      id: `point${uuidv4()}`,
      pointDataMin: [x(d), dataScale(0)],
      pointData: [x(d), y(d)],
      radiusMin: 0,
      radius: radius,
    })
  })

  const group = canvas.displayGroup.append('g')
  group
    .selectAll('circle')
    .data(meta)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('cy', (d) => {
      return minimised ? d.pointDataMin[1] : d.pointData[1]
    })
    .attr('cx', (d) => {
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
        .attr('cy', (d) => {
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
        .attr('cy', (d) => d.pointDataMin[1])
        .attr('r', 0)
    },
  }
}
