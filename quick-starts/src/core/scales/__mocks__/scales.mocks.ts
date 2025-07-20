import { scaleLinear } from 'd3'
import { CanvasScales } from '../getScales'
import { CanvasConfig } from '../../../canvas/types'

// Mock scaleLinear to return a chainable object with domain and range
jest.mock('d3', () => ({
  scaleLinear: jest.fn(() => ({
    domain: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
  })),
}))

export const getScalesMock = (config: CanvasConfig): CanvasScales => {
  const mockScale = scaleLinear()
  return {
    xCanvasPercentScaleInverted: mockScale,
    xCanvasPercentScale: mockScale,
    yCanvasPercentScaleInverted: mockScale,
    yCanvasPercentScale: mockScale,
    genralPercentScale: mockScale,
    xPercentScale: mockScale,
    xPercentScaleInverted: mockScale,
    yPercentScale: mockScale,
    yPercentScaleInverted: mockScale,
    xDataScale: mockScale,
    xDataScalePlotted: mockScale,
    xDataScaleInverted: mockScale,
    yDataScale: mockScale,
    yDataScalePlotted: mockScale,
    yDataScaleInverted: mockScale,
  }
}
