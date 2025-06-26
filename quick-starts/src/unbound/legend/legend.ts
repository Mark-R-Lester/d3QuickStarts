import { CalculatedData, getCalculatedData } from './calculatedData'
import { LegendConfig } from './types'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { QsLegendData, QsLegendConfig, QsLegend } from './qsTypes'
import { legendConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { Canvas } from '../../core/canvas/canvas'
import { generateClassName } from '../../core/generateClassName'

interface DrawArgs {
  data: QsLegendData[]
}

export const legend = (
  canvas: Canvas,
  data: QsLegendData[],
  customConfig?: QsLegendConfig
): QsLegend => {
  const config: LegendConfig = addDefaultsToConfig<LegendConfig>(
    { ...legendConfig },
    customConfig,
    { ...canvas.configStore.legend.legendConfig() }
  )
  const args: DrawArgs = { data }
  return draw(canvas, args, config)
}

const draw = (canvas: Canvas, args: DrawArgs, config: LegendConfig) => {
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

  const { className, dotClassName } = generateClassName('unboundLegend')
  const { className: classNameText, dotClassName: dotClassNameText } =
    generateClassName('unboundLegendText')
  const group = canvas.displayGroup.append('g')
  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('rect')
    .attr('class', className)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .attr('fill', (d) => d.fillColor)

  group
    .selectAll(dotClassNameText)
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', classNameText)
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
    elementShape: group.selectAll(dotClassName),
    elementText: group.selectAll(dotClassNameText),
    transition: (data: QsLegendData[], transisionArgs?: QsTransitionArgs) => {},
  }
}
