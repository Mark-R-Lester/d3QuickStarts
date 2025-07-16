import { line } from 'd3'
import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../core/canvas/canvas'
import { QsRadialSpokesConfig, QsRadialSpokes } from './qsTypes'
import { CalculatedData, RadialSpokesConfig } from './types'
import { radialCentroidSpokesConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { generateClassName } from '../../core/generateClassName'

interface DrawArgs {
  data: number
}

export const radialSpokes = {
  spokes: (
    canvas: Canvas,
    data: number,
    customConfig?: QsRadialSpokesConfig
  ): QsRadialSpokes => {
    const config: RadialSpokesConfig = addDefaultsToConfig<RadialSpokesConfig>(
      radialCentroidSpokesConfig,
      customConfig,
      canvas.configStore.radialCentroid.spokesConfig()
    )
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialSpokesConfig
): QsRadialSpokes => {
  const { strokeColor, strokeOpacity } = config
  const { data } = args

  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

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
    .attr('stroke', strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', strokeOpacity)

  const transition = (data: number) => {
    const calculatedData: CalculatedData[] = getCalculatedData(
      canvas,
      data,
      config
    )
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
