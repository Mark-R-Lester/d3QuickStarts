import { BaseType, scaleLinear, Selection } from 'd3'

import { Meta, getMeta } from './meta'
import { LegendConfigStrict, QsLegendData } from './types'
import { QsTransitionArgs } from '../core/types/qsTypes'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../core/enums/qsEnums'
import { QsCanvas } from '../d3QuickStart'
export { QsLegendData } from './types'

export interface QsLegend {
  element: Selection<BaseType, unknown, SVGGElement, unknown>
  transition: (data: QsLegendData[], transisionArgs?: QsTransitionArgs) => void
}

export interface QsLegendConfig {
  [key: string]: number | string | undefined
  height?: number
  width?: number
  space?: number
  x?: number
  y?: number
  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAngle?: number
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
  textAlignmentBaseline?: QsEnumAlignmentBaseline
}

interface DrawArgs {
  data: QsLegendData[]
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
    textFont: QsEnumTextFont.SERIF,
    textFontSize: 10,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: 'black',
    textAngle: 0,
    textStroke: '',
    textAnchor: QsEnumTextAnchor.START,
    textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const legend = (
  canvas: QsCanvas,
  data: QsLegendData[],
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
    textFont,
    textFontSize,
    textFontStyle,
    textFontWeight,
    textDecorationLine,
    textFill,
    textStroke,
    textAlignmentBaseline,
    textAnchor,
    textAngle,
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
    .attr('fill', (d) => d.color)

  group
    .selectAll('text')
    .data(meta)
    .enter()
    .append('text')
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', `${percentScale(textFontSize)}px`)
    .attr('text-decoration', textDecorationLine)
    .attr('fill', textFill)
    .attr('stroke', textStroke)
    .style('text-anchor', textAnchor)
    .style('alignment-baseline', textAlignmentBaseline)
    .attr('transform', (d) => {
      return `translate(${d.textX}, ${d.textY})rotate(${textAngle})`
    })
    .text((d) => d.value)

  return {
    element: group.selectAll('.element'),
    transition: (data: QsLegendData[], transisionArgs?: QsTransitionArgs) => {},
  }
}
