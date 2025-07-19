import { createMockQsCanvas } from '../../canvas/linear/__mocks__/canvas.mocks'
import { resetMockSelectionStore } from '../../canvas/linear/__mocks__/selection.mocks'
import { QsCanvas } from '../../canvas/linear/qsTypes'
import { CanvasConfig } from '../../canvas/linear/types'

import {
  qsCreateCustomStopLinearGradient,
  qsCreateCustomStopRadialGradient,
  qsCreateLinearGradient,
  qsCreateRadialGradient,
} from './gradients'

// Mock D3 to ensure selections behave as expected
jest.mock('d3', () => {
  const actualD3 = jest.requireActual('d3')
  const mockSelect = jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    selectAll: jest.fn().mockReturnThis(),
    append: jest.fn().mockReturnThis(),
    attr: jest.fn().mockReturnThis(),
    size: jest.fn().mockReturnValue(0),
    each: jest.fn(),
  }))
  return {
    ...actualD3,
    select: mockSelect,
    selectAll: mockSelect,
  }
})

// Constants for colorStops arrays
const BLUE_RED_STOPS = [
  { color: 'blue', offset: 0 },
  { color: 'red', offset: 100 },
]
const BLUE_RED_MID_STOPS = [
  { color: 'blue', offset: 50 },
  { color: 'red', offset: 50 },
]

const RED_GREEN = ['red', 'green']
const BLUE_WHITE_MAGENTA = ['blue', 'white', 'magenta']

describe('Gradient Functions Testing', () => {
  const canvasConfig: CanvasConfig = {
    ry: 0,
    rx: 0,
    chartName: 'myChart',
    width: 100,
    height: 100,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    highestViewableValue: 100,
    lowestViewableValue: 0,
    borderColor: 'lightgrey',
    borderWidth: 2,
    fillColor: 'none',
    displayAreaHeight: 100,
    displayAreaWidth: 100,
  }
  let canvasMock: QsCanvas

  beforeEach(() => {
    resetMockSelectionStore()
    canvasMock = createMockQsCanvas()
    canvasMock.config = canvasConfig
  })

  describe('qsCreateCustomStopLinearGradient', () => {
    test.each`
      gradientId | colorStops            | x1       | y1       | x2       | y2        | expectedId
      ${'grad1'} | ${BLUE_RED_STOPS}     | ${'0%'}  | ${'0%'}  | ${'0%'}  | ${'100%'} | ${'url(#grad1)'}
      ${'grad2'} | ${BLUE_RED_MID_STOPS} | ${'10%'} | ${'20%'} | ${'80%'} | ${'30%'}  | ${'url(#grad2)'}
    `(
      'creates linear gradient with gradientId=$gradientId, x1=$x1, y1=$y1, x2=$x2, y2=$y2',
      ({ gradientId, colorStops, x1, y1, x2, y2, expectedId }) => {
        const result = qsCreateCustomStopLinearGradient({
          canvas: canvasMock,
          gradientId,
          colorStops,
          x1,
          y1,
          x2,
          y2,
        })

        expect(result).toBe(expectedId)
        expect(canvasMock.canvasSVG.append).toHaveBeenCalled()
        const appendCalls = canvasMock.canvasSVG.getAppendCalls()
        expect(appendCalls).toContainEqual({ type: 'defs' })
        expect(appendCalls).toContainEqual({ type: 'linearGradient' })
        expect(appendCalls.filter((call) => call.type === 'stop').length).toBe(
          colorStops.length
        )

        const attrCalls = canvasMock.canvasSVG.getAttrCalls()
        expect(attrCalls).toContainEqual({ name: 'id', value: gradientId })
        expect(attrCalls).toContainEqual({ name: 'x1', value: x1 })
        expect(attrCalls).toContainEqual({ name: 'y1', value: y1 })
        expect(attrCalls).toContainEqual({ name: 'x2', value: x2 })
        expect(attrCalls).toContainEqual({ name: 'y2', value: y2 })
        colorStops.forEach((stop: { color: any; offset: any }) => {
          expect(attrCalls).toContainEqual({
            name: 'offset',
            value: `${stop.offset}%`,
          })
          expect(attrCalls).toContainEqual({
            name: 'stop-color',
            value: stop.color,
          })
        })

        canvasMock.canvasSVG.selectAll('defs').selectAll('linearGradient')
        expect(canvasMock.canvasSVG.selectAll).toHaveBeenCalledWith('defs')
      }
    )
  })

  describe('qsCreateLinearGradient', () => {
    test.each`
      gradientId | colors                | x1       | y1       | x2        | y2       | expectedId
      ${'grad3'} | ${RED_GREEN}          | ${'0%'}  | ${'0%'}  | ${'100%'} | ${'0%'}  | ${'url(#grad3)'}
      ${'grad4'} | ${BLUE_WHITE_MAGENTA} | ${'10%'} | ${'20%'} | ${'80%'}  | ${'30%'} | ${'url(#grad4)'}
    `(
      'creates linear gradient with gradientId=$gradientId, x1=$x1, y1=$y1, x2=$x2, y2=$y2',
      ({ gradientId, colors, x1, y1, x2, y2, expectedId }) => {
        resetMockSelectionStore()
        const result = qsCreateLinearGradient({
          canvas: canvasMock,
          gradientId,
          colors,
          x1,
          y1,
          x2,
          y2,
        })

        expect(result).toBe(expectedId)
        const appendCalls = canvasMock.canvasSVG.getAppendCalls()
        expect(appendCalls).toContainEqual({ type: 'defs' })
        expect(appendCalls).toContainEqual({ type: 'linearGradient' })
        expect(appendCalls.filter((call) => call.type === 'stop').length).toBe(
          colors.length
        )

        const attrCalls = canvasMock.canvasSVG.getAttrCalls()
        expect(attrCalls).toContainEqual({ name: 'id', value: gradientId })
        expect(attrCalls).toContainEqual({ name: 'x1', value: x1 })
        expect(attrCalls).toContainEqual({ name: 'y1', value: y1 })
        expect(attrCalls).toContainEqual({ name: 'x2', value: x2 })
        expect(attrCalls).toContainEqual({ name: 'y2', value: y2 })
        colors.forEach((color: string, i: number) => {
          const offset = `${(i / (colors.length - 1)) * 100}%`
          expect(attrCalls).toContainEqual({ name: 'stop-color', value: color })
          expect(attrCalls).toContainEqual({ name: 'offset', value: offset })
        })
      }
    )
  })

  describe('qsCreateCustomStopRadialGradient', () => {
    test.each`
      gradientId | colorStops            | cx       | cy       | r        | expectedId
      ${'rad1'}  | ${BLUE_RED_STOPS}     | ${'50%'} | ${'50%'} | ${'50%'} | ${'url(#rad1)'}
      ${'rad2'}  | ${BLUE_RED_MID_STOPS} | ${'40%'} | ${'60%'} | ${'70%'} | ${'url(#rad2)'}
    `(
      'creates radial gradient with gradientId=$gradientId, cx=$cx, cy=$cy, r=$r',
      ({ gradientId, colorStops, cx, cy, r, expectedId }) => {
        const result = qsCreateCustomStopRadialGradient({
          canvas: canvasMock,
          gradientId,
          colorStops,
          cx,
          cy,
          r,
        })

        expect(result).toBe(expectedId)
        const appendCalls = canvasMock.canvasSVG.getAppendCalls()

        expect(appendCalls).toContainEqual({ type: 'defs' })
        expect(appendCalls).toContainEqual({ type: 'radialGradient' })
        expect(appendCalls.filter((call) => call.type === 'stop').length).toBe(
          colorStops.length
        )

        const attrCalls = canvasMock.canvasSVG.getAttrCalls()
        expect(attrCalls).toContainEqual({ name: 'id', value: gradientId })
        expect(attrCalls).toContainEqual({ name: 'cx', value: cx })
        expect(attrCalls).toContainEqual({ name: 'cy', value: cy })
        expect(attrCalls).toContainEqual({ name: 'r', value: r })
        colorStops.forEach((stop: { color: any; offset: any }) => {
          expect(attrCalls).toContainEqual({
            name: 'offset',
            value: `${stop.offset}%`,
          })
          expect(attrCalls).toContainEqual({
            name: 'stop-color',
            value: stop.color,
          })
        })
      }
    )
  })

  describe('qsCreateRadialGradient', () => {
    test.each`
      gradientId | colors                | cx       | cy       | r        | expectedId
      ${'rad3'}  | ${RED_GREEN}          | ${'50%'} | ${'50%'} | ${'50%'} | ${'url(#rad3)'}
      ${'rad4'}  | ${BLUE_WHITE_MAGENTA} | ${'40%'} | ${'60%'} | ${'70%'} | ${'url(#rad4)'}
    `(
      'creates radial gradient with gradientId=$gradientId, cx=$cx, cy=$cy, r=$r',
      ({ gradientId, colors, cx, cy, r, expectedId }) => {
        const result = qsCreateRadialGradient({
          canvas: canvasMock,
          gradientId,
          colors,
          cx,
          cy,
          r,
        })

        expect(result).toBe(expectedId)
        const appendCalls = canvasMock.canvasSVG.getAppendCalls()
        expect(appendCalls).toContainEqual({ type: 'defs' })
        expect(appendCalls).toContainEqual({ type: 'radialGradient' })
        expect(appendCalls.filter((call) => call.type === 'stop').length).toBe(
          colors.length
        )

        const attrCalls = canvasMock.canvasSVG.getAttrCalls()
        expect(attrCalls).toContainEqual({ name: 'id', value: gradientId })
        expect(attrCalls).toContainEqual({ name: 'cx', value: cx })
        expect(attrCalls).toContainEqual({ name: 'cy', value: cy })
        expect(attrCalls).toContainEqual({ name: 'r', value: r })
        colors.forEach((color: string, i: number) => {
          const offset = `${(i / (colors.length - 1)) * 100}%`
          expect(attrCalls).toContainEqual({ name: 'stop-color', value: color })
          expect(attrCalls).toContainEqual({ name: 'offset', value: offset })
        })
      }
    )
  })
})
