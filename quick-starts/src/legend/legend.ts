import { BaseType, scaleLinear, Selection } from 'd3'
import { QsCanvas } from '../canvas/canvas'
import { Meta, getMeta } from './meta'
import { LegendConfigStrict, QsValuedColor } from './types'
import { QsTransitionArgs } from '../core/qsTypes'

export { QsValuedColor } from './types'

export interface QsLegend {
  element: Selection<BaseType, unknown, SVGGElement, unknown>
  transition: (data: QsValuedColor[], transisionArgs?: QsTransitionArgs) => void
}
export interface QsLegendConfig {
  [key: string]: number | string | undefined
  height?: number
  width?: number
  space?: number
  x?: number
  y?: number
  fontSize?: number

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
  customConfig?: QsLegendConfig
): LegendConfigStrict => {
  const defaults: LegendConfigStrict = {
    height: 2,
    width: 6,
    space: 10,
    x: 0,
    y: 0,
    fontSize: 10,
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
  canvas: QsCanvas,
  data: QsValuedColor[],
  customConfig: QsLegendConfig
): QsLegend => {
  const config: LegendConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const qsLegendGenerator = {
  legend,
}

const draw = (canvas: QsCanvas, args: DrawArgs, config: LegendConfigStrict) => {
  const { displayAreaHeight } = canvas.config
  const { data } = args
  const percentScale = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaHeight])

  const {
    fontSize,
    textFill,
    textStroke,
    alignmentBaseline,
    textAnchor,
    font,
  } = config

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
    .attr('fontsize', `${percentScale(fontSize)}px`)
    .attr('transform', (d) => {
      return `translate(${d.tx}, ${d.ty})rotate(${0})`
    })
    .style('textanchor', textAnchor)
    .style('alignmentbaseline', alignmentBaseline)
    .text((d) => d.value)

  return {
    element: group.selectAll('.element'),
    transition: (
      data: QsValuedColor[],
      transisionArgs?: QsTransitionArgs
    ) => {},
  }
}
