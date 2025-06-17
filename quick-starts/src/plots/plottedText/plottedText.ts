import { Canvas } from '../../d3QuickStart'
import {
  QsPlottedTextArgs,
  QsPlottedTextConfig,
  QsPlottedText,
} from './qsTypes'
import { PlottedTextConfig } from './types'
import { plottedTextConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'

interface DrawArgs {
  data: QsPlottedTextArgs[]
}

export const plottedText = {
  text: (
    canvas: Canvas,
    data: QsPlottedTextArgs[],
    customConfig?: QsPlottedTextConfig
  ): QsPlottedText => {
    const args: DrawArgs = { data }
    const config: PlottedTextConfig = addDefaultsToConfig<PlottedTextConfig>(
      { ...plottedTextConfig },
      customConfig,
      { ...canvas.configStore.plotted.pointsConfig() }
    )
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: PlottedTextConfig
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
