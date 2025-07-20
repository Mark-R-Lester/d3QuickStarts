import { Selection, select } from 'd3'
import { canvasConfig } from '../../core/config/configDefaults'
import {
  ConfigGetters,
  ConfigStoreManager,
} from '../../core/config/configStore.class'
import { generateClassName } from '../../core/generateClassName'
import { QsGeneratorPlotted, getGenerators } from './generatorsPlotted'
import { CanvasScales, getScales } from '../../core/scales/getScales'
import { CanvasConfig, ElementWithData } from '../types'
import { QsCanvasPlotted, QsCanvasConfig } from '../qsTypes'

export interface Canvas {
  canvasGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  canvasDataGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
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

export const qsCreateCanvas = (
  customConfig?: QsCanvasConfig
): QsCanvasPlotted => {
  const config: CanvasConfig = addDefaultsToConfig(customConfig)

  const element = document.getElementById(config.chartName)
  if (element) element.innerHTML = ''

  return draw(`#${config.chartName}`, config)
}

const draw = (chartName: string, config: CanvasConfig): QsCanvasPlotted => {
  const scaleValues = (config: CanvasConfig): CanvasConfig => {
    const marginRight = (config.width * config.marginRight) / 100
    const marginLeft = (config.width * config.marginLeft) / 100
    const marginTop = (config.height * config.marginTop) / 100
    const marginBottom = (config.height * config.marginBottom) / 100

    return {
      ...config,
      marginRight,
      marginLeft,
      marginTop,
      marginBottom,
      displayAreaHeight: config.height - (marginBottom + marginTop),
      displayAreaWidth: config.width - (marginLeft + marginRight),
    }
  }
  const adjustedConfig = scaleValues(config)

  const { className: classCanvasSVG, dotClassName: dotClassCanvasSVG } =
    generateClassName('canvasSVG')
  const { className: classCanvasRect, dotClassName: dotClassCanvasRect } =
    generateClassName('canvasRect')
  const { className: classCanvasGroup, dotClassName: dotClassCanvasGroup } =
    generateClassName('canvasGroup')
  const { className: classDataSVG, dotClassName: dotClassDataSVG } =
    generateClassName('dataSVG')
  const { className: classDataGroup, dotClassName: dotClassDataGroup } =
    generateClassName('dataGroup')

  const canvasSVG = select(chartName)
    .append('svg')
    .datum(adjustedConfig)
    .attr('class', classCanvasSVG)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)

  const rect = canvasSVG
    .append('rect')
    .attr('class', classCanvasRect)
    .datum(adjustedConfig)
    .attr('x', 0)
    .attr('y', 0)
    .attr('rx', (d) => d.rx)
    .attr('ry', (d) => d.ry)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .style('stroke', (d) => d.borderColor)
    .style('fill', (d) => d.fillColor)
    .style('stroke-width', (d) => d.borderWidth)

  const canvasGroup = canvasSVG
    .append('g')
    .attr('class', classCanvasGroup)
    .datum(adjustedConfig)
    .attr('transform', (d) => `translate(${d.marginLeft}, ${d.marginTop})`)
    .attr('width', (d) => d.displayAreaWidth)
    .attr('height', (d) => d.displayAreaHeight)

  const dataSVG = canvasSVG
    .append('svg')
    .datum(adjustedConfig)
    .attr('class', classDataSVG)
    .attr('width', (d) => d.displayAreaWidth)
    .attr('height', (d) => d.displayAreaHeight)
    .attr('x', (d) => d.marginLeft)
    .attr('y', (d) => d.marginTop)

  const dataGroup = dataSVG
    .append('g')
    .datum(adjustedConfig)
    .attr('class', classDataGroup)
    .attr('id', 'canvasDataGroup')
    .attr('transform', 'translate(0, 0)')
    .attr('width', (d) => d.displayAreaWidth)
    .attr('height', (d) => d.displayAreaHeight)

  const configManager = new ConfigStoreManager()
  const scales = getScales(adjustedConfig)

  const elements: ElementWithData[] = []
  const canvas: Canvas = {
    canvasGroup,
    canvasDataGroup: dataGroup,
    config: adjustedConfig,
    scales,
    configStore: configManager.getters,
    elements,
  }
  const generate: QsGeneratorPlotted = getGenerators(canvas)

  return {
    canvasSVG: canvasSVG,
    canvasGroup,
    canvasDataGroup: dataGroup,
    config: adjustedConfig,
    generate,
    configStore: configManager.setters,
  }
}
