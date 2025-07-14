import { getCalculatedData, CalculatedData } from './calculatedData'
import { Canvas } from '../../core/canvas/canvas'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { RadialTextConfig } from './types'
import {
  QsRadialTextData,
  QsRadialTextConfig,
  QsRadialText,
  QsRadialTextTransitionData,
} from './qsTypes'
import { radialCentroidTextsConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const radialText = {
  text: (
    canvas: Canvas,
    data: QsRadialTextData[],
    customConfig?: QsRadialTextConfig
  ): QsRadialText => {
    const config: RadialTextConfig = addDefaultsToConfig<RadialTextConfig>(
      { ...radialCentroidTextsConfig },
      customConfig,
      { ...canvas.configStore.radialCentroid.textConfig() }
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsRadialTextData[],
  config: RadialTextConfig
): QsRadialText => {
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const { className, dotClassName } = generateClassName('radialCentroidText')
  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', className)
    .attr('id', (d) => d.id)
    .attr('x', (d) => d.coordinate.x)
    .attr('y', (d) => d.coordinate.y)
    .attr('font-family', (d) => d.textFont)
    .attr('font-style', (d) => d.textFontStyle)
    .attr('font-weight', (d) => d.textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
    .attr('text-decoration', (d) => d.textDecorationLine)
    .attr('fill', (d) => d.textFill)
    .attr('stroke', (d) => d.textStroke)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
    .style('text-anchor', (d) => d.textAnchor)
    .style('alignment-baseline', (d) => d.textAlignmentBaseline)
    .text((d) => d.text ?? d.value.toFixed(d.defaultDecimalPoints))
  return {
    element: group.selectAll(dotClassName),
    transition: (data: QsRadialTextTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data.data,
        config
      )
      group
        .selectAll(dotClassName)
        .data(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('cx', (d) => d.coordinate.x)
        .attr('cy', (d) => d.coordinate.y)
        .attr('font-family', (d) => d.textFont)
        .attr('font-style', (d) => d.textFontStyle)
        .attr('font-weight', (d) => d.textFontWeight)
        .attr('font-size', (d) => `${d.textFontSize}px`)
        .attr('text-decoration', (d) => d.textDecorationLine)
        .attr('fill', (d) => d.textFill)
        .attr('stroke', (d) => d.textStroke)
        .style('text-anchor', (d) => d.textAnchor)
        .style('alignment-baseline', (d) => d.textAlignmentBaseline)
        .text((d) => d.text ?? d.value.toFixed(d.defaultDecimalPoints))
    },
  }
}
