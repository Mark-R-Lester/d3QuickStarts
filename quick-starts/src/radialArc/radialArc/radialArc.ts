import { interpolate } from 'd3'
import { QsCalculatedDataRadialArc, RadialArcConfig } from './types'
import { getCalculatedData, updateCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { Canvas } from '../../canvas/types'
import {
  QsRadialArcConfig,
  QsRadial,
  QsRadialTransitionData,
  QsRadialData,
} from './qsTypes'
import { radialArcConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { parallelPaddedArc } from '../../core/customShapes/parallelPaddedArc'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const radialArc = {
  radial: (
    canvas: Canvas,
    data: QsRadialData[],
    customConfig?: QsRadialArcConfig
  ): QsRadial => {
    const config: RadialArcConfig = addDefaultsToConfig<RadialArcConfig>(
      radialArcConfig,
      customConfig,
      canvas.configStore.radialArc.arcConfig()
    )
    return draw(canvas, data, config)
  },
}

const draw = (
  canvas: Canvas,
  data: QsRadialData[],
  config: RadialArcConfig
): QsRadial => {
  let calculatedData: QsCalculatedDataRadialArc[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const { className, dotClassName } = generateClassName('centroidArea')
  const { layer, layerActions } =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = layer.append('g')

  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('path')
    .attr('class', (d) => className)
    .attr('id', (d) => d.id)
    .attr('stroke', 'none')
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
    .attr('d', (d) => parallelPaddedArc(d.arcData))
    .attr('fill', (d) => d.arcData.fillColor)
    .attr('fill-opacity', (d) => d.arcData.fillOpacity)
    .attr('stroke', (d) => d.arcData.strokeColor)
    .attr('stroke-opacity', (d) => d.arcData.strokeOpacity)
    .attr('stroke-width', (d) => d.arcData.strokeWidth)

  const transition = (transitionData: QsRadialTransitionData = { data }) => {
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
      .attr('d', (d) => parallelPaddedArc(d.arcData))
      .transition()
      .delay(args.delayInMiliSeconds)
      .duration(args.durationInMiliSeconds)
      .attr('fill', (d) => d.arcData.fillColor)
      .attr('fill-opacity', (d) => d.arcData.fillOpacity)
      .attr('stroke', (d) => d.arcData.strokeColor)
      .attr('stroke-opacity', (d) => d.arcData.strokeOpacity)
      .attr('stroke-width', (d) => d.arcData.strokeWidth)
      .attrTween('d', (d) => {
        const tweenStart = interpolate(
          d.arcData.startAngle,
          d.arcData.newStartAngle
        )
        const tweenEnd = interpolate(d.arcData.endAngle, d.arcData.newEndAngle)

        return function (t: number) {
          d.arcData.startAngle = tweenStart(t)
          d.arcData.endAngle = tweenEnd(t)

          return parallelPaddedArc(d.arcData)
        }
      })
  }

  return {
    className,
    layerActions,
    calculatedData,
    transition,
  }
}
