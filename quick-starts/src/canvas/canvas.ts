import { CanvasScales, getScales } from './getScales'
import { getGenerators, QsGenerator } from './generators'
import { CanvasConfigStrict } from './types'
import { Selection, select } from 'd3'
import { QsCanvas, QsCanvasConfig } from './qsTypes'

export interface Canvas {
  displayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: CanvasConfigStrict
  scales: CanvasScales
}

const addDefaultsToConfig = (
  customConfig?: QsCanvasConfig
): CanvasConfigStrict => {
  const defaults: CanvasConfigStrict = {
    chartName: '',
    width: 500,
    height: 70,
    marginRight: 7,
    marginLeft: 7,
    marginTop: 15,
    marginBottom: 15,
    highestViewableValue: 0,
    lowestViewableValue: 0,
    borderColor: 'lightgray',
    displayAreaHeight: 0,
    displayAreaWidth: 0,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export function qsCreateCanvas(customConfig?: QsCanvasConfig): QsCanvas {
  const config: CanvasConfigStrict = addDefaultsToConfig(customConfig)

  const element = document.getElementById(config.chartName)
  if (element) element.innerHTML = ''

  return draw(`#${config.chartName}`, config)
}

const draw = (chartName: string, config: CanvasConfigStrict): QsCanvas => {
  const scaleValues = (config: CanvasConfigStrict): void => {
    config.height = (config.width * config.height) / 100
    config.marginRight = (config.width * config.marginRight) / 100
    config.marginLeft = (config.width * config.marginLeft) / 100
    config.marginTop = (config.height * config.marginTop) / 100
    config.marginBottom = (config.height * config.marginBottom) / 100
    config.displayAreaHeight =
      config.height - (config.marginBottom + config.marginTop)
    config.displayAreaWidth =
      config.width - (config.marginLeft + config.marginRight)
  }
  scaleValues(config)

  const createSVG = (chartName: string) => {
    const svg = select(chartName).append('svg')
    svg.attr('width', config.width).attr('height', config.height)
    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', config.width)
      .attr('height', config.height)
      .style('stroke', config.borderColor)
      .style('fill', 'none')
      .style('stroke-width', '2')
    return svg
  }

  const createDisplayGroup = (
    svg: Selection<SVGSVGElement, unknown, HTMLElement, any>
  ) => {
    const displayGroup = svg.append('g')
    displayGroup
      .attr('class', 'displayGroup')
      .attr(
        'transform',
        'translate(' + config.marginLeft + ',' + config.marginTop + ')'
      )
      .attr('width', config.width - (config.marginLeft + config.marginRight))
      .attr('height', config.height - (config.marginTop + config.marginBottom))
    return displayGroup
  }

  const displayGroup = createDisplayGroup(createSVG(chartName))
  const scales = getScales(config)
  const canvas: Canvas = { displayGroup, config, scales }
  const generate: QsGenerator = getGenerators(canvas)
  return { displayGroup, config, generate }
}
