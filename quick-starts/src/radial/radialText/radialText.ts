import { arc as d3arc, interpolate } from 'd3'
import { RadialTextConfigStrict } from './types'
import {
  BandData,
  CalculatedData,
  getCalculatedData,
  updateCalculatedData,
} from './calculatedData'
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

export const radialText = {
  spoke: (
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
  },
  horizontal: (
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
  },
  rotated: (
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
  },
  follow: (
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
  },
  spokeBanded: (
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
  },
  horizontalBanded: (
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
  },
  rotatedBanded: (
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
  },
  followBanded: (
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
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialTextConfigStrict
): QsRadialText => {
  const { data, scaleType, type } = args
  const {
    textFont,
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

  let calculatedData: CalculatedData = getCalculatedData(
    canvas,
    data,
    config,
    scaleType
  )
  const arc: any = d3arc()
  const group = canvas.displayGroup.append('g')
  const arcs = group.append('g')
  const text = group.append('g')

  if (type !== RadialTextType.FOLLOW) {
    text
      .selectAll(`.${calculatedData.textClass}`)
      .data(calculatedData.textArcData)
      .enter()
      .append('g')
      .attr('transform', `translate(${calculatedData.x}, ${calculatedData.y})`)
      .append('text')
      .attr('class', (d) => d.textClass)
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
      .text((d) => (d.data.text ? d.data.text : d.data.value.toFixed(0)))
  } else {
    arcs
      .selectAll(`.${calculatedData.arcClass}`)
      .data(calculatedData.textArcData)
      .enter()
      .append('path')
      .attr('class', (d) => d.arcClass)
      .attr('id', (d) => d.arcId)
      .attr('d', arc)
      .attr('stroke-width', 0)
      .attr('fill', 'none')
      .attr('transform', `translate(${calculatedData.x}, ${calculatedData.y})`)
    text
      .selectAll(`.${calculatedData.textClass}`)
      .data(calculatedData.textArcData)
      .enter()
      .append('text')
      .attr('class', (d) => d.textClass)
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
      .text((d) => (d.data.text ? d.data.text : d.data.value.toFixed(0)))
  }
  return {
    elementText: text.selectAll('.text'),
    elementArcs: arcs.selectAll('.arc'),
    transition: (data: QsRadialTextTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      calculatedData = updateCalculatedData(
        canvas,
        data.data,
        config,
        scaleType,
        calculatedData
      )

      if (type !== RadialTextType.FOLLOW) {
        text
          .selectAll('.text')
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
              return d.data.value.toFixed(0)
            }
          })
      } else {
        arcs
          .selectAll('.arc')
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
