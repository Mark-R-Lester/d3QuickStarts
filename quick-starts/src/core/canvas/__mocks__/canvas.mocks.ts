import { QsCanvas, QsCanvasConfig } from '../qsTypes'
import { CanvasConfig } from '../types'
import { canvasConfig as defaultCanvasConfig } from '../../config/configDefaults'
import { createMockSelection, getGenerators } from './generators.mocks'
import { createMockConfigStore } from './configStore.mocks'
import { Canvas } from '../canvas'
import { getScalesMock } from './scales.mocks'

export const baseConfig = (
  configOverrides: Partial<QsCanvasConfig> = {}
): CanvasConfig => ({
  ...defaultCanvasConfig,
  chartName: 'test',
  width: 120,
  height: 120,
  marginRight: 10,
  marginLeft: 10,
  marginTop: 10,
  marginBottom: 10,
  highestViewableValue: 100,
  lowestViewableValue: 0,
  ...configOverrides,
})

const canvasConfig = (): CanvasConfig => ({
  ry: 0,
  rx: 0,
  chartName: '',
  width: 0,
  height: 0,
  marginRight: 0,
  marginLeft: 0,
  marginTop: 0,
  marginBottom: 0,
  highestViewableValue: 0,
  lowestViewableValue: 0,
  borderColor: '',
  borderWidth: 0,
  fillColor: '',
  displayAreaHeight: 0,
  displayAreaWidth: 0,
})

export const createMockCanvas = (config: QsCanvasConfig): Canvas => ({
  canvasGroup: createMockSelection<SVGGElement>(),
  canvasDataGroup: createMockSelection<SVGGElement>(),
  config: baseConfig(config),
  configStore: createMockConfigStore().getters,
  scales: getScalesMock(baseConfig(config)),
  elements: [],
})

export const createMockQsCanvas = (): QsCanvas => ({
  canvasSVG: createMockSelection<SVGSVGElement>(),
  canvasGroup: createMockSelection<SVGGElement>(),
  canvasDataGroup: createMockSelection<SVGGElement>(),
  config: canvasConfig(),
  generate: getGenerators(),
  configStore: createMockConfigStore().setters,
})
