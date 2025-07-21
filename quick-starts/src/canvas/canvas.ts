import { canvasConfig } from '../core/config/configDefaults'
import { ConfigStoreManager } from '../core/config/configStore.class'
import {
  QsGenerator,
  getGenerators as getOrthogonalGenerators,
} from './generators/generatorsOrthogonal'
import {
  QsGeneratorPlotted,
  getGenerators as getPlottedGenerators,
} from './generators/generatorsPlotted'
import { getScales } from '../core/scales/getScales'
import { Canvas, CanvasConfig, ElementWithData } from './types'
import {
  QsCanvasOrthogonal,
  QsCanvasConfig,
  QsCanvasConfigOrthogonal,
  QsCanvasConfigPlotted,
  QsCanvasPlotted,
} from './qsTypes'
import { scaleMarginsAndDisplayArea } from './scaleMarginsAndDisplayArea'
import { createCanvaElements } from './createCanvasElement'

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
  customConfig?: QsCanvasConfigOrthogonal
): QsCanvasOrthogonal => {
  const config: CanvasConfig = addDefaultsToConfig(customConfig)

  const element = document.getElementById(config.chartName)
  if (element) element.innerHTML = ''

  const adjustedConfig = scaleMarginsAndDisplayArea(config)
  const { canvasSVG, canvasGroup, canvasDataGroup } =
    createCanvaElements(adjustedConfig)

  const configManager = new ConfigStoreManager()
  const scales = getScales(adjustedConfig)
  const elements: ElementWithData[] = []

  const canvas: Canvas = {
    canvasGroup,
    canvasDataGroup,
    config: adjustedConfig,
    scales,
    configStore: configManager.getters,
    elements,
  }
  const generate: QsGenerator = getOrthogonalGenerators(canvas)

  return {
    canvasSVG: canvasSVG,
    canvasGroup,
    canvasDataGroup,
    config: adjustedConfig,
    generate,
    configStore: configManager.setters,
  }
}

export const qsCreateCanvasPlotted = (
  customConfig?: QsCanvasConfigPlotted
): QsCanvasPlotted => {
  const config: CanvasConfig = addDefaultsToConfig(customConfig)

  const element = document.getElementById(config.chartName)
  if (element) element.innerHTML = ''

  const adjustedConfig = scaleMarginsAndDisplayArea(config)
  const { canvasSVG, canvasGroup, canvasDataGroup } =
    createCanvaElements(adjustedConfig)

  const configManager = new ConfigStoreManager()
  const scales = getScales(adjustedConfig)
  const elements: ElementWithData[] = []

  const canvas: Canvas = {
    canvasGroup,
    canvasDataGroup,
    config: adjustedConfig,
    scales,
    configStore: configManager.getters,
    elements,
  }
  const generate: QsGeneratorPlotted = getPlottedGenerators(canvas)

  return {
    canvasSVG: canvasSVG,
    canvasGroup,
    canvasDataGroup,
    config: adjustedConfig,
    generate,
    configStore: configManager.setters,
  }
}
