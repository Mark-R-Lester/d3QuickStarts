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

export interface QsValuedColor {
  value: string
  color: string
}

interface DrawArgs {
  data: QsValuedColor[]
}

interface Meta {
  x: number
  y: number
  tx: number
  ty: number
  width: number
  height: number
  colour: string
  value: string
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
  data: QsValuedColor[],
  customConfig: LegendConfig
) => {
  const config: LegendConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const legendGenerator = {
  legend,
}

const draw = (canvas: Canvas, args: DrawArgs, config: LegendConfigStrict) => {
  const { data } = args
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

  const getMeta = (): Meta[] => {
    const invertIndex = (array: any[], index: number) =>
      data.length - (index + 1)

    const meta: Meta[] = data.map((d, i) => {
      return {
        x: xScale(x),
        y: yScale(y + size + space * invertIndex(data, i)),
        tx: xScale(x + size * 1.3),
        ty: yScale(y + space * invertIndex(data, i)),
        width: xScale(size),
        height: xScale(size),
        colour: d.color,
        value: d.color,
      }
    })

    return meta
  }

  const meta: Meta[] = getMeta()

  const group = canvas.displayGroup.append('g')
  group
    .selectAll('.legend')
    .data(meta)
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
    .data(meta)
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
    transition: () => {},
  }
}
