import { line } from 'd3'
import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/types'
import { QsCentroidSpokesConfig, QsCentroidSpokes } from './qsTypes'
import { QsCalculatedDataCentroidSpokes, CentroidSpokesConfig } from './types'
import { centroidSpokesConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

export const radialSpokes = {
  spokes: (
    canvas: Canvas,
    customConfig?: QsCentroidSpokesConfig
  ): QsCentroidSpokes => {
    const config: CentroidSpokesConfig =
      addDefaultsToConfig<CentroidSpokesConfig>(
        centroidSpokesConfig,
        customConfig,
        canvas.configStore.centroid.spokesConfig()
      )
    return draw(canvas, config)
  },
}

const draw = (
  canvas: Canvas,
  config: CentroidSpokesConfig
): QsCentroidSpokes => {
  const calculatedData: QsCalculatedDataCentroidSpokes[] = getCalculatedData(
    canvas,
    config
  )

  const radialLine = line()
    .x((d) => d[0])
    .y((d) => d[1])

  const { className, dotClassName } = generateClassName('centroidSpoke')
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
    .attr('d', (d) => radialLine(d.lineData))
    .attr('fill', 'none')
    .attr('stroke', (d) => d.strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', (d) => d.strokeOpacity)

  return {
    className,
    layerActions,
    calculatedData,
  }
}
