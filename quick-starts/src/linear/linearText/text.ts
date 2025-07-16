import { Canvas } from '../../core/canvas/canvas'
import {
  CalculatedData,
  getCalculatedData,
  updateCalculatedData,
} from './calculatedData'
import { TextConfig } from './types'
import { Orientation } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsTextData,
  QsText,
  QsTextConfig,
  QsTextTransitionData,
} from './qsTypes'
import { interpolate } from 'd3'
import { linearTextConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const linearText = {
  horizontal: (
    canvas: Canvas,
    data: QsTextData[],
    customConfig?: QsTextConfig
  ): QsText => {
    const config: TextConfig = addDefaultsToConfig<TextConfig>(
      linearTextConfig,
      customConfig,
      canvas.configStore.linear.textConfig()
    )
    return draw(canvas, data, Orientation.HORIZONTAL, config)
  },

  vertical: (
    canvas: Canvas,
    data: QsTextData[],
    customConfig?: QsTextConfig
  ): QsText => {
    const config: TextConfig = addDefaultsToConfig<TextConfig>(
      linearTextConfig,
      customConfig,
      canvas.configStore.linear.textConfig()
    )
    return draw(canvas, data, Orientation.VERTICAL, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsTextData[],
  orientation: Orientation,
  config: TextConfig
): QsText => {
  let calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    orientation,
    config
  )
  const { defaultDecimalPoints } = config

  const { className, dotClassName } = generateClassName('linearText')
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
    .attr('font-family', (d) => d.textFont)
    .attr('font-style', (d) => d.textFontStyle)
    .attr('font-weight', (d) => d.textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
    .attr('text-decoration', (d) => d.textDecorationLine)
    .attr('fill', (d) => d.textFill)
    .attr('stroke', (d) => d.textStroke)
    .attr(
      'transform',
      (d) =>
        `translate(${d.coordinate.x}, ${d.coordinate.y})rotate(${d.textAngle})`
    )
    .style('text-anchor', (d) => d.textAnchor)
    .style('alignment-baseline', (d) => d.textAlignmentBaseline)
    .text((d) => d.text ?? d.value.toFixed(defaultDecimalPoints))

  const transition = (transitionData: QsTextTransitionData = { data }) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)

    calculatedData = updateCalculatedData(
      canvas,
      transitionData.data,
      orientation,
      config,
      calculatedData
    )

    group
      .selectAll(dotClassName)
      .data(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('font-family', (d) => d.textFont)
      .attr('font-style', (d) => d.textFontStyle)
      .attr('font-weight', (d) => d.textFontWeight)
      .attr('font-size', (d) => `${d.textFontSize}px`)
      .attr('text-decoration', (d) => d.textDecorationLine)
      .attr('fill', (d) => d.textFill)
      .attr('stroke', (d) => d.textStroke)
      .attr('transform', (d) => {
        return `translate(${d.coordinate.x}, ${d.coordinate.y})rotate(${d.textAngle})`
      })
      .textTween((d) => {
        const tweenText = interpolate(d.value, d.newValue)
        return (t: number) => {
          d.value = tweenText(t)
          return d.text ?? d.value.toFixed(defaultDecimalPoints)
        }
      })
  }
  return {
    element: group.selectAll(dotClassName),
    transition: (data: QsTextTransitionData) => transition(data),
  }
}
