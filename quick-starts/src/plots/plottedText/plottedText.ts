import { Canvas } from '../../d3QuickStart'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../../core/enums/qsEnums'
import {
  QsPlottedTextArgs,
  QsPlottedTextConfig,
  QsPlottedText,
} from './qsTypes'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
} from '../../core/enums/enums'
import { PlottedTextConfigStrict } from './types'

interface DrawArgs {
  data: QsPlottedTextArgs[]
}

const addDefaultsToConfig = (
  customConfig?: QsPlottedTextConfig
): PlottedTextConfigStrict => {
  const defaults: PlottedTextConfigStrict = {
    textFont: QsEnumTextFont.SERIF,
    textFontSize: GlobalDefaultSettings.FONT_SIZE,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: GlobalDefaultColors.TEXT_FILL_COLOR,
    textAngle: GlobalDefaultSettings.TEXT_ANGLE,
    textStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
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
    data: QsPlottedTextArgs[],
    customConfig?: QsPlottedTextConfig
  ): QsPlottedText => {
    const args: DrawArgs = { data }
    const config: PlottedTextConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: PlottedTextConfigStrict
): QsPlottedText => {
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
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const { data } = args

  const text = canvas.displayGroup.append('g')
  text
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', `${genralPercentScale(textFontSize)}px`)
    .attr('text-decoration', textDecorationLine)
    .attr('fill', textFill)
    .attr('stroke', textStroke)
    .attr('transform', (d) => {
      return `translate(${xPercentScale(d.x)}, ${yPercentScale(d.y)})rotate(${textAngle})`
    })
    .style('text-anchor', textAnchor)
    .style('alignment-baseline', textAlignmentBaseline)
    .text((d) => d.text)
  return { element: text.selectAll('text') }
}
