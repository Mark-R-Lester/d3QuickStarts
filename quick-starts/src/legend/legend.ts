import { CalculatedData, getCalculatedData } from './calculatedData'
import { LegendConfigStrict } from './types'
import { QsTransitionArgs } from '../core/types/qsTypes'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../core/enums/qsEnums'
import { Canvas } from '../d3QuickStart'
import { QsLegendData, QsLegendConfig, QsLegend } from './qsTypes'

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
  canvas: Canvas,
  data: QsLegendData[],
  customConfig?: QsLegendConfig
): QsLegend => {
  const config: LegendConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

export const plottedLegend = {
  legend,
}

const draw = (canvas: Canvas, args: DrawArgs, config: LegendConfigStrict) => {
  const { data } = args
  const {
    textFont,
    textFontStyle,
    textFontWeight,
    textDecorationLine,
    textFill,
    textStroke,
    textAlignmentBaseline,
    textAnchor,
    textAngle,
  } = config

  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )
  const group = canvas.displayGroup.append('g')
  group
    .selectAll('.legend')
    .data(calculatedData)
    .enter()
    .append('rect')
    .attr('class', 'legend')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .attr('fill', (d) => d.fillColor)

  group
    .selectAll('text')
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
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
