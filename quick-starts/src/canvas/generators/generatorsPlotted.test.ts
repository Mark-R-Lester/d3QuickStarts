import * as legend from '../../unbound/legend/legend'
import * as text from '../../unbound/text/text'
import * as orthogonalAxis from '../../orthogonal/orthogonalAxis/axis'
import * as plottedLine from '../../plots/plottedLine/plottedLine'
import * as plottedPoint from '../../plots/plottedPoints/plottedPoints'
import * as plottedText from '../../plots/plottedText/plottedText'

import { QsCanvasPlotted } from '../qsTypes'
import { QsGeneratorPlotted } from './generatorsPlotted'
import { qsCreateCanvasPlotted } from '../canvas'

let testElements: any[] = []

jest.mock('../canvas', () => ({
  qsCreateCanvasPlotted: jest.fn().mockImplementation(() => {
    const canvas = { elements: testElements, generate: {} }
    canvas.generate = jest
      .requireActual('./generatorsPlotted')
      .getGenerators(canvas)
    return canvas
  }),
}))

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
    testElements = []
    canvas = qsCreateCanvasPlotted()
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
          customConfig    | expectedElement
          ${{ ticks: 5 }} | ${{ id: 'axisBottom1' }}
          ${undefined}    | ${{ id: 'axisBottom2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.orthogonal.horizontal.axis.bottom and add to elements
            expectedElement = $expectedElement`,
          ({ customConfig, expectedElement }) => {
            ;(
              orthogonalAxis.orthogonalAxis.xAxisBottom as jest.Mock
            ).mockReturnValue(expectedElement)
            const result =
              generators.orthogonal.horizontal.axis.bottom(customConfig)
            expect(
              orthogonalAxis.orthogonalAxis.xAxisBottom
            ).toHaveBeenCalledWith(expect.anything(), customConfig)
            expect(testElements).toContainEqual({
              element: expectedElement,
              data: undefined,
            })
            expect(result).toEqual(expectedElement)
          }
        )

        test.each`
          customConfig    | expectedElement
          ${{ ticks: 5 }} | ${{ id: 'axisTop1' }}
          ${undefined}    | ${{ id: 'axisTop2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.orthogonal.horizontal.axis.top and add to elements
            expectedElement = $expectedElement`,
          ({ customConfig, expectedElement }) => {
            ;(
              orthogonalAxis.orthogonalAxis.xAxisTop as jest.Mock
            ).mockReturnValue(expectedElement)
            const result =
              generators.orthogonal.horizontal.axis.top(customConfig)
            expect(orthogonalAxis.orthogonalAxis.xAxisTop).toHaveBeenCalledWith(
              expect.anything(),
              customConfig
            )
            expect(testElements).toContainEqual({
              element: expectedElement,
              data: undefined,
            })
            expect(result).toEqual(expectedElement)
          }
        )
      })
    })

    describe('vertical', () => {
      describe('axis', () => {
        test.each`
          customConfig    | expectedElement
          ${{ ticks: 4 }} | ${{ id: 'axisLeft1' }}
          ${undefined}    | ${{ id: 'axisLeft2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.orthogonal.vertical.axis.left and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(
              orthogonalAxis.orthogonalAxis.yAxisLeft as jest.Mock
            ).mockReturnValue(expectedElement)
            const result =
              generators.orthogonal.vertical.axis.left(customConfig)
            expect(
              orthogonalAxis.orthogonalAxis.yAxisLeft
            ).toHaveBeenCalledWith(expect.anything(), customConfig)
            expect(testElements).toContainEqual({
              element: expectedElement,
              data: undefined,
            })
            expect(result).toEqual(expectedElement)
          }
        )

        test.each`
          customConfig    | expectedElement
          ${{ ticks: 4 }} | ${{ id: 'axisRight1' }}
          ${undefined}    | ${{ id: 'axisRight2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.orthogonal.vertical.axis.right and add to elements
            expectedElement = $expectedElement`,
          ({ customConfig, expectedElement }) => {
            ;(
              orthogonalAxis.orthogonalAxis.yAxisRight as jest.Mock
            ).mockReturnValue(expectedElement)
            const result =
              generators.orthogonal.vertical.axis.right(customConfig)
            expect(
              orthogonalAxis.orthogonalAxis.yAxisRight
            ).toHaveBeenCalledWith(expect.anything(), customConfig)
            expect(testElements).toContainEqual({
              element: expectedElement,
              data: undefined,
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
