import { getCalculatedData, updateCalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/types'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsCalculatedDataCentroidText, RadialTextConfig } from './types'
import {
  QsRadialCentroidTextData,
  QsRadialTextConfig,
  QsRadialText,
  QsRadialTextTransitionData,
} from './qsTypes'
import { radialCentroidTextsConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { interpolate } from 'd3'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const radialText = {
  text: (
    canvas: Canvas,
    data: QsRadialCentroidTextData[],
    customConfig?: QsRadialTextConfig
  ): QsRadialText => {
    const config: RadialTextConfig = addDefaultsToConfig<RadialTextConfig>(
      radialCentroidTextsConfig,
      customConfig,
      canvas.configStore.radialCentroid.textConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsRadialCentroidTextData[],
  config: RadialTextConfig
): QsRadialText => {
  let calculatedData: QsCalculatedDataCentroidText[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const { className, dotClassName } = generateClassName('radialCentroidText')

  const canvasGroup =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = canvasGroup.layer.append('g')

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

  const transition = (
    transitionData: QsRadialTextTransitionData = { data }
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    calculatedData = updateCalculatedData(
      canvas,
      transitionData.data,
      config,
      calculatedData
    )
    group
      .selectAll(dotClassName)
      .data(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('x', (d) => d.coordinate.x)
      .attr('y', (d) => d.coordinate.y)
      .attr('font-family', (d) => d.textFont)
      .attr('font-style', (d) => d.textFontStyle)
      .attr('font-weight', (d) => d.textFontWeight)
      .attr('font-size', (d) => `${d.textFontSize}px`)
      .attr('text-decoration', (d) => d.textDecorationLine)
      .attr('fill', (d) => d.textFill)
      .attr('stroke', (d) => d.textStroke)
      .style('text-anchor', (d) => d.textAnchor)
      .style('alignment-baseline', (d) => d.textAlignmentBaseline)
      .textTween((d) => {
        const tweenText = interpolate(d.value, d.newValue)
        return (t: number) => {
          d.value = tweenText(t)
          return d.text ?? d.value.toFixed(d.defaultDecimalPoints)
        }
      })
  }

  return {
    className,
    calculatedData,
    transition,
  }
}
