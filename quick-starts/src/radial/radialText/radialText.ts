import { QsCanvas } from '../../canvas/canvas'
import { arc as d3arc, interpolate, Selection } from 'd3'
import { QsValuedText, RadialTextConfigStrict } from './types'
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
import { QsTransitionArgs } from '../../core/types/qsTypes'

export { QsValuedText } from './types'

export interface QsRadialTextConfig {
  [key: string]: string | number | undefined
  radius?: number
  x?: number
  y?: number
  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
}

export interface QsRadialTextTransitionArgs extends QsTransitionArgs {}

export interface QsRadialTextTransitionData {
  data: QsValuedText[]
  transitionArgs?: QsRadialTextTransitionArgs
}

export interface QsRadialText {
  elementText:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  elementArcs:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialTextTransitionData) => void
}

interface DrawArgs {
  data: QsValuedText[]
  scaleType: ScaleType
  type: RadialTextType
}

const addDefaultsToConfig = (
  customConfig?: QsRadialTextConfig
): RadialTextConfigStrict => {
  const defaults: RadialTextConfigStrict = {
    radius: 100,
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
    textAnchor: QsEnumTextAnchor.MIDDLE,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const spoke = (
  canvas: QsCanvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: RadialTextType.SPOKE,
  }
  return draw(canvas, args, config)
}

const horizontal = (
  canvas: QsCanvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: RadialTextType.HORIZONTAL,
  }
  return draw(canvas, args, config)
}

const rotated = (
  canvas: QsCanvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: RadialTextType.ROTATED,
  }
  return draw(canvas, args, config)
}

const follow = (
  canvas: QsCanvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: RadialTextType.FOLLOW,
  }
  return draw(canvas, args, config)
}

const spokeBanded = (
  canvas: QsCanvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: RadialTextType.SPOKE,
  }
  return draw(canvas, args, config)
}

const horizontalBanded = (
  canvas: QsCanvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: RadialTextType.HORIZONTAL,
  }
  return draw(canvas, args, config)
}

const rotatedBanded = (
  canvas: QsCanvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: RadialTextType.ROTATED,
  }
  return draw(canvas, args, config)
}

const followBanded = (
  canvas: QsCanvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = addDefaultsToConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: RadialTextType.FOLLOW,
  }
  return draw(canvas, args, config)
}

export const qsRadialTextGenerator = {
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
  canvas: QsCanvas,
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

  let rotate: (angles: { startAngle: number; endAngle: number }) => number

  if (type === RadialTextType.SPOKE) {
    rotate = (d) => {
      let angle: number = d.startAngle + (d.endAngle - d.startAngle) / 2
      angle = angle * (180 / Math.PI)
      return angle - 90
    }
  }

  if (type === RadialTextType.HORIZONTAL) {
    rotate = (d) => {
      return 0
    }
  }

  if (type === RadialTextType.ROTATED) {
    rotate = (d) => {
      let angle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (angle = angle * (180 / Math.PI))
    }
  }

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
      .text((d) => (d.data.text ? d.data.text : d.data.value))
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
      .text((d) => (d.data.text ? d.data.text : d.data.value))
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
          .attr('d', arc)
          .attr('stroke-width', 0)
          .attr('fill', 'none')
          .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
          .transition()
          .delay(args.delayInMiliSeconds)
          .duration(args.durationInMiliSeconds)
          .attr('font-size', `${meta.yAxis(textFontSize)}px`)
          .attr(
            'transform',
            (d) => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`
          )
      } else {
        arcs
          .selectAll('.arc')
          .data(meta.textArcData)
          .attr('d', (d) => arc(d))
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

        //   text
        //     .selectAll(`.${meta.textClass}`)
        //     .data(meta.textArcData)
        //     .enter()
        //     .append('text')
        //     .attr('font-size', `${meta.yAxis(fontSize)}px`)
        //     .attr('class', (d) => d.textClass)
        //     .attr('id', (d) => d.textId)
        //     .append('textPath')
        //     .attr('startOffset', '25%')
        //     .style('text-anchor', 'middle')
        //     .attr('xlink:href', (d) => `#${d.arcId}`)
        //     .text((d) => (d.data.text ? d.data.text : d.data.value))
        // }
      }
    },
  }
}
