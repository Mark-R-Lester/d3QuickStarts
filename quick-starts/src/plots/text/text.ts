import { scaleLinear } from 'd3'
import { Canvas } from '../../d3QuickStart'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/enums/qsEnums'
import { QsTextArgs, QsTextConfig, QsText } from './qsTypes'

interface TextConfigStrict {
  [key: string]: number | string | undefined
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAngle: number
  textAnchor: QsEnumTextAnchor
  textStroke: string
  textAlignmentBaseline: QsEnumAlignmentBaseline
}

interface DrawArgs {
  data: QsTextArgs[]
}

const addDefaultsToConfig = (customConfig?: QsTextConfig): TextConfigStrict => {
  const defaults: TextConfigStrict = {
    textFont: QsEnumTextFont.SERIF,
    textFontSize: 5,
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

export const plottedText = {
  text: (
    canvas: Canvas,
    data: QsTextArgs[],
    customConfig?: QsTextConfig
  ): QsText => {
    const args: DrawArgs = { data }
    const config: TextConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: TextConfigStrict
): QsText => {
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
  const { displayAreaWidth, displayAreaHeight } = canvas.config
  const { data } = args

  const xScale = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yScale = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const text = canvas.displayGroup.append('g')
  text
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', `${yScale(textFontSize)}px`)
    .attr('text-decoration', textDecorationLine)
    .attr('fill', textFill)
    .attr('stroke', textStroke)
    .attr('transform', (d) => {
      return `translate(${xScale(d.x)}, ${yScale(d.y)})rotate(${textAngle})`
    })
    .style('text-anchor', textAnchor)
    .style('alignment-baseline', textAlignmentBaseline)
    .text((d) => d.text)
  return { element: text.selectAll('text') }
}
