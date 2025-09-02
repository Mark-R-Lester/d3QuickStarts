import { line } from 'd3'
import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../canvas/types'
import { QsRadialSpokesConfig, QsRadialSpokes } from './qsTypes'
import { CalculatedData, RadialSpokesConfig } from './types'
import { radialCentroidSpokesConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

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
  const calculatedData: CalculatedData[] = getCalculatedData(canvas, config)

  const radialLine = line()
    .x((d) => d[0])
    .y((d) => d[1])

  const { className, dotClassName } = generateClassName('radialCentroidSpoke')
  const canvasGroup = config.useDataArea
    ? canvas.canvasDataGroup
    : canvas.canvasGroup
  const group = canvasGroup.append('g')
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

  const transition = (data: number) => {
    const calculatedData: CalculatedData[] = getCalculatedData(canvas, config)
    group
      .selectAll(dotClassName)
      .data(calculatedData.map((d) => d.lineData))
      .transition()
      .duration(3000)
      .attr('d', radialLine)
  }

  return {
    element: group.selectAll(dotClassName),
    transition,
  }
}
