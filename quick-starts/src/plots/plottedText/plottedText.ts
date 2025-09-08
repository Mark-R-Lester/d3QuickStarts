import { Canvas } from '../../canvas/types'
import {
  QsPlottedTextData,
  QsPlottedTextConfig,
  QsPlottedText,
  QsPlottedTextTransitionData,
} from './qsTypes'
import { QsCalculatedDataPlottedText, PlottedTextConfig } from './types'
import { plottedTextConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { getCalculatedData, updateCalculatedData } from './calculatedData'
import { interpolate } from 'd3'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumCoordinateView } from './qsEnums'

export const plottedText = {
  text: (
    canvas: Canvas,
    data: QsPlottedTextData[],
    customConfig?: QsPlottedTextConfig
  ): QsPlottedText => {
    const config: PlottedTextConfig = addDefaultsToConfig<PlottedTextConfig>(
      plottedTextConfig,
      customConfig,
      canvas.configStore.plotted.pointsConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsPlottedTextData[],
  config: PlottedTextConfig
): QsPlottedText => {
  let calculatedData: QsCalculatedDataPlottedText[] = getCalculatedData(
    canvas,
    data,
    config
  )
  const { useDataArea, defaultCooridinateView } = config
  const { className, dotClassName } = generateClassName('plottedText')

  const getCorrectText = (d: QsCalculatedDataPlottedText): string => {
    const { text, viewableCoordinate, defaultDecimalPoints } = d
    const { x, y } = viewableCoordinate
    const xFixed = x.toFixed(defaultDecimalPoints)
    const yFixed = y.toFixed(defaultDecimalPoints)

    if (text) return text
    if (defaultCooridinateView === QsEnumCoordinateView.SHOW_X) return xFixed
    if (defaultCooridinateView === QsEnumCoordinateView.SHOW_Y) return yFixed

    return `${xFixed}, ${yFixed}`
  }

  const canvasGroup = useDataArea ? canvas.canvasDataGroup : canvas.canvasGroup
  const group = canvasGroup.append('g')
  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', className)
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
    .text((d) => getCorrectText(d))

  const transition = (
    transitionData: QsPlottedTextTransitionData = { data }
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)
    calculatedData = updateCalculatedData(
      canvas,
      transitionData.data,
      config,
      calculatedData
    )

    group
      .selectAll(dotClassName)
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
      .textTween((d) => {
        const tweenX = interpolate(
          d.viewableCoordinate.x,
          d.newViewableCoordinate.x
        )
        const tweenY = interpolate(
          d.viewableCoordinate.y,
          d.newViewableCoordinate.y
        )
        return (t: number) => {
          d.coordinate.x = tweenX(t)
          d.coordinate.y = tweenY(t)
          return getCorrectText(d)
        }
      })
  }

  return { className, calculatedData, transition }
}
