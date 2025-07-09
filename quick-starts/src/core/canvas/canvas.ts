import { CanvasScales, getScales } from './getScales'
import { getGenerators, QsGenerator } from './generators'
import { CanvasConfig, ElementWithData } from './types'
import { Selection, select } from 'd3'
import { QsCanvas, QsCanvasConfig } from './qsTypes'
import { canvasConfig } from '../config/configDefaults'
import { ConfigGetters, ConfigStoreManager } from '../config/configStore.class'

export interface Canvas {
  canvasGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  canvasDataGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: CanvasConfig
  scales: CanvasScales
  configStore: ConfigGetters
  elements: ElementWithData[]
}

const addDefaultsToConfig = (customConfig?: QsCanvasConfig): CanvasConfig => {
  const defaults: CanvasConfig = { ...canvasConfig }
  if (!customConfig) return defaults
  if (customConfig.width) {
    defaults.height = (customConfig.width * 70) / 100
  }

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

export const qsCreateCanvas = (customConfig?: QsCanvasConfig): QsCanvas => {
  const config: CanvasConfig = addDefaultsToConfig(customConfig)

  const element = document.getElementById(config.chartName)
  if (element) element.innerHTML = ''

  return draw(`#${config.chartName}`, config)
}

const draw = (chartName: string, config: CanvasConfig): QsCanvas => {
  const scaleValues = (config: CanvasConfig): void => {
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

  const displayAreaWidth =
    config.width - (config.marginLeft + config.marginRight)
  const displayAreaHeight =
    config.height - (config.marginTop + config.marginBottom)

  const canvasSVG = select(chartName).append('svg')
  canvasSVG.attr('width', config.width).attr('height', config.height)
  canvasSVG
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('rx', config.rx)
    .attr('ry', config.ry)
    .attr('width', config.width)
    .attr('height', config.height)
    .style('stroke', config.borderColor)
    .style('fill', config.fillColor)
    .style('stroke-width', config.borderWidth)

  const canvasGroup = canvasSVG.append('g')
  canvasGroup
    .attr('class', 'displayGroup')
    .attr(
      'transform',
      'translate(' + config.marginLeft + ',' + config.marginTop + ')'
    )
    .attr('width', displayAreaWidth)
    .attr('height', displayAreaHeight)

  const canvasDataArea = canvasSVG
    .append('svg')
    .attr('width', displayAreaWidth)
    .attr('height', displayAreaHeight)
    .attr('x', config.marginLeft)
    .attr('y', config.marginTop)

  // Append a group to the nested SVG
  const canvasDataGroup = canvasDataArea
    .append('g')
    .attr('id', 'canvasDataGroup')
    .attr('transform', 'translate(0, 0)')
    .attr('width', displayAreaWidth)
    .attr('height', displayAreaHeight)

  const configManager = new ConfigStoreManager()
  const scales = getScales(config)

  const elements: ElementWithData[] = []
  const canvas: Canvas = {
    canvasGroup,
    canvasDataGroup,
    config,
    scales,
    configStore: configManager.getters,
    elements,
  }
  const generate: QsGenerator = getGenerators(canvas)

  return {
    canvasSVG: canvasSVG,
    canvasGroup,
    canvasDataGroup,
    config,
    generate,
    configStore: configManager.setters,
  }
}
