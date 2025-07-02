import { Canvas } from '../../core/canvas/canvas'
import {
  QsUnboundTextData,
  QsUnboundTextConfig,
  QsUnboundText,
  QsUnboundTextTransitionData,
} from './qsTypes'
import { UnboundTextConfig } from './types'
import { plottedTextConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import {
  CalculatedData,
  getCalculatedData,
  updateCalculatedData,
} from './calculatedData'
import { interpolate } from 'd3'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { generateClassName } from '../../core/generateClassName'

export const unboundText = (
  canvas: Canvas,
  data: QsUnboundTextData[],
  customConfig?: QsUnboundTextConfig
): QsUnboundText => {
  const config: UnboundTextConfig = addDefaultsToConfig<UnboundTextConfig>(
    { ...plottedTextConfig },
    customConfig,
    { ...canvas.configStore.plotted.pointsConfig() }
  )
  return draw(canvas, data, config)
}

const draw = (
  canvas: Canvas,
  data: QsUnboundTextData[],
  config: UnboundTextConfig
): QsUnboundText => {
  let calculatedData: CalculatedData[] = getCalculatedData(canvas, data, config)

  const { className, dotClassName } = generateClassName('radialCentroidArea')
  const group = canvas.canvasGroup.append('g')
  group
    .selectAll('text')
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
    .text(
      (d) =>
        d.text ??
        `${d.coordinate.x.toFixed(d.defaultDecimalPoints)}, ${d.coordinate.y.toFixed(d.defaultDecimalPoints)}`
    )

  const transition = (data: QsUnboundTextTransitionData) => {
    const args = addTransitionDefaults(data.transitionArgs)
    calculatedData = updateCalculatedData(
      canvas,
      data.data,
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
        const tweenX = interpolate(d.coordinate.x, d.newCoordinate.x)
        const tweenY = interpolate(d.coordinate.x, d.newCoordinate.x)
        return (t: number) => {
          d.coordinate.x = tweenX(t)
          d.coordinate.y = tweenY(t)
          return (
            d.text ??
            `${d.coordinate.x.toFixed(d.defaultDecimalPoints)}, ${d.coordinate.y.toFixed(d.defaultDecimalPoints)}`
          )
        }
      })
  }

  return { element: group.selectAll(dotClassName), transition }
}
