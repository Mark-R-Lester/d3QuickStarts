import { Canvas } from '../../canvas/types'
import { getCalculatedData, updateCalculatedData } from './calculatedData'
import { QsCalculatedDataOrthogonalText, TextConfig } from './types'
import { Orientation } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsTextData,
  QsText,
  QsTextConfig,
  QsTextTransitionData,
} from './qsTypes'
import { interpolate } from 'd3'
import { orthogonalTextConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const orthogonalText = {
  horizontal: (
    canvas: Canvas,
    data: QsTextData[],
    customConfig?: QsTextConfig
  ): QsText => {
    const config: TextConfig = addDefaultsToConfig<TextConfig>(
      orthogonalTextConfig,
      customConfig,
      canvas.configStore.orthogonal.textConfig()
    )
    return draw(canvas, data, Orientation.HORIZONTAL, config)
  },

  vertical: (
    canvas: Canvas,
    data: QsTextData[],
    customConfig?: QsTextConfig
  ): QsText => {
    const config: TextConfig = addDefaultsToConfig<TextConfig>(
      orthogonalTextConfig,
      customConfig,
      canvas.configStore.orthogonal.textConfig()
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
  let calculatedData: QsCalculatedDataOrthogonalText[] = getCalculatedData(
    canvas,
    data,
    orientation,
    config
  )
  const { defaultDecimalPoints } = config

  const { className, dotClassName } = generateClassName('orthogonalText')
  const { layer, layerActions } =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = layer.append('g')

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

  const transition = (transitionData: QsTextTransitionData) => {
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
    className,
    layerActions,
    calculatedData,
    transition,
  }
}
