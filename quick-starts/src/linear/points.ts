import { scaleLinear, scaleBand, NumberValue, range, Selection } from 'd3'
import { Canvas } from '../d3QuickStart'
import { v4 as uuidv4 } from 'uuid'

export interface QsPointsConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
}

export interface QsPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[]) => void
}

interface PointsConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
}

interface DrawArgs {
  data: number[]
  vertical: boolean
  banded: boolean
}

interface Meta {
  class: string
  id: string
  pointData: any[]
  radiusMin: number
  radius: number
}

const updateConfig = (customConfig?: QsPointsConfig): PointsConfigStrict => {
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
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: false,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const vertical = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: false,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const horizontalBanded = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    vertical: false,
    banded: true,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const verticalBanded = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsPointsConfig
): QsPoints => {
  const args: DrawArgs = {
    data,
    vertical: true,
    banded: true,
  }
  const config: PointsConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const linearPointGenerator = {
  horizontal,
  horizontalBanded,
  vertical,
  verticalBanded,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: PointsConfigStrict
): QsPoints => {
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { radius } = config
  const { data, vertical, banded } = args
  const pointSpacing = range(
    0,
    displayAreaWidth,
    displayAreaWidth / data.length
  )

  const getCoordinates = (data: number[]): number[][] =>
    data.map((d, i) => (vertical ? [d, pointSpacing[i]] : [pointSpacing[i], d]))

  const coordinates: number[][] = getCoordinates(data)

  const dataScale = scaleLinear()
    .domain(
      vertical
        ? [
            lowestViewableValue,
            highestViewableValue !== 0
              ? highestViewableValue
              : Math.max(...coordinates.map((d) => +d[0])),
          ]
        : [
            lowestViewableValue,
            highestViewableValue !== 0
              ? highestViewableValue
              : Math.max(...coordinates.map((d) => +d[1])),
          ]
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

  const getMeta = (data: number[]): Meta[] => {
    const coordinates = getCoordinates(data)
    const meta: Meta[] = coordinates.map((d, i) => {
      return {
        class: 'point',
        id: `point${uuidv4()}`,
        pointData: [x(d), y(d)],
        radiusMin: 0,
        radius: radius,
      }
    })
    return meta
  }

  const meta: Meta[] = getMeta(data)

  const group = canvas.displayGroup.append('g')
  group
    .selectAll('circle')
    .data(meta)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('cy', (d) => {
      return d.pointData[1]
    })
    .attr('cx', (d) => {
      return d.pointData[0]
    })
    .attr('r', radius)
  return {
    element: group.selectAll(`.${meta[0].class}`),
    transition: (data: number[]) => {
      const meta = getMeta(data)
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
  }
}
