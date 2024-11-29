import { Canvas } from '../canvas/canvas'
import { scaleLinear } from 'd3-scale'

export interface LegendConfig {
  [key: string]: number | string | undefined
  size?: number
  space?: number
  x?: number
  y?: number
  font?: string
  fill?: string
  stroke?: string
  alignmentBaseline?: string
  textAnchor?: string
  angle?: number
}

interface LegendConfigStrict {
  [key: string]: number | string | undefined
  size: number
  space: number
  x: number
  y: number
  font: string
  fill: string
  stroke: string
  alignmentBaseline: string
  textAnchor: string
  angle: number
}

export interface LegendArgs {
  data: string[][]
  minimised: boolean
}

interface LegendData {
  x: number
  y: number
  tx: number
  ty: number
  width: number
  height: number
  colour: string
  value: string
}

interface LegendMeta {
  dataMin: LegendData[]
  data: LegendData[]
}

const updateConfig = (customConfig?: LegendConfig): LegendConfigStrict => {
  const defaults: LegendConfigStrict = {
    size: 3,
    space: 10,
    x: 0,
    y: 0,
    font: 'sansserif',
    fill: 'black',
    stroke: '',
    alignmentBaseline: 'middle',
    textAnchor: 'start',
    angle: 0,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const legend = (
  canvas: Canvas,
  data: string[][],
  customConfig: LegendConfig
) => {
  const config: LegendConfigStrict = updateConfig(customConfig)
  const args: LegendArgs = { data, minimised: false }
  return draw(canvas, args, config)
}

export const legendGenerator = {
  legend,
}

const draw = (canvas: Canvas, args: LegendArgs, config: LegendConfigStrict) => {
  const meta: LegendMeta[] = []
  const { data, minimised } = args
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const {
    size,
    space,
    x,
    y,
    textFill,
    textStroke,
    alignmentBaseline,
    textAnchor,
    font,
  } = config

  const xScale = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yScale = scaleLinear().domain([0, 100]).range([displayAreaHeight, 0])
  const percentScale = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaHeight])

  meta.push({
    dataMin: data.map((d, i) => {
      return {
        x: xScale(x),
        y: yScale(y + size + space * i),
        tx: xScale(x + size + space),
        ty: yScale(y + size * 0.5 + space * i),
        width: xScale(size),
        height: xScale(size),
        colour: d[0],
        value: d[1],
      }
    }),
    data: data.map((d, i) => {
      return {
        x: xScale(x),
        y: yScale(y + size + space * i),
        tx: xScale(x + size * 1.3),
        ty: yScale(y + space * i),
        width: xScale(size),
        height: xScale(size),
        colour: d[0],
        value: d[1],
      }
    }),
  })

  const group = canvas.displayGroup.append('g')
  group
    .selectAll('.legend')
    .data(minimised ? meta[0].dataMin : meta[0].data)
    .enter()
    .append('rect')
    .attr('class', 'legend')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .attr('fill', (d) => d.colour)

  group
    .selectAll('text')
    .data(minimised ? meta[0].dataMin : meta[0].data)
    .enter()
    .append('text')
    .attr('font', font)
    .attr('fill', textFill ? textFill : null)
    .attr('stroke', textStroke ? textStroke : null)
    .attr('fontsize', `${percentScale(size)}px`)
    .attr('transform', (d) => {
      return `translate(${d.tx}, ${d.ty})rotate(${0})`
    })
    .style('textanchor', textAnchor)
    .style('alignmentbaseline', alignmentBaseline)
    .text((d) => d.value)

  return {
    element: group.selectAll('.element'),
    group,
    meta,
    minimised: () => {},
    maximised: () => {},
  }
}
