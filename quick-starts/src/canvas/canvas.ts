import { CanvasScales, getScales } from './getScales'
import { getGenerators, QsGenerator } from './generators'
import { CanvasConfig, ElementWithData } from './types'
import { Selection, select } from 'd3'
import { QsCanvas, QsCanvasConfig } from './qsTypes'
import { canvasConfig } from '../core/config/configDefaults'
import {
  ConfigGetters,
  ConfigStoreManager,
} from '../core/config/configStore.class'

export interface Canvas {
  displayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
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
    // config.height = (config.width * config.height) / 100
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
      .attr('rx', config.rx)
      .attr('ry', config.ry)
      .attr('width', config.width)
      .attr('height', config.height)
      .style('stroke', config.borderColor)
      .style('fill', config.fillColor)
      .style('stroke-width', config.borderWidth)
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

  const configManager = new ConfigStoreManager()
  const displayGroup = createDisplayGroup(createSVG(chartName))
  const scales = getScales(config)

  const elements: ElementWithData[] = []
  const canvas: Canvas = {
    displayGroup,
    config,
    scales,
    configStore: configManager.getters,
    elements,
  }
  const generate: QsGenerator = getGenerators(canvas)

  return { displayGroup, config, generate, configStore: configManager.setters }
}
