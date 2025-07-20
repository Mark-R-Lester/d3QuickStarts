import * as legend from '../../unbound/legend/legend'
import * as text from '../../unbound/text/text'
import * as orthogonalAxis from '../../orthogonal/orthogonalAxis/axis'
import * as plottedLine from '../../plots/plottedLine/plottedLine'
import * as plottedPoint from '../../plots/plottedPoints/plottedPoints'
import * as plottedText from '../../plots/plottedText/plottedText'

import { qsCreateCanvas } from './canvasPlotted'
import { QsCanvasPlotted } from '../qsTypes'
import { QsGeneratorPlotted } from './generatorsPlotted'

// Test-scoped elements array
let testElements: any[] = []

// Mock qsCreateCanvas to return a canvas with a controlled elements array
jest.mock('./canvasPlotted', () => ({
  qsCreateCanvas: jest.fn().mockImplementation(() => {
    const canvas = { elements: testElements, generate: {} }
    canvas.generate = jest
      .requireActual('./generatorsPlotted')
      .getGenerators(canvas)
    return canvas
  }),
}))

// Mock all imported modules
jest.mock('../../unbound/legend/legend')
jest.mock('../../unbound/text/text')
jest.mock('../../orthogonal/orthogonalAxis/axis')
jest.mock('../../plots/plottedLine/plottedLine')
jest.mock('../../plots/plottedPoints/plottedPoints')
jest.mock('../../plots/plottedText/plottedText')

describe('getGenerators', () => {
  let canvas: QsCanvasPlotted
  let generators: QsGeneratorPlotted

  beforeEach(() => {
    testElements = [] // Reset elements for each test
    canvas = qsCreateCanvas()
    generators = canvas.generate
    jest.clearAllMocks()
  })

  /*Since all functions called by the generator are mocked the types are unimportant
    What is important is that: 
      The correct function is called
      It adds the result to the canvas element array
      Returns the result
   */
  describe('orthogonal', () => {
    describe('horizontal', () => {
      describe('axis', () => {
        test.each`
          data          | customConfig    | expectedElement
          ${[0, 1, 2]}  | ${{ ticks: 5 }} | ${{ id: 'axisBottom1' }}
          ${['a', 'b']} | ${undefined}    | ${{ id: 'axisBottom2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.orthogonal.horizontal.axis.bottom and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(
              orthogonalAxis.orthogonalAxis.xAxisBottom as jest.Mock
            ).mockReturnValue(expectedElement)
            const result = generators.orthogonal.horizontal.axis.bottom(
              data,
              customConfig
            )
            expect(
              orthogonalAxis.orthogonalAxis.xAxisBottom
            ).toHaveBeenCalledWith(expect.anything(), data, customConfig)
            expect(testElements).toContainEqual({
              element: expectedElement,
              data,
            })
            expect(result).toEqual(expectedElement)
          }
        )

        test.each`
          data          | customConfig    | expectedElement
          ${[0, 1, 2]}  | ${{ ticks: 5 }} | ${{ id: 'axisTop1' }}
          ${['a', 'b']} | ${undefined}    | ${{ id: 'axisTop2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.orthogonal.horizontal.axis.top and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(
              orthogonalAxis.orthogonalAxis.xAxisTop as jest.Mock
            ).mockReturnValue(expectedElement)
            const result = generators.orthogonal.horizontal.axis.top(
              data,
              customConfig
            )
            expect(orthogonalAxis.orthogonalAxis.xAxisTop).toHaveBeenCalledWith(
              expect.anything(),
              data,
              customConfig
            )
            expect(testElements).toContainEqual({
              element: expectedElement,
              data,
            })
            expect(result).toEqual(expectedElement)
          }
        )
      })
    })

    describe('vertical', () => {
      describe('axis', () => {
        test.each`
          data           | customConfig    | expectedElement
          ${[0, 10, 20]} | ${{ ticks: 4 }} | ${{ id: 'axisLeft1' }}
          ${['x', 'y']}  | ${undefined}    | ${{ id: 'axisLeft2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.orthogonal.vertical.axis.left and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(
              orthogonalAxis.orthogonalAxis.yAxisLeft as jest.Mock
            ).mockReturnValue(expectedElement)
            const result = generators.orthogonal.vertical.axis.left(
              data,
              customConfig
            )
            expect(
              orthogonalAxis.orthogonalAxis.yAxisLeft
            ).toHaveBeenCalledWith(expect.anything(), data, customConfig)
            expect(testElements).toContainEqual({
              element: expectedElement,
              data,
            })
            expect(result).toEqual(expectedElement)
          }
        )

        test.each`
          data           | customConfig    | expectedElement
          ${[0, 10, 20]} | ${{ ticks: 4 }} | ${{ id: 'axisRight1' }}
          ${['x', 'y']}  | ${undefined}    | ${{ id: 'axisRight2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.orthogonal.vertical.axis.right and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(
              orthogonalAxis.orthogonalAxis.yAxisRight as jest.Mock
            ).mockReturnValue(expectedElement)
            const result = generators.orthogonal.vertical.axis.right(
              data,
              customConfig
            )
            expect(
              orthogonalAxis.orthogonalAxis.yAxisRight
            ).toHaveBeenCalledWith(expect.anything(), data, customConfig)
            expect(testElements).toContainEqual({
              element: expectedElement,
              data,
            })
            expect(result).toEqual(expectedElement)
          }
        )
      })
    })
  })

  describe('unbound', () => {
    test.each`
      data                | customConfig           | expectedElement
      ${[{ label: 'A' }]} | ${{ position: 'top' }} | ${{ id: 'legend1' }}
      ${[{ label: 'B' }]} | ${undefined}           | ${{ id: 'legend2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.unbound.legend and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(legend.legend as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.unbound.legend(data, customConfig)
        expect(legend.legend).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )
    test.each`
      data               | customConfig        | expectedElement
      ${[{ text: 'A' }]} | ${{ fontSize: 12 }} | ${{ id: 'text1' }}
      ${[{ text: 'B' }]} | ${undefined}        | ${{ id: 'text2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.unbound.text and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(text.unboundText as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.unbound.text(data, customConfig)
        expect(text.unboundText).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )
  })

  describe('plotted', () => {
    test.each`
      data                  | customConfig         | expectedElement
      ${{ points: [1, 2] }} | ${{ color: 'blue' }} | ${{ id: 'line1' }}
      ${{ points: [3, 4] }} | ${undefined}         | ${{ id: 'line2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.plotted.line and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(plottedLine.plottedLine.line as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.plotted.line(data, customConfig)
        expect(plottedLine.plottedLine.line).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({
          element: expectedElement,
          data,
        })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data               | customConfig        | expectedElement
      ${[{ text: 'A' }]} | ${{ fontSize: 12 }} | ${{ id: 'text1' }}
      ${[{ text: 'B' }]} | ${undefined}        | ${{ id: 'text2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.plotted.text and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(plottedText.plottedText.text as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.plotted.text(data, customConfig)
        expect(plottedText.plottedText.text).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data                | customConfig   | expectedElement
      ${[{ x: 1, y: 2 }]} | ${{ size: 5 }} | ${{ id: 'points1' }}
      ${[{ x: 3, y: 4 }]} | ${undefined}   | ${{ id: 'points2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.plotted.points and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(plottedPoint.plottedPoint.points as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.plotted.points(data, customConfig)
        expect(plottedPoint.plottedPoint.points).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )
  })
})
