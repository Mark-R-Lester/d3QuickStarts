import { arc as d3arc, interpolate } from 'd3'
import { RadialTextConfig } from './types'
import {
  TextArcData,
  CalculatedData,
  getCalculatedData,
  updateCalculatedData,
} from './calculatedData'
import { RadialTextType } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { getRotationFunction } from './textRotation'
import { Canvas } from '../../core/canvas/canvas'
import {
  QsRadialTextConfig,
  QsRadialText,
  QsRadialTextTransitionData,
  QsValuedText,
} from './qsTypes'
import {
  radialArcTextConfigFollow,
  radialArcTextConfigHorizontal,
  radialArcTextConfigRotated,
  radialArcTextConfigSpoke,
} from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

interface DrawArgs {
  data: QsValuedText[]
  type: RadialTextType
}

export const radialText = {
  spoke: (
    canvas: Canvas,
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ): QsRadialText => {
    const config: RadialTextConfig = addDefaultsToConfig<RadialTextConfig>(
      { ...radialArcTextConfigSpoke },
      customConfig,
      { ...canvas.configStore.radialArc.textConfigSpoke() }
    )
    const args: DrawArgs = {
      data,
      type: RadialTextType.SPOKE,
    }
    return draw(canvas, args, config)
  },
  horizontal: (
    canvas: Canvas,
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ): QsRadialText => {
    const config: RadialTextConfig = addDefaultsToConfig<RadialTextConfig>(
      { ...radialArcTextConfigHorizontal },
      customConfig,
      { ...canvas.configStore.radialArc.textConfigHorizontal() }
    )
    const args: DrawArgs = {
      data,
      type: RadialTextType.HORIZONTAL,
    }
    return draw(canvas, args, config)
  },
  rotated: (
    canvas: Canvas,
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ): QsRadialText => {
    const config: RadialTextConfig = addDefaultsToConfig<RadialTextConfig>(
      { ...radialArcTextConfigRotated },
      customConfig,
      { ...canvas.configStore.radialArc.textConfigRotated() }
    )
    const args: DrawArgs = {
      data,
      type: RadialTextType.ROTATED,
    }
    return draw(canvas, args, config)
  },
  follow: (
    canvas: Canvas,
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ): QsRadialText => {
    const config: RadialTextConfig = addDefaultsToConfig<RadialTextConfig>(
      { ...radialArcTextConfigFollow },
      customConfig,
      { ...canvas.configStore.radialArc.textConfigFollow() }
    )
    const args: DrawArgs = {
      data,
      type: RadialTextType.FOLLOW,
    }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialTextConfig
): QsRadialText => {
  const { data, type } = args
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

  let rotate: (angles: TextArcData) => number = getRotationFunction(type)

  let calculatedData: CalculatedData = getCalculatedData(canvas, data, config)
  const arc: any = d3arc()
  const group = canvas.canvasDataGroup.append('g')
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
  return {
    elementText: text.selectAll(dotClassName),
    elementArcs: arcs.selectAll(dotClassNameArc),
    transition: (data: QsRadialTextTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      calculatedData = updateCalculatedData(
        canvas,
        data.data,
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
    },
  }
}
