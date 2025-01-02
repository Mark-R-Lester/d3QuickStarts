import { arc as d3arc, interpolate } from 'd3'
import { RadialTextConfigStrict } from './types'
import { BandData, Meta, getMeta, updateMeta } from './meta'
import { RadialTextType, ScaleType } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
} from '../../core/enums/qsEnums'
import { getRotationFunction } from './textRotation'
import { Canvas } from '../../d3QuickStart'
import {
  QsRadialTextConfig,
  QsRadialText,
  QsRadialTextTransitionData,
  QsValuedText,
} from './qsTypes'

interface DrawArgs {
  data: QsValuedText[]
  scaleType: ScaleType
  type: RadialTextType
}

const addDefaultsToConfig = (
  type: RadialTextType,
  customConfig?: QsRadialTextConfig
): RadialTextConfigStrict => {
  const getTextAnchor = (): QsEnumTextAnchor => {
    return type === RadialTextType.SPOKE
      ? QsEnumTextAnchor.START
      : QsEnumTextAnchor.MIDDLE
  }
  const getRadius = (): number => {
    return type === RadialTextType.ROTATED || type === RadialTextType.HORIZONTAL
      ? 107
      : 103
  }
  const defaults: RadialTextConfigStrict = {
    radius: getRadius(),
    x: 50,
    y: 50,
    textFont: QsEnumTextFont.SERIF,
    textFontSize: 5,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: 'black',
    textAngle: 0,
    textStroke: '',
    textAnchor: getTextAnchor(),
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const spoke = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(
    RadialTextType.SPOKE,
    customConfig
  )
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: RadialTextType.SPOKE,
  }
  return draw(canvas, args, config)
}

const horizontal = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(
    RadialTextType.HORIZONTAL,
    customConfig
  )
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: RadialTextType.HORIZONTAL,
  }
  return draw(canvas, args, config)
}

const rotated = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(
    RadialTextType.ROTATED,
    customConfig
  )
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: RadialTextType.ROTATED,
  }
  return draw(canvas, args, config)
}

const follow = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(
    RadialTextType.FOLLOW,
    customConfig
  )
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: RadialTextType.FOLLOW,
  }
  return draw(canvas, args, config)
}

const spokeBanded = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(
    RadialTextType.SPOKE,
    customConfig
  )
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: RadialTextType.SPOKE,
  }
  return draw(canvas, args, config)
}

const horizontalBanded = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(
    RadialTextType.HORIZONTAL,
    customConfig
  )
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: RadialTextType.HORIZONTAL,
  }
  return draw(canvas, args, config)
}

const rotatedBanded = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(
    RadialTextType.ROTATED,
    customConfig
  )
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: RadialTextType.ROTATED,
  }
  return draw(canvas, args, config)
}

const followBanded = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(
    RadialTextType.FOLLOW,
    customConfig
  )
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: RadialTextType.FOLLOW,
  }
  return draw(canvas, args, config)
}

export const radialText = {
  spoke,
  horizontal,
  rotated,
  follow,
  spokeBanded,
  horizontalBanded,
  rotatedBanded,
  followBanded,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialTextConfigStrict
): QsRadialText => {
  const { data, scaleType, type } = args
  const {
    textFont,
    textFontSize,
    textFontStyle,
    textFontWeight,
    textDecorationLine,
    textFill,
    textStroke,
    textAnchor,
    x,
    y,
  } = config

  let rotate: (angles: BandData) => number = getRotationFunction(type)

  let meta: Meta = getMeta(canvas, data, config, scaleType)
  const arc: any = d3arc()
  const group = canvas.displayGroup.append('g')
  const arcs = group.append('g')
  const text = group.append('g')

  if (type !== RadialTextType.FOLLOW) {
    text
      .selectAll(`.${meta.textClass}`)
      .data(meta.textArcData)
      .enter()
      .append('g')
      .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
      .append('text')
      .attr('class', (d) => d.textClass)
      .attr('id', (d) => d.textId)
      .attr('font-family', textFont)
      .attr('font-style', textFontStyle)
      .attr('font-weight', textFontWeight)
      .attr('font-size', `${meta.yAxis(textFontSize)}px`)
      .attr('text-decoration', textDecorationLine)
      .attr('fill', textFill)
      .attr('stroke', textStroke)
      .style('text-anchor', textAnchor)
      .attr(
        'transform',
        (d) => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`
      )
      .attr('dy', '0.35em')
      .text((d) => (d.data.text ? d.data.text : d.data.value.toFixed(0)))
  } else {
    arcs
      .selectAll(`.${meta.arcClass}`)
      .data(meta.textArcData)
      .enter()
      .append('path')
      .attr('class', (d) => d.arcClass)
      .attr('id', (d) => d.arcId)
      .attr('d', arc)
      .attr('stroke-width', 0)
      .attr('fill', 'none')
      .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
    text
      .selectAll(`.${meta.textClass}`)
      .data(meta.textArcData)
      .enter()
      .append('text')
      .attr('class', (d) => d.textClass)
      .attr('id', (d) => d.textId)
      .attr('font-family', textFont)
      .attr('font-style', textFontStyle)
      .attr('font-weight', textFontWeight)
      .attr('font-size', `${meta.yAxis(textFontSize)}px`)
      .attr('text-decoration', textDecorationLine)
      .attr('fill', textFill)
      .attr('stroke', textStroke)
      .style('text-anchor', textAnchor)
      .append('textPath')
      .attr('startOffset', '25%')
      .attr('xlink:href', (d) => `#${d.arcId}`)
      .text((d) => (d.data.text ? d.data.text : d.data.value.toFixed(0)))
  }
  return {
    elementText: text.selectAll('.text'),
    elementArcs: arcs.selectAll('.arc'),
    transition: (data: QsRadialTextTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      meta = updateMeta(canvas, data.data, config, scaleType, meta)

      if (type !== RadialTextType.FOLLOW) {
        text
          .selectAll('.text')
          .data(meta.textArcData)
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
              return d.data.value.toFixed(0)
            }
          })
      } else {
        arcs
          .selectAll('.arc')
          .data(meta.textArcData)
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

        meta.textArcData.forEach((d, i) => {
          const t = text.select(`#${d.textId}`)
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
                return d.data.value.toFixed(0)
              }
            })
        })
      }
    },
  }
}
