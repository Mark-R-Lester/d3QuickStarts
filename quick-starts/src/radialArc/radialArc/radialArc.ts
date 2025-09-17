import { interpolate } from 'd3'
import {
  QsCalculatedDataArc,
  ArcSliceConfig,
  ArcData,
  ArcEnvelopeConfig,
  ArcSegmentConfig,
} from './types'
import { getCalculatedData, updateCalculatedData } from './calculatedData'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { Canvas } from '../../canvas/types'
import {
  QsArcSliceConfig,
  QsRadial,
  QsArcTransitionData,
  QsArcSliceData,
  QsArcSegmentData,
  QsArcEnvelopeData,
  QsArcSegmentTransitionData,
  QsArcEnvelopeTransitionData,
  QsArcSegmentConfig,
  QsArcEnvelopeConfig,
} from './qsTypes'
import {
  arcConfig,
  arcEnvelopeConfig,
  arcSegmentConfig,
} from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { parallelPaddedArc } from '../../core/customShapes/arc/parallelPaddedArc'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const arc = (
  canvas: Canvas,
  data: QsArcSliceData[],
  customConfig?: QsArcSliceConfig
): QsRadial => {
  const config: ArcSliceConfig = addDefaultsToConfig<ArcSliceConfig>(
    arcConfig,
    customConfig,
    canvas.configStore.arc.arcSliceConfig()
  )
  const convert = (qsArcDataArray: QsArcSliceData[]): ArcData[] =>
    qsArcDataArray.map((qsArcData) => ({
      ...qsArcData,
      valueArc: qsArcData.valueArc,
      valueRad: undefined,
    }))
  return draw(canvas, convert(data), config)
}

export const segment = (
  canvas: Canvas,
  data: QsArcSegmentData[],
  customConfig?: QsArcSegmentConfig
): QsRadial => {
  const config: ArcSegmentConfig = addDefaultsToConfig<ArcSegmentConfig>(
    arcSegmentConfig,
    customConfig,
    canvas.configStore.arc.arcSegmentConfig()
  )
  const convert = (array: QsArcSegmentData[]): ArcData[] =>
    array.map((data) => ({
      ...data,
      valueArc: 1,
      valueRad: data.valueRad,
    }))
  return draw(canvas, convert(data), config)
}

export const envelope = (
  canvas: Canvas,
  data: QsArcEnvelopeData[],
  customConfig?: QsArcEnvelopeConfig
): QsRadial => {
  const config: ArcEnvelopeConfig = addDefaultsToConfig<ArcEnvelopeConfig>(
    arcEnvelopeConfig,
    customConfig,
    canvas.configStore.arc.arcEnvelopeConfig()
  )
  return draw(canvas, data, config)
}

const draw = (
  canvas: Canvas,
  data: ArcData[],
  config: ArcSliceConfig | ArcEnvelopeConfig | ArcSegmentConfig
): QsRadial => {
  let calculatedData: QsCalculatedDataArc[] = getCalculatedData(
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
    .attr('class', className)
    .attr('id', (d) => d.id)
    .attr('stroke', 'none')
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
    .attr('d', (d) => parallelPaddedArc(d.arcData))
    .attr('fill', (d) => d.arcData.fillColor)
    .attr('fill-opacity', (d) => d.arcData.fillOpacity)
    .attr('stroke', (d) => d.arcData.strokeColor)
    .attr('stroke-opacity', (d) => d.arcData.strokeOpacity)
    .attr('stroke-width', (d) => d.arcData.strokeWidth)

  const transition = (
    transitionData:
      | QsArcTransitionData
      | QsArcSegmentTransitionData
      | QsArcEnvelopeTransitionData
  ) => {
    const args = addTransitionDefaults(transitionData.transitionArgs)

    const processData = (
      data: QsArcSliceData[] | QsArcSegmentData[] | QsArcEnvelopeData[]
    ): ArcData[] => {
      return data.map((item, index) => {
        return {
          ...item,
          valueArc: item?.valueArc ?? 1,
          valueRad: item?.valueRad ?? canvas.config.displayAreaHeight / 2,
        }
      })
    }

    calculatedData = updateCalculatedData(
      canvas,
      processData(transitionData.data),
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
