import { QsCanvas } from '../../canvas/canvas'
import { arc as d3arc, Selection } from 'd3'
import { Meta, RadialAxisConfigStrict, getMeta } from './meta'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
} from '../../core/qsEnums'

export interface QsRadialAxisConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius?: number
  x?: number
  y?: number
  axisAngle?: number
  gap?: number
  colour?: string
  strokeWidth?: number
  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
  textAlignmentBaseline?: QsEnumAlignmentBaseline
}

export interface QsRadialAxis {
  textElement:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  ringsElement:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: number[], config: QsRadialAxisConfig) => void
}

interface DrawArgs {
  data: number[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialAxisConfig
): RadialAxisConfigStrict => {
  const defaults: RadialAxisConfigStrict = {
    radius: 100,
    x: 50,
    y: 50,
    axisAngle: 0,
    gap: 15,
    colour: 'black',
    strokeWidth: 0.3,
    textFont: QsEnumTextFont.SERIF,
    textFontSize: 4,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: 'black',
    textStroke: '',
    textAnchor: QsEnumTextAnchor.MIDDLE,
    textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const rings = (
  canvas: QsCanvas,
  data: number[],
  customConfig?: QsRadialAxisConfig
): QsRadialAxis => {
  const config: RadialAxisConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const qsRadialAxisGenerator = {
  rings,
}

const draw = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: RadialAxisConfigStrict
): QsRadialAxis => {
  const {
    x,
    y,
    colour,
    strokeWidth,
    textFont,
    textFontSize,
    textFontStyle,
    textFontWeight,
    textDecorationLine,
    textFill,
    textStroke,
    textAlignmentBaseline,
    textAnchor,
  } = config
  const { data } = args

  const meta: Meta[] = getMeta(canvas, data, config)

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
    .attr('d', (d) => arc(d.ringData))
    .attr('stroke', colour)
    .attr('stroke-width', strokeWidth)
    .attr('transform', (d) => `translate(${d.xAxis(x)}, ${d.yAxis(y)})`)
  group
    .selectAll('text')
    .data(meta)
    .enter()
    .append('text')
    .attr('class', (d) => d.textClass)
    .attr('id', (d) => d.textId)
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', (d) => `${d.yAxis(textFontSize)}px`)
    .attr('text-decoration', textDecorationLine)
    .attr('fill', textFill)
    .attr('stroke', textStroke)
    .style('text-anchor', textAnchor)
    .style('alignment-baseline', textAlignmentBaseline)
    .attr(
      'transform',
      (d) => `translate(${d.ringData.textLocation})rotate(${0})`
    )
    .text((d) => d.ringData.text)

  return {
    textElement: group.selectAll('text'),
    ringsElement: group.selectAll('ring'),
    transition: (data: number[], config: QsRadialAxisConfig) => {
      const transitionConfig = addDefaultsToConfig(config)
      const meta: Meta[] = getMeta(canvas, data, transitionConfig)
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
        .attr('font-size', (d) => `${d.yAxis(textFontSize)}px`)
        .attr('transform', (d) => {
          return `translate(${d.ringData.textLocation})`
        })
    },
  }
}
