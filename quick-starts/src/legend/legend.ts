import { scaleLinear } from 'd3'
import { Canvas } from '../canvas/canvas'
import { Meta, getMeta } from './getMeta'
import { LegendConfigStrict, QsValuedColor } from './types'

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

interface DrawArgs {
  data: QsValuedColor[]
}

const addDefaultsToConfig = (
  customConfig?: LegendConfig
): LegendConfigStrict => {
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
  const config: LegendConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const legendGenerator = {
  legend,
}

const draw = (canvas: Canvas, args: DrawArgs, config: LegendConfigStrict) => {
  const { displayAreaHeight } = canvas.config
  const { data } = args
  const percentScale = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaHeight])

  const { size, textFill, textStroke, alignmentBaseline, textAnchor, font } =
    config

  const meta: Meta[] = getMeta(canvas, data, config)

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
