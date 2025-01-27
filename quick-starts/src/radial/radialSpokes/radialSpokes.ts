import { line } from 'd3'
import { getCalculatedData } from './calculatedData'
import { Canvas } from '../../d3QuickStart'
import { QsRadialSpokesConfig, QsRadialSpokes } from './qsTypes'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
} from '../../core/enums/enums'
import { CalculatedData, RadialSpokesConfigStrict } from './types'

interface DrawArgs {
  data: number
}

const addDefaultsToConfig = (
  customConfig?: QsRadialSpokesConfig
): RadialSpokesConfigStrict => {
  const defaults: RadialSpokesConfigStrict = {
    radius: 100,
    innerRadius: 0,
    x: GlobalDefaultSettings.RADIAL_X,
    y: GlobalDefaultSettings.RADIAL_Y,
    strokeColor: GlobalDefaultColors.AXIS_COLOR,
    strokeWidth: GlobalDefaultSettings.LINE_STROKE_WIDTH,
    strokeOpacity: GlobalDefaultSettings.LINE_STROKE_OPACITY,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const radialSpokes = {
  spokes: (
    canvas: Canvas,
    data: number,
    customConfig?: QsRadialSpokesConfig
  ): QsRadialSpokes => {
    const config: RadialSpokesConfigStrict = addDefaultsToConfig(customConfig)
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialSpokesConfigStrict
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

  const group = canvas.displayGroup.append('g')
  group
    .selectAll('path')
    .data(calculatedData)
    .enter()
    .append('path')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('d', (d) => radialLine(d.lineData))
    .attr('fill', 'none')
    .attr('stroke', strokeColor)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-opacity', strokeOpacity)

  return {
    element: group.selectAll(`.${calculatedData[0].class}`),
    transition: (data: number) => {
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data,
        config
      )
      group
        .selectAll(`.${calculatedData[0].class}`)
        .data(calculatedData.map((d) => d.lineData))
        .transition()
        .duration(3000)
        .attr('d', radialLine)
    },
  }
}
