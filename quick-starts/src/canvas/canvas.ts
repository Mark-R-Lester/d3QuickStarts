import { canvasConfig } from '../core/config/configDefaults'
import { ConfigStoreManager } from '../core/config/configStore.class'
import {
  QsGeneratorOrthogonal,
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
  QsCanvasRadial,
  QsCanvasConfigRadial,
} from './qsTypes'
import { scaleMarginsAndDisplayArea } from './scaleMarginsAndDisplayArea'
import { getCanvas } from './createCanvasElement'
import {
  getGenerators as getRadialGenerators,
  QsGeneratorRadial,
} from './generators/generatorsRadial'

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

const createCanvas = <
  T extends QsGeneratorOrthogonal | QsGeneratorPlotted | QsGeneratorRadial,
>(
  generatorFunction: (arg0: Canvas) => T,
  customConfig?: QsCanvasConfig
) => {
  const config = addDefaultsToConfig(customConfig)
  const element = document.getElementById(config.chartName)
  if (element) element.innerHTML = ''

  const adjustedConfig = scaleMarginsAndDisplayArea(config)
  const { addUnboundLayer, addDataLayer, canvasSVG } = getCanvas(adjustedConfig)
  const configManager = new ConfigStoreManager()
  const scales = getScales(adjustedConfig)

  const canvas: Canvas = {
    addUnboundLayer,
    addDataLayer,
    config: adjustedConfig,
    scales,
    configStore: configManager.getters,
    elements: [] as ElementWithData[],
  }
  const generate = generatorFunction(canvas)

  return {
    canvasSVG,
    config: adjustedConfig,
    generate,
    configStore: configManager.setters,
  }
}

export const qsCreateCanvasOrthogonal = (
  customConfig?: QsCanvasConfigOrthogonal
): QsCanvasOrthogonal => {
  return createCanvas<QsGeneratorOrthogonal>(
    getOrthogonalGenerators,
    customConfig
  )
}

export const qsCreateCanvasPlotted = (
  customConfig?: QsCanvasConfigPlotted
): QsCanvasPlotted => {
  return createCanvas<QsGeneratorPlotted>(getPlottedGenerators, customConfig)
}

export const qsCreateCanvasRadial = (
  customConfig?: QsCanvasConfigRadial
): QsCanvasRadial => {
  return createCanvas<QsGeneratorRadial>(getRadialGenerators, customConfig)
}
