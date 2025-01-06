import { getCalculatedData, CalculatedData } from './calculatedData'
import { Canvas } from '../../d3QuickStart'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'
import { RadialPointsConfigStrict } from './types'
import { GlobalDefaultStrings } from '../../core/enums/enums'
import {
  QsRadialPointData,
  QsRadialPointsConfig,
  QsRadialPoints,
  QsRadialPointsTransitionData,
} from './qsTypes'

interface DrawArgs {
  data: QsRadialPointData[]
}

const addDefaultsToConfig = (
  customConfig?: QsRadialPointsConfig
): RadialPointsConfigStrict => {
  const defaults: RadialPointsConfigStrict = {
    x: 50,
    y: 50,
    pointRadius: 1.2,
    defaultColor: GlobalDefaultStrings.COLOR,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const radialPoint = {
  points: (
    canvas: Canvas,
    data: QsRadialPointData[],
    customConfig?: QsRadialPointsConfig
  ): QsRadialPoints => {
    const config: RadialPointsConfigStrict = addDefaultsToConfig(customConfig)
    const args: DrawArgs = { data }
    return draw(canvas, args, config)
  },
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialPointsConfigStrict
): QsRadialPoints => {
  const { data } = args
  const calculatedData: CalculatedData[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const dataPoints = canvas.displayGroup.append('g')
  dataPoints
    .selectAll('circle')
    .data(calculatedData)
    .enter()
    .append('circle')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('cx', (d) => d.coordinate.x)
    .attr('cy', (d) => d.coordinate.y)
    .attr('fill', (d) => d.color)
    .attr('r', (d) => d.pointRadius)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
  return {
    element: dataPoints.selectAll('circle'),
    transition: (data: QsRadialPointsTransitionData) => {
      const args = addTransitionDefaults(data.transitionArgs)
      const calculatedData: CalculatedData[] = getCalculatedData(
        canvas,
        data.data,
        config
      )
      dataPoints
        .selectAll(`.${calculatedData[0].class}`)
        .data(calculatedData)
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attr('cx', (d) => d.coordinate.x)
        .attr('cy', (d) => d.coordinate.y)
        .attr('r', (d) => d.pointRadius)
        .attr('fill', (d) => d.color)
    },
  }
}
