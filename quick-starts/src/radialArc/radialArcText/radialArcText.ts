import { arc as d3arc, interpolate } from 'd3'
import {
  QsCalculatedDataRadialText,
  RadialArcTextConfig,
  TextArcData,
} from './types'
import { getCalculatedData, updateCalculatedData } from './calculatedData'
import { RadialTextType } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { getRotationFunction } from './textRotation'
import { Canvas } from '../../canvas/types'
import {
  QsRadialArcTextConfig,
  QsRadialArcText,
  QsRadialArcTextTransitionData,
  QsRadialTextData,
  QsRadialArcTextFollow,
} from './qsTypes'
import {
  radialArcTextConfigFollow,
  radialArcTextConfigHorizontal,
  radialArcTextConfigRotated,
  radialArcTextConfigSpoke,
} from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

export const radialArcText = {
  spoke: (
    canvas: Canvas,
    data: QsRadialTextData[],
    customConfig?: QsRadialArcTextConfig
  ): QsRadialArcText => {
    const config: RadialArcTextConfig =
      addDefaultsToConfig<RadialArcTextConfig>(
        radialArcTextConfigSpoke,
        customConfig,
        canvas.configStore.radialArc.textConfigSpoke()
      )

    return draw<QsRadialArcText>(canvas, data, RadialTextType.SPOKE, config)
  },
  horizontal: (
    canvas: Canvas,
    data: QsRadialTextData[],
    customConfig?: QsRadialArcTextConfig
  ): QsRadialArcText => {
    const config: RadialArcTextConfig =
      addDefaultsToConfig<RadialArcTextConfig>(
        radialArcTextConfigHorizontal,
        customConfig,
        canvas.configStore.radialArc.textConfigHorizontal()
      )

    return draw<QsRadialArcText>(
      canvas,
      data,
      RadialTextType.HORIZONTAL,
      config
    )
  },
  rotated: (
    canvas: Canvas,
    data: QsRadialTextData[],
    customConfig?: QsRadialArcTextConfig
  ): QsRadialArcText => {
    const config: RadialArcTextConfig =
      addDefaultsToConfig<RadialArcTextConfig>(
        radialArcTextConfigRotated,
        customConfig,
        canvas.configStore.radialArc.textConfigRotated()
      )

    return draw<QsRadialArcText>(canvas, data, RadialTextType.ROTATED, config)
  },
  follow: (
    canvas: Canvas,
    data: QsRadialTextData[],
    customConfig?: QsRadialArcTextConfig
  ): QsRadialArcTextFollow => {
    const config: RadialArcTextConfig =
      addDefaultsToConfig<RadialArcTextConfig>(
        radialArcTextConfigFollow,
        customConfig,
        canvas.configStore.radialArc.textConfigFollow()
      )

    return draw<QsRadialArcTextFollow>(
      canvas,
      data,
      RadialTextType.FOLLOW,
      config
    )
  },
}

const draw = <T>(
  canvas: Canvas,
  data: QsRadialTextData[],
  type: RadialTextType,
  config: RadialArcTextConfig
): T => {
  const {
    defaultDecimalPoints,
    textFont,
    textFontStyle,
    textFontWeight,
    textDecorationLine,
    textFill,
    textStroke,
    textAnchor,
  } = config

  const rotate: (angles: TextArcData) => number = getRotationFunction(type)

  let calculatedData: QsCalculatedDataRadialText = getCalculatedData(
    canvas,
    data,
    config
  )
  const arc: any = d3arc()
  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
  const arcs = group.append('g')
  const text = group.append('g')

  const { className, dotClassName } = generateClassName('radialArcText')
  const { className: classNameArc, dotClassName: dotClassNameArc } =
    generateClassName('radialArcTextArc')

  if (type !== RadialTextType.FOLLOW) {
    text
      .selectAll(dotClassName)
      .data(calculatedData.textArcData)
      .enter()
      .append('g')
      .attr('transform', `translate(${calculatedData.x}, ${calculatedData.y})`)
      .append('text')
      .attr('class', className)
      .attr('id', (d) => d.textId)
      .attr('font-family', textFont)
      .attr('font-style', textFontStyle)
      .attr('font-weight', textFontWeight)
      .attr('font-size', `${calculatedData.textFontSize}px`)
      .attr('text-decoration', textDecorationLine)
      .attr('fill', textFill)
      .attr('stroke', textStroke)
      .style('text-anchor', textAnchor)
      .attr(
        'transform',
        (d) => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`
      )
      .attr('dy', '0.35em')
      .text((d) =>
        d.data.text ? d.data.text : d.data.value.toFixed(defaultDecimalPoints)
      )
  } else {
    arcs
      .selectAll(dotClassNameArc)
      .data(calculatedData.textArcData)
      .enter()
      .append('path')
      .attr('class', classNameArc)
      .attr('id', (d) => d.arcId)
      .attr('d', arc)
      .attr('stroke-width', 0)
      .attr('fill', 'none')
      .attr('transform', `translate(${calculatedData.x}, ${calculatedData.y})`)
    text
      .selectAll(dotClassName)
      .data(calculatedData.textArcData)
      .enter()
      .append('text')
      .attr('class', className)
      .attr('id', (d) => d.textId)
      .attr('font-family', textFont)
      .attr('font-style', textFontStyle)
      .attr('font-weight', textFontWeight)
      .attr('font-size', `${calculatedData.textFontSize}px`)
      .attr('text-decoration', textDecorationLine)
      .attr('fill', textFill)
      .attr('stroke', textStroke)
      .style('text-anchor', textAnchor)
      .append('textPath')
      .attr('startOffset', '25%')
      .attr('xlink:href', (d) => `#${d.arcId}`)
      .text((d) =>
        d.data.text ? d.data.text : d.data.value.toFixed(defaultDecimalPoints)
      )
  }

  const transition = (
    transitionData: QsRadialArcTextTransitionData = { data }
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    calculatedData = updateCalculatedData(
      canvas,
      transitionData.data,
      config,
      calculatedData
    )

    if (type !== RadialTextType.FOLLOW) {
      text
        .selectAll(dotClassName)
        .data(calculatedData.textArcData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attrTween('transform', (d) => {
          const tweenStart = interpolate(d.startAngle, d.newStartAngle)
          const tweenEnd = interpolate(d.endAngle, d.newEndAngle)

          return function (t: number) {
            d.startAngle = tweenStart(t)
            d.endAngle = tweenEnd(t)

            return `translate(${arc.centroid(d)}) rotate(${rotate(d)})`
          }
        })
        .textTween((d) => {
          const tweenText = interpolate(d.data.value, d.newData.value)
          return (t: number) => {
            d.data.value = tweenText(t)
            return d.data.value.toFixed(defaultDecimalPoints)
          }
        })
    } else {
      arcs
        .selectAll(dotClassNameArc)
        .data(calculatedData.textArcData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attrTween('d', (d) => {
          const tweenStart = interpolate(d.startAngle, d.newStartAngle)
          const tweenEnd = interpolate(d.endAngle, d.newEndAngle)
          return function (t: number) {
            d.startAngle = tweenStart(t)
            d.endAngle = tweenEnd(t)
            return arc(d)
          }
        })

      calculatedData.textArcData.forEach((d, i) => {
        const t = text.select(dotClassName)
        t.selection().selectChildren().remove()
        t.append('textPath')
          .datum(d)
          .transition()
          .delay(args.delayInMiliSeconds)
          .duration(args.durationInMiliSeconds)
          .attr('startOffset', '25%')
          .attr('xlink:href', `#${d.arcId}`)
          .textTween((d) => {
            const tweenText = interpolate(d.data.value, d.newData.value)
            return (t: number) => {
              d.data.value = tweenText(t)
              return d.data.value.toFixed(defaultDecimalPoints)
            }
          })
      })
    }
  }
  return type === RadialTextType.FOLLOW
    ? ({
        className,
        classNameArc,
        calculatedData,
        transition,
      } as T)
    : ({
        className,
        calculatedData,
        transition,
      } as T)
}
