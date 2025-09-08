import { line } from 'd3'
import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/types'
import { QsRadialSpokesConfig, QsRadialSpokes } from './qsTypes'
import { QsCalculatedDataCentroidSpokes, RadialSpokesConfig } from './types'
import { radialCentroidSpokesConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const radialSpokes = {
  spokes: (
    canvas: Canvas,
    customConfig: QsRadialSpokesConfig
  ): QsRadialSpokes => {
    const config: RadialSpokesConfig = addDefaultsToConfig<RadialSpokesConfig>(
      radialCentroidSpokesConfig,
      customConfig,
      canvas.configStore.radialCentroid.spokesConfig()
    )
    return draw(canvas, config)
  },
}

const draw = (canvas: Canvas, config: RadialSpokesConfig): QsRadialSpokes => {
  const calculatedData: QsCalculatedDataCentroidSpokes[] = getCalculatedData(
    canvas,
    config
  )

  const radialLine = line()
    .x((d) => d[0])
    .y((d) => d[1])

  const { className, dotClassName } = generateClassName('radialCentroidSpoke')
  const canvasGroup =
    config.layerType === QsEnumLayerType.DATA
      ? canvas.addDataLayer()
      : canvas.addUnboundLayer()
  const group = canvasGroup.layer.append('g')

  group
    .selectAll(dotClassName)
    .data(calculatedData)
    .enter()
    .append('path')
    .attr('class', className)
    .attr('id', (d) => d.id)
    .attr('d', (d) => radialLine(d.lineData))
    .attr('fill', 'none')
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)

  return {
    className,
    calculatedData,
  }
}
