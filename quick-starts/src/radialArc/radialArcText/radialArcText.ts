import { arc as d3arc, interpolate } from 'd3'
import { RadialTextConfigStrict } from './types'
import {
  TextArcData,
  CalculatedData,
  getCalculatedData,
  updateCalculatedData,
} from './calculatedData'
import { RadialTextType } from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { QsEnumScaleType } from '../../core/enums/qsEnums'
import { getRotationFunction } from './textRotation'
import { Canvas } from '../../d3QuickStart'
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
} from '../../core/config'

interface DrawArgs {
  data: QsValuedText[]
  scaleType: QsEnumScaleType
  type: RadialTextType
}

const addDefaultsToConfig = (
  type: RadialTextType,
  customConfig?: QsRadialTextConfig
): RadialTextConfigStrict => {
  const getConfig = (type: RadialTextType): RadialTextConfigStrict => {
    const configs = {
      [RadialTextType.ROTATED]: { ...radialArcTextConfigRotated },
      [RadialTextType.HORIZONTAL]: { ...radialArcTextConfigHorizontal },
      [RadialTextType.FOLLOW]: { ...radialArcTextConfigFollow },
      [RadialTextType.SPOKE]: { ...radialArcTextConfigSpoke },
    }
    return configs[type]
  }

  const defaults: RadialTextConfigStrict = getConfig(type)
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
      scaleType: QsEnumScaleType.LINEAR,
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
      scaleType: QsEnumScaleType.LINEAR,
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
      scaleType: QsEnumScaleType.LINEAR,
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
      scaleType: QsEnumScaleType.LINEAR,
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
      scaleType: QsEnumScaleType.BANDED,
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
      scaleType: QsEnumScaleType.BANDED,
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
      scaleType: QsEnumScaleType.BANDED,
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
      scaleType: QsEnumScaleType.BANDED,
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
      .text((d) =>
        d.data.text ? d.data.text : d.data.value.toFixed(defaultDecimalPoints)
      )
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
      .text((d) =>
        d.data.text ? d.data.text : d.data.value.toFixed(defaultDecimalPoints)
      )
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
              return d.data.value.toFixed(defaultDecimalPoints)
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
                return d.data.value.toFixed(defaultDecimalPoints)
              }
            })
        })
      }
    },
  }
}
