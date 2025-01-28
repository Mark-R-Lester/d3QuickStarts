import { Canvas } from '../../d3QuickStart'
import { CalculatedData, getCalculatedData } from './calculatedData'
import { DrawArgs, TextConfigStrict } from './types'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
  Orientation,
  ScaleType,
} from '../../core/enums/enums'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import {
  QsTextData,
  QsText,
  QsTextConfig,
  QsTextTransitionData,
} from './qsTypes'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
} from '../../core/enums/qsEnums'

const addDefaultsToConfig = (customConfig?: QsTextConfig): TextConfigStrict => {
  const defaults: TextConfigStrict = {
    defaultDecimalPoints: GlobalDefaultSettings.DECIMAL_POINTS,
    defaultTextFont: QsEnumTextFont.SERIF,
    defaultTextFontSize: GlobalDefaultSettings.FONT_SIZE,
    defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
    defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
    defaultTextDecorationLine: QsEnumTextDecorationLine.NORMAL,
    defaultTextFill: GlobalDefaultColors.TEXT_FILL_COLOR,
    defaultTextAngle: GlobalDefaultSettings.TEXT_ANGLE,
    defaultTextStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
    defaultTextAnchor: QsEnumTextAnchor.START,
    defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const linearText = {
  horizontal: (
    canvas: Canvas,
    data: QsTextData[],
    customConfig?: QsTextConfig
  ): QsText => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.HORIZONTAL,
      scaleType: ScaleType.LINEAR,
    }
    const config: TextConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  vertical: (
    canvas: Canvas,
    data: QsTextData[],
    customConfig?: QsTextConfig
  ): QsText => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.VERTICAL,
      scaleType: ScaleType.LINEAR,
    }
    const config: TextConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  horizontalBanded: (
    canvas: Canvas,
    data: QsTextData[],
    customConfig?: QsTextConfig
  ): QsText => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.HORIZONTAL,
      scaleType: ScaleType.BANDED,
    }
    const config: TextConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
  verticalBanded: (
    canvas: Canvas,
    data: QsTextData[],
    customConfig?: QsTextConfig
  ): QsText => {
    const args: DrawArgs = {
      data,
      orientation: Orientation.VERTICAL,
      scaleType: ScaleType.BANDED,
    }
    const config: TextConfigStrict = addDefaultsToConfig(customConfig)
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: TextConfigStrict
): QsText => {
  const { orientation, scaleType } = args

  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    args,
    config
  )

  const group = canvas.displayGroup.append('g')

  group
    .selectAll('text')
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('font-family', (d) => d.textFont)
    .attr('font-style', (d) => d.textFontStyle)
    .attr('font-weight', (d) => d.textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
    .attr('text-decoration', (d) => d.textDecorationLine)
    .attr('fill', (d) => d.textFill)
    .attr('stroke', (d) => d.textStroke)
    .attr('transform', (d) => {
      return `translate(${d.coordinate.x}, ${d.coordinate.y})rotate(${d.textAngle})`
    })
    .style('text-anchor', (d) => d.textAnchor)
    .style('alignment-baseline', (d) => d.textAlignmentBaseline)
    .text((d) => d.text)

  const transition = (data: QsTextTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    const drawArgs: DrawArgs = { data: data.data, orientation, scaleType }
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      drawArgs,
      config
    )

    group
      .selectAll(`.${calculatedData[0].class}`)
      .data(calculatedData)
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('font-family', (d) => d.textFont)
      .attr('font-style', (d) => d.textFontStyle)
      .attr('font-weight', (d) => d.textFontWeight)
      .attr('font-size', (d) => `${d.textFontSize}px`)
      .attr('text-decoration', (d) => d.textDecorationLine)
      .attr('fill', (d) => d.textFill)
      .attr('stroke', (d) => d.textStroke)
      .attr('transform', (d) => {
        return `translate(${d.coordinate.x}, ${d.coordinate.y})rotate(${d.textAngle})`
      })
  }
  return {
    element: group.selectAll(`.${calculatedData[0].class}`),
    transition: (data: QsTextTransitionData) => transition(data),
  }
}
