import { Canvas } from '../../d3QuickStart'
import {
  QsPlottedTextArgs,
  QsPlottedTextConfig,
  QsPlottedText,
} from './qsTypes'
import { PlottedTextConfigStrict } from './types'
import { plottedTextConfig } from '../../canvas/config'

interface DrawArgs {
  data: QsPlottedTextArgs[]
}

const addDefaultsToConfig = (
  customConfig?: QsPlottedTextConfig
): PlottedTextConfigStrict => {
  const defaults: PlottedTextConfigStrict = plottedTextConfig
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
