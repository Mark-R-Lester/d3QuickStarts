import { Canvas } from '../canvas/canvas'
import {
  scaleLinear,
  scaleOrdinal,
  arc as d3arc,
  ScaleOrdinal,
  ScaleLinear,
} from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../core/conversion'

export interface RadialAxisConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
  fontSize?: number
  x?: number
  y?: number
  axisAngle?: number
  gap?: number
  colour?: string
  strokeWidth?: number
}

interface RadialAxisConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  fontSize: number
  x: number
  y: number
  axisAngle: number
  gap: number
  colour: string
  strokeWidth: number
}

interface RingData {
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  textLocation: number[]
  text: number | string
}

interface Meta {
  [key: string]: string | RingData
  ringId: string
  textId: string
  ringClass: string
  textClass: string
  ringDataMin: RingData
  ringData: RingData
}

interface DrawArgs {
  data: number[]
  minimised: boolean
}

const updateConfig = (
  customConfig?: RadialAxisConfig
): RadialAxisConfigStrict => {
  const defaults: RadialAxisConfigStrict = {
    radius: 100,
    fontSize: 4,
    x: 50,
    y: 50,
    axisAngle: 0,
    gap: 15,
    colour: 'black',
    strokeWidth: 0.3,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const rings = (
  canvas: Canvas,
  data: number[],
  customConfig?: RadialAxisConfig
) => {
  const config: RadialAxisConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data, minimised: false }
  return draw(canvas, args, config)
}

const ringsMinimised = (
  canvas: Canvas,
  data: number[],
  customConfig?: RadialAxisConfig
) => {
  const config: RadialAxisConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data, minimised: true }
  return draw(canvas, args, config)
}

export const radialAxisGenerator = {
  rings,
  ringsMinimised,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAxisConfigStrict
) => {
  const { radius, fontSize, x, y, axisAngle, gap, colour, strokeWidth } = config
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { data, minimised } = args

  const meta: Meta[] = []
  const ordinal = data.some((d) => typeof d === 'string')
  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])
  let ordialScale: ScaleOrdinal<string, unknown, never>
  let linearScale: ScaleLinear<number, number, never>
  if (ordinal) {
    ordialScale = scaleOrdinal().domain(toStrings(data)).range(data)
  } else {
    linearScale = scaleLinear()
      .domain([1, data.length])
      .range([
        lowestViewableValue ? lowestViewableValue : Math.min(...data),
        highestViewableValue ? highestViewableValue : Math.max(...data),
      ])
  }

  const nunberOfArcs = data.length
  const bandWidth = yAxis(radius / 2 / (nunberOfArcs - 1))
  data.forEach((d, i) => {
    const radians = axisAngle * (Math.PI / 180)
    const calculateTextPosition = () => {
      const hypotenuse: number = bandWidth * i
      const x: number = Math.sin(radians) * hypotenuse
      const y: number = Math.cos(radians) * hypotenuse * -1
      return [x + displayAreaWidth / 2, y + displayAreaHeight / 2]
    }
    const sin: number = gap / (bandWidth * (i + 1))
    let text: unknown
    if (ordinal) text = ordialScale(d.toString())
    else text = linearScale(i + 1)

    const handleText = (text: unknown): string => {
      if (typeof text === 'string') return text
      else if (typeof text === 'number')
        return (Math.round(text * 10) / 10).toString()
      else return ''
    }

    meta.push({
      ringId: `ring${uuidv4()}`,
      textId: `ringText${uuidv4()}`,
      ringClass: `ring`,
      textClass: `ringText`,
      ringDataMin: {
        innerRadius: 1,
        outerRadius: 1,
        startAngle: radians + Math.asin(sin),
        endAngle: radians + Math.PI * 2 - Math.asin(sin),
        textLocation: [displayAreaWidth / 2, displayAreaHeight / 2],
        text: handleText(text),
      },
      ringData: {
        innerRadius: bandWidth * i,
        outerRadius: bandWidth * i,
        startAngle: radians + Math.asin(sin),
        endAngle: radians + Math.PI * 2 - Math.asin(sin),
        textLocation: calculateTextPosition(),
        text: handleText(text),
      },
    })
  })

  const arc = d3arc()
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)
  const group = canvas.displayGroup.append('g')
  group
    .selectAll(`.${meta[0].ringClass}`)
    .data(meta)
    .enter()
    .append('path')
    .attr('class', (d) => d.ringClass)
    .attr('id', (d) => d.ringId)
    .attr('d', (d) => arc(minimised ? d.ringDataMin : d.ringData))
    .attr('stroke', colour)
    .attr('stroke-width', minimised ? 0 : strokeWidth)
    .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
  group
    .selectAll('text')
    .data(meta)
    .enter()
    .append('text')
    .attr('class', (d) => d.textClass)
    .attr('id', (d) => d.textId)
    .attr('fill', colour)
    .attr('font-size', `${yAxis(minimised ? 0 : fontSize)}px`)
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .attr(
      'transform',
      (d) =>
        `translate(${minimised ? d.ringDataMin.textLocation : d.ringData.textLocation})rotate(${0})`
    )
    .text((d) => d.ringData.text)

  return {
    text: group.selectAll('text'),
    rings: group.selectAll('ring'),
    group,
    meta,
    minimise: () => {
      group
        .selectAll(`.${meta[0].ringClass}`)
        .data(meta)
        .transition()
        .attr('stroke-width', 0)
        .attr('d', (d) => arc(d.ringDataMin))
      group
        .selectAll(`.${meta[0].textClass}`)
        .data(meta)
        .transition()
        .attr('font-size', `${0}px`)
        .attr('transform', (d) => {
          return `translate(${d.ringDataMin.textLocation})`
        })
    },
    maximise: () => {
      group
        .selectAll(`.${meta[0].ringClass}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('stroke-width', strokeWidth)
        .attr('d', (d) => arc(d.ringData))
      group
        .selectAll(`.${meta[0].textClass}`)
        .data(meta)
        .transition()
        .duration(3000)
        .attr('font-size', `${yAxis(fontSize)}px`)
        .attr('transform', (d) => {
          return `translate(${d.ringData.textLocation})`
        })
    },
  }
}
