import { arc as d3arc } from 'd3'
import { getCalculatedData } from './calculatedData'
import { RadialAxisConfig, CalculatedData } from './types'
import { radialCentroidAxisConfig } from '../../core/config/configDefaults'
import { Canvas } from '../../core/canvas/canvas'
import {
  QsRadialAxisConfig,
  QsRadialAxis,
  QsRadialCentroidAxisTransitionData,
} from './qsTypes'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { generateClassName } from '../../core/generateClassName'

interface DrawArgs {
  data: number[]
}

export const radialAxis = {
  rings: (
    canvas: Canvas,
    data: number[],
    customConfig?: QsRadialAxisConfig
  ): QsRadialAxis => {
    const config: RadialAxisConfig = addDefaultsToConfig<RadialAxisConfig>(
      { ...radialCentroidAxisConfig },
      customConfig,
      { ...canvas.configStore.radialCentroid.axisConfig() }
    )
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAxisConfig
): QsRadialAxis => {
  const {
    strokeColor,
    strokeOpacity,
    textFont,
    textFontStyle,
    textFontWeight,
    textDecorationLine,
    textFill,
    textStroke,
    textAlignmentBaseline,
    textAnchor,
  } = config
  const { data } = args

  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

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
    .attr('stroke', strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', strokeOpacity)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
  group
    .selectAll('text')
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', classNameText)
    .attr('id', (d) => d.textId)
    .attr('font-family', textFont)
    .attr('font-style', textFontStyle)
    .attr('font-weight', textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
    .attr('text-decoration', textDecorationLine)
    .attr('fill', textFill)
    .attr('stroke', textStroke)
    .style('text-anchor', textAnchor)
    .style('alignment-baseline', textAlignmentBaseline)
    .attr(
      'transform',
      (d) => `translate(${d.ringData.textLocation})rotate(${0})`
    )
    .text((d) => d.ringData.text)

  return {
    textElement: group.selectAll(dotClassNameText),
    ringsElement: group.selectAll(dotClassName),
    transition: (data: QsRadialCentroidAxisTransitionData) => {
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
    },
  }
}
