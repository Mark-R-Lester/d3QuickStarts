import { resetMockSelectionStore } from '../../__mocks__/selection'
import {
  createMockQsCanvasOthogonal,
  createMockQsCanvasRadial,
} from '../../canvas/__mocks__/canvas'
import { QsCanvasOrthogonal, QsCanvasRadial } from '../../canvas/qsTypes'
import { CanvasConfig } from '../../canvas/types'

import {
  qsCreateCustomStopOrthogonalGradient,
  qsCreateCustomStopRadialGradient,
  qsCreateOrthogonalGradient,
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
    highestViewableValueY: 0,
    lowestViewableValueY: 0,
    highestViewableValueX: 0,
    lowestViewableValueX: 0,
  }
  let canvasOrthogonalMock: QsCanvasOrthogonal
  let canvasRadialMock: QsCanvasRadial

  beforeEach(() => {
    resetMockSelectionStore()
    canvasOrthogonalMock = createMockQsCanvasOthogonal()
    canvasRadialMock = createMockQsCanvasRadial()
    canvasOrthogonalMock.config = canvasConfig
  })

  describe('qsCreateCustomStoporthogonalGradient', () => {
    test.each`
      gradientId | colorStops            | x1       | y1       | x2       | y2        | expectedId
      ${'grad1'} | ${BLUE_RED_STOPS}     | ${'0%'}  | ${'0%'}  | ${'0%'}  | ${'100%'} | ${'url(#grad1)'}
      ${'grad2'} | ${BLUE_RED_MID_STOPS} | ${'10%'} | ${'20%'} | ${'80%'} | ${'30%'}  | ${'url(#grad2)'}
    `(
      'creates orthogonal gradient with gradientId=$gradientId, x1=$x1, y1=$y1, x2=$x2, y2=$y2',
      ({ gradientId, colorStops, x1, y1, x2, y2, expectedId }) => {
        const result = qsCreateCustomStopOrthogonalGradient({
          canvas: canvasOrthogonalMock,
          gradientId,
          colorStops,
          x1,
          y1,
          x2,
          y2,
        })

        expect(result).toBe(expectedId)
        expect(canvasOrthogonalMock.canvasSVG.append).toHaveBeenCalled()
        const appendCalls = canvasOrthogonalMock.canvasSVG.getAppendCalls()
        expect(appendCalls).toContainEqual({ type: 'defs' })
        expect(appendCalls).toContainEqual({ type: 'linearGradient' })
        expect(appendCalls.filter((call) => call.type === 'stop').length).toBe(
          colorStops.length
        )

        const attrCalls = canvasOrthogonalMock.canvasSVG.getAttrCalls()
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

        canvasOrthogonalMock.canvasSVG
          .selectAll('defs')
          .selectAll('orthogonalGradient')
        expect(canvasOrthogonalMock.canvasSVG.selectAll).toHaveBeenCalledWith(
          'defs'
        )
      }
    )
  })

  describe('qsCreateorthogonalGradient', () => {
    test.each`
      gradientId | colors                | x1       | y1       | x2        | y2       | expectedId
      ${'grad3'} | ${RED_GREEN}          | ${'0%'}  | ${'0%'}  | ${'100%'} | ${'0%'}  | ${'url(#grad3)'}
      ${'grad4'} | ${BLUE_WHITE_MAGENTA} | ${'10%'} | ${'20%'} | ${'80%'}  | ${'30%'} | ${'url(#grad4)'}
    `(
      'creates orthogonal gradient with gradientId=$gradientId, x1=$x1, y1=$y1, x2=$x2, y2=$y2',
      ({ gradientId, colors, x1, y1, x2, y2, expectedId }) => {
        resetMockSelectionStore()
        const result = qsCreateOrthogonalGradient({
          canvas: canvasOrthogonalMock,
          gradientId,
          colors,
          x1,
          y1,
          x2,
          y2,
        })

        expect(result).toBe(expectedId)
        const appendCalls = canvasOrthogonalMock.canvasSVG.getAppendCalls()
        expect(appendCalls).toContainEqual({ type: 'defs' })
        expect(appendCalls).toContainEqual({ type: 'linearGradient' })
        expect(appendCalls.filter((call) => call.type === 'stop').length).toBe(
          colors.length
        )

        const attrCalls = canvasOrthogonalMock.canvasSVG.getAttrCalls()
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
      gradientId | colorStops            | cx       | cy       | r        | fx       | fy       | expectedId
      ${'rad1'}  | ${BLUE_RED_STOPS}     | ${'50%'} | ${'50%'} | ${'50%'} | ${'50%'} | ${'50%'} | ${'url(#rad1)'}
      ${'rad2'}  | ${BLUE_RED_MID_STOPS} | ${'40%'} | ${'60%'} | ${'70%'} | ${'30%'} | ${'30%'} | ${'url(#rad2)'}
    `(
      'creates radial gradient with gradientId=$gradientId, cx=$cx, cy=$cy, r=$r, fx=$fx, fy=$fy',
      ({ gradientId, colorStops, cx, cy, r, fx, fy, expectedId }) => {
        const result = qsCreateCustomStopRadialGradient({
          canvas: canvasRadialMock,
          gradientId,
          colorStops,
          cx,
          cy,
          r,
          fx,
          fy,
        })

        expect(result).toBe(expectedId)
        const appendCalls = canvasRadialMock.canvasSVG.getAppendCalls()

        expect(appendCalls).toContainEqual({ type: 'defs' })
        expect(appendCalls).toContainEqual({ type: 'radialGradient' })
        expect(appendCalls.filter((call) => call.type === 'stop').length).toBe(
          colorStops.length
        )

        const attrCalls = canvasRadialMock.canvasSVG.getAttrCalls()
        expect(attrCalls).toContainEqual({ name: 'id', value: gradientId })
        expect(attrCalls).toContainEqual({ name: 'cx', value: cx })
        expect(attrCalls).toContainEqual({ name: 'cy', value: cy })
        expect(attrCalls).toContainEqual({ name: 'r', value: r })
        expect(attrCalls).toContainEqual({ name: 'fx', value: fx })
        expect(attrCalls).toContainEqual({ name: 'fy', value: fy })
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
      gradientId | colors                | cx       | cy       | r        | fx       | fy       | expectedId
      ${'rad3'}  | ${RED_GREEN}          | ${'50%'} | ${'50%'} | ${'50%'} | ${'50%'} | ${'50%'} | ${'url(#rad3)'}
      ${'rad4'}  | ${BLUE_WHITE_MAGENTA} | ${'40%'} | ${'60%'} | ${'70%'} | ${'30%'} | ${'30%'} | ${'url(#rad4)'}
    `(
      'creates radial gradient with gradientId=$gradientId, cx=$cx, cy=$cy, r=$r',
      ({ gradientId, colors, cx, cy, r, fx, fy, expectedId }) => {
        const result = qsCreateRadialGradient({
          canvas: canvasRadialMock,
          gradientId,
          colors,
          cx,
          cy,
          r,
          fx,
          fy,
        })

        expect(result).toBe(expectedId)
        const appendCalls = canvasRadialMock.canvasSVG.getAppendCalls()
        expect(appendCalls).toContainEqual({ type: 'defs' })
        expect(appendCalls).toContainEqual({ type: 'radialGradient' })
        expect(appendCalls.filter((call) => call.type === 'stop').length).toBe(
          colors.length
        )

        const attrCalls = canvasRadialMock.canvasSVG.getAttrCalls()
        expect(attrCalls).toContainEqual({ name: 'id', value: gradientId })
        expect(attrCalls).toContainEqual({ name: 'cx', value: cx })
        expect(attrCalls).toContainEqual({ name: 'cy', value: cy })
        expect(attrCalls).toContainEqual({ name: 'r', value: r })
        expect(attrCalls).toContainEqual({ name: 'fx', value: fx })
        expect(attrCalls).toContainEqual({ name: 'fy', value: fy })
        colors.forEach((color: string, i: number) => {
          const offset = `${(i / (colors.length - 1)) * 100}%`
          expect(attrCalls).toContainEqual({ name: 'stop-color', value: color })
          expect(attrCalls).toContainEqual({ name: 'offset', value: offset })
        })
      }
    )
  })
})
