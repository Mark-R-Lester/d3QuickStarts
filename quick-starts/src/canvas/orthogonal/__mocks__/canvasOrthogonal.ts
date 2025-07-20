import { canvasConfig as defaultCanvasConfig } from '../../../core/config/configDefaults'
import { getGenerators } from './generatorsOrthogonal'
import { Canvas } from '../canvasOrthogonal'
import { createMockSelection } from '../../../__mocks__/selection'
import { createMockConfigStore } from '../../../core/config/__mocks__/configStore'
import { getScales } from '../../../core/scales/getScales'
import { QsCanvasOrthogonal, QsCanvasConfig } from '../../qsTypes'
import { CanvasConfig } from '../../types'

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
  scales: getScales(baseConfig(config)),
  elements: [],
})

export const createMockQsCanvas = (): QsCanvasOrthogonal => ({
  canvasSVG: createMockSelection<SVGSVGElement>(),
  canvasGroup: createMockSelection<SVGGElement>(),
  canvasDataGroup: createMockSelection<SVGGElement>(),
  config: canvasConfig(),
  generate: getGenerators(),
  configStore: createMockConfigStore().setters,
})
