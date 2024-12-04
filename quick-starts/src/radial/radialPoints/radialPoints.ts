import { Canvas } from '../../canvas/canvas'
import { Selection } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { v4 as uuidv4 } from 'uuid'

export interface QsRadialPointsConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  x?: number
  y?: number
  pointRadius?: number
}

export interface QsRadialPoints {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[]) => void
}

interface RadialPointsConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  x: number
  y: number
  pointRadius: number
}

interface DrawArgs {
  data: number[]
}

interface Meta {
  id: string
  class: string
  pointData: number[]
}

const updateConfig = (
  customConfig?: QsRadialPointsConfig
): RadialPointsConfigStrict => {
  const defaults: RadialPointsConfigStrict = {
    x: 50,
    y: 50,
    pointRadius: 1.2,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const points = (
  canvas: Canvas,
  data: number[],
  customConfig?: QsRadialPointsConfig
): QsRadialPoints => {
  const config: RadialPointsConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const radialPointGenerator = {
  points,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialPointsConfigStrict
): QsRadialPoints => {
  const { x, y, pointRadius } = config
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaHeight,
    displayAreaWidth,
  } = canvas.config
  const { data } = args

  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])
  const xScale = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yScale = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const getMeta = (data: number[]): Meta[] => {
    const meta: Meta[] = []
    data.forEach((d, i) => {
      const radians = angleScale(i)
      const hypotenuse = radialScale(d)
      const x = Math.sin(radians) * hypotenuse
      const y = Math.cos(radians) * hypotenuse * -1

      meta.push({
        id: `radialPoint${uuidv4()}`,
        class: 'radialPoint',
        pointData: [x, y],
      })
    })
    return meta
  }

  const meta: Meta[] = getMeta(data)

  const dataPoints = canvas.displayGroup.append('g')
  dataPoints
    .selectAll('circle')
    .data(meta)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('cx', (d) => d.pointData[0])
    .attr('cy', (d) => d.pointData[1])
    .attr('r', yScale(pointRadius))
    .attr('transform', `translate(${xScale(x)}, ${yScale(y)})`)
  return {
    element: dataPoints.selectAll('circle'),
    transition: (data: number[]) => {
      const meta: Meta[] = getMeta(data)
      dataPoints
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('cx', (d) => d.pointData[0])
        .attr('cy', (d) => d.pointData[1])
        .attr('r', yScale(pointRadius))
    },
  }
}
