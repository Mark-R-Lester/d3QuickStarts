import { arc as d3arc, interpolate } from 'd3'
import { QsCalculatedDataArcText, ArcTextConfig, TextArcData } from './types'
import { getCalculatedData, updateCalculatedData } from './calculatedData'
import { RadialTextType } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { getRotationFunction } from './textRotation'
import { Canvas } from '../../canvas/types'
import {
  QsArcTextConfig,
  QsRadialArcText,
  QsArcTextTransitionData,
  QsArcTextData,
  QsArcTextFollow,
} from './qsTypes'
import {
  radialArcTextConfigFollow,
  radialArcTextConfigHorizontal,
  radialArcTextConfigRotated,
  radialArcTextConfigSpoke,
} from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const ArcText = {
  spoke: (
    canvas: Canvas,
    data: QsArcTextData[],
    customConfig?: QsArcTextConfig
  ): QsRadialArcText => {
    const config: ArcTextConfig = addDefaultsToConfig<ArcTextConfig>(
      radialArcTextConfigSpoke,
      customConfig,
      canvas.configStore.radialArc.textConfigSpoke()
    )

    return draw<QsRadialArcText>(canvas, data, RadialTextType.SPOKE, config)
  },
  horizontal: (
    canvas: Canvas,
    data: QsArcTextData[],
    customConfig?: QsArcTextConfig
  ): QsRadialArcText => {
    const config: ArcTextConfig = addDefaultsToConfig<ArcTextConfig>(
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
    data: QsArcTextData[],
    customConfig?: QsArcTextConfig
  ): QsRadialArcText => {
    const config: ArcTextConfig = addDefaultsToConfig<ArcTextConfig>(
      radialArcTextConfigRotated,
      customConfig,
      canvas.configStore.radialArc.textConfigRotated()
    )

    return draw<QsRadialArcText>(canvas, data, RadialTextType.ROTATED, config)
  },
  follow: (
    canvas: Canvas,
    data: QsArcTextData[],
    customConfig?: QsArcTextConfig
  ): QsArcTextFollow => {
    const config: ArcTextConfig = addDefaultsToConfig<ArcTextConfig>(
      radialArcTextConfigFollow,
      customConfig,
      canvas.configStore.radialArc.textConfigFollow()
    )

    return draw<QsArcTextFollow>(canvas, data, RadialTextType.FOLLOW, config)
  },
}

const draw = <T>(
  canvas: Canvas,
  data: QsArcTextData[],
  type: RadialTextType,
  config: ArcTextConfig
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

  let calculatedData: QsCalculatedDataArcText = getCalculatedData(
    canvas,
    data,
    config
  )
  const arc: any = d3arc()

  const { layer, layerActions } =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const arcs = layer.append('g')
  const text = layer.append('g')

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

  const transition = (transitionData: QsArcTextTransitionData = { data }) => {
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
        layerActions,
        calculatedData,
        transition,
      } as T)
    : ({
        className,
        layerActions,
        calculatedData,
        transition,
      } as T)
}
