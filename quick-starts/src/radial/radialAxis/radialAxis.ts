import { arc as d3arc } from 'd3'
import {
  CalculatedData,
  RadialAxisConfigStrict,
  getCalculatedData,
} from './calculatedData'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
} from '../../core/enums/qsEnums'
import { Canvas, QsRadialAxis, QsRadialAxisConfig } from '../../d3QuickStart'
import { GlobalDefaultColors } from '../../core/enums/enums'

interface DrawArgs {
  data: number[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialAxisConfig
): RadialAxisConfigStrict => {
  const defaults: RadialAxisConfigStrict = {
    radius: 100,
    x: 50,
    y: 50,
    axisAngle: 0,
    gap: 15,
    fillColor: GlobalDefaultColors.AXIS_COLOR,
    strokeWidth: 0.3,
    textFont: QsEnumTextFont.SERIF,
    textFontSize: 4,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: 'black',
    textStroke: '',
    textAnchor: QsEnumTextAnchor.MIDDLE,
    textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const radialAxis = {
  rings: (
    canvas: Canvas,
    data: number[],
    customConfig?: QsRadialAxisConfig
  ): QsRadialAxis => {
    const config: RadialAxisConfigStrict = addDefaultsToConfig(customConfig)
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAxisConfigStrict
): QsRadialAxis => {
  const {
    fillColor,
    strokeWidth,
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
  const group = canvas.displayGroup.append('g')
  group
    .selectAll(`.${calculatedData[0].ringClass}`)
    .data(calculatedData)
    .enter()
    .append('path')
    .attr('class', (d) => d.ringClass)
    .attr('id', (d) => d.ringId)
    .attr('d', (d) => arc(d.ringData))
    .attr('stroke', fillColor)
    .attr('stroke-width', strokeWidth)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
  group
    .selectAll('text')
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', (d) => d.textClass)
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
    textElement: group.selectAll('text'),
    ringsElement: group.selectAll('ring'),
    transition: (data: number[], config: QsRadialAxisConfig) => {
      const transitionConfig = addDefaultsToConfig(config)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data,
        transitionConfig
      )
      group
        .selectAll(`.${calculatedData[0].ringClass}`)
        .data(calculatedData)
        .transition()
        .duration(3000)
        .attr('stroke-width', strokeWidth)
        .attr('d', (d) => arc(d.ringData))
      group
        .selectAll(`.${calculatedData[0].textClass}`)
        .data(calculatedData)
        .transition()
        .duration(3000)
        .attr('font-size', (d) => `${d.textFontSize}px`)
        .attr('transform', (d) => {
          return `translate(${d.ringData.textLocation})`
        })
    },
  }
}
