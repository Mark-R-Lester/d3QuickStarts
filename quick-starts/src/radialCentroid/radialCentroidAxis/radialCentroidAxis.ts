import { arc as d3arc } from 'd3'
import { getCalculatedData } from './calculatedData'
import { RadialAxisConfig, CalculatedData } from './types'
import { radialCentroidAxisConfig } from '../../core/config/configDefaults'
import { Canvas } from '../../canvas/types'
import {
  QsRadialAxisConfig,
  QsRadialAxis,
  QsRadialCentroidAxisTransitionData,
} from './qsTypes'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { generateClassName } from '../../core/generateClassName'

export const radialAxis = {
  rings: (canvas: Canvas, customConfig?: QsRadialAxisConfig): QsRadialAxis => {
    const config: RadialAxisConfig = addDefaultsToConfig<RadialAxisConfig>(
      radialCentroidAxisConfig,
      customConfig,
      canvas.configStore.radialCentroid.axisConfig()
    )
    return draw(canvas, config)
  },
}

const draw = (canvas: Canvas, config: RadialAxisConfig): QsRadialAxis => {
  const calculatedData: CalculatedData[] = getCalculatedData(canvas, config)

  const arc = d3arc()
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)

  const { className, dotClassName } = generateClassName('radialCentroidAxis')
  const { className: classNameText, dotClassName: dotClassNameText } =
    generateClassName('radialCentroidAxisText')
  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('path')
    .attr('class', className)
    .attr('id', (d) => d.ringId)
    .attr('d', (d) => arc(d.ringData))
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
  group
    .selectAll('text')
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', classNameText)
    .attr('id', (d) => d.textId)
    .attr('font-family', (d) => d.textFont)
    .attr('font-style', (d) => d.textFontStyle)
    .attr('font-weight', (d) => d.textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
    .attr('text-decoration', (d) => d.textDecorationLine)
    .attr('fill', (d) => d.textFill)
    .attr('stroke', (d) => d.textStroke)
    .style('text-anchor', (d) => d.textAnchor)
    .style('alignment-baseline', (d) => d.textAlignmentBaseline)
    .attr(
      'transform',
      (d) => `translate(${d.ringData.textLocation})rotate(${0})`
    )
    .text((d) => d.ringData.text)

  const transition = (transitionData: QsRadialCentroidAxisTransitionData) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)

    const calculatedData: CalculatedData[] = getCalculatedData(canvas, config)
    group
      .selectAll(dotClassName)
      .data(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('stroke-width', (d) => d.strokeWidth)
      .attr('d', (d) => arc(d.ringData))
    group
      .selectAll(dotClassNameText)
      .data(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('font-size', (d) => `${d.textFontSize}px`)
      .attr('transform', (d) => {
        return `translate(${d.ringData.textLocation})`
      })
  }

  return {
    textElement: group.selectAll(dotClassNameText),
    ringsElement: group.selectAll(dotClassName),
    transition,
  }
}
