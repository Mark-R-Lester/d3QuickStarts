import * as legend from '../../unbound/legend/legend'
import * as text from '../../unbound/text/text'
import * as orthogonalArea from '../../orthogonal/orthogonalArea/area'
import * as orthogonalAxis from '../../orthogonal/orthogonalAxis/axis'
import * as orthogonalBar from '../../orthogonal/orthogonalBar/bar'
import * as orthogonalBarGroup from '../../orthogonal/orthogonalBarGroup/barGroup'
import * as orthogonalBarStack from '../../orthogonal/orthogonalBarStack/barStack'
import * as orthogonalLine from '../../orthogonal/orthogonalLine/line'
import * as orthogonalPoint from '../../orthogonal/orthogonalPoints/points'
import * as orthogonalText from '../../orthogonal/orthogonalText/text'
import { qsCreateCanvasOrthogonal } from '../canvas'
import { QsCanvasOrthogonal } from '../qsTypes'
import { QsGeneratorOrthogonal } from '../generators/generatorsOrthogonal'

// Test-scoped elements array
let testElements: any[] = []

// Mock qsCreateCanvas to return a canvas with a controlled elements array
jest.mock('../canvas', () => ({
  qsCreateCanvasOrthogonal: jest.fn().mockImplementation(() => {
    const canvas = { elements: testElements, generate: {} }
    canvas.generate = jest
      .requireActual('./generatorsOrthogonal')
      .getGenerators(canvas)
    return canvas
  }),
}))

// Mock all imported modules
jest.mock('../../unbound/legend/legend')
jest.mock('../../unbound/text/text')
jest.mock('../../orthogonal/orthogonalArea/area')
jest.mock('../../orthogonal/orthogonalAxis/axis')
jest.mock('../../orthogonal/orthogonalBar/bar')
jest.mock('../../orthogonal/orthogonalBarGroup/barGroup')
jest.mock('../../orthogonal/orthogonalBarStack/barStack')
jest.mock('../../orthogonal/orthogonalLine/line')
jest.mock('../../orthogonal/orthogonalPoints/points')
jest.mock('../../orthogonal/orthogonalText/text')

describe('getGenerators', () => {
  let canvas: QsCanvasOrthogonal
  let generators: QsGeneratorOrthogonal

  beforeEach(() => {
    testElements = [] // Reset elements for each test
    canvas = qsCreateCanvasOrthogonal()
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
      test.each`
        data                     | customConfig        | expectedElement
        ${{ values: [1, 2, 3] }} | ${{ color: 'red' }} | ${{ id: 'area1' }}
        ${{ values: [4, 5, 6] }} | ${undefined}        | ${{ id: 'area2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.horizontal.area and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalArea.orthogonalArea.horizontal as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.horizontal.area(
            data,
            customConfig
          )
          expect(orthogonalArea.orthogonalArea.horizontal).toHaveBeenCalledWith(
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
        data                | customConfig     | expectedElement
        ${[[1, 2], [3, 4]]} | ${{ width: 10 }} | ${{ id: 'barGroup1' }}
        ${[[5, 6], [7, 8]]} | ${undefined}     | ${{ id: 'barGroup2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.horizontal.barGroup and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalBarGroup.orthogonalBarGroup.group as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.horizontal.barGroup(
            data,
            customConfig
          )
          expect(
            orthogonalBarGroup.orthogonalBarGroup.group
          ).toHaveBeenCalledWith(expect.anything(), data, customConfig)
          expect(testElements).toContainEqual({
            element: expectedElement,
            data,
          })
          expect(result).toEqual(expectedElement)
        }
      )

      test.each`
        data                | customConfig     | expectedElement
        ${[[1, 2], [3, 4]]} | ${{ width: 10 }} | ${{ id: 'barStack1' }}
        ${[[5, 6], [7, 8]]} | ${undefined}     | ${{ id: 'barStack2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.horizontal.barStack and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalBarStack.orthogonalBarStack.stack as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.horizontal.barStack(
            data,
            customConfig
          )
          expect(
            orthogonalBarStack.orthogonalBarStack.stack
          ).toHaveBeenCalledWith(expect.anything(), data, customConfig)
          expect(testElements).toContainEqual({
            element: expectedElement,
            data,
          })
          expect(result).toEqual(expectedElement)
        }
      )

      test.each`
        data               | customConfig      | expectedElement
        ${[{ value: 10 }]} | ${{ height: 20 }} | ${{ id: 'bars1' }}
        ${[{ value: 15 }]} | ${undefined}      | ${{ id: 'bars2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.horizontal.bars and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalBar.orthogonalBar.horizontal as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.horizontal.bars(
            data,
            customConfig
          )
          expect(orthogonalBar.orthogonalBar.horizontal).toHaveBeenCalledWith(
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
        data                  | customConfig         | expectedElement
        ${{ points: [1, 2] }} | ${{ color: 'blue' }} | ${{ id: 'line1' }}
        ${{ points: [3, 4] }} | ${undefined}         | ${{ id: 'line2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.horizontal.line and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalLine.orthogonalLine.horizontal as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.horizontal.line(
            data,
            customConfig
          )
          expect(orthogonalLine.orthogonalLine.horizontal).toHaveBeenCalledWith(
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
        data                | customConfig   | expectedElement
        ${[{ x: 1, y: 2 }]} | ${{ size: 5 }} | ${{ id: 'points1' }}
        ${[{ x: 3, y: 4 }]} | ${undefined}   | ${{ id: 'points2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.horizontal.points and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalPoint.orthogonalPoint.horizontal as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.horizontal.points(
            data,
            customConfig
          )
          expect(
            orthogonalPoint.orthogonalPoint.horizontal
          ).toHaveBeenCalledWith(expect.anything(), data, customConfig)
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
          it should call generators.orthogonal.horizontal.text and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalText.orthogonalText.horizontal as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.horizontal.text(
            data,
            customConfig
          )
          expect(orthogonalText.orthogonalText.horizontal).toHaveBeenCalledWith(
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

      describe('axis', () => {
        test.each`
          data          | customConfig    | expectedElement
          ${[0, 1, 2]}  | ${{ ticks: 5 }} | ${{ id: 'axisBottom1' }}
          ${['a', 'b']} | ${undefined}    | ${{ id: 'axisBottom2' }}
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
      test.each`
        data               | customConfig      | expectedElement
        ${[{ value: 10 }]} | ${{ height: 20 }} | ${{ id: 'bars1' }}
        ${[{ value: 15 }]} | ${undefined}      | ${{ id: 'bars2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.vertical.bars and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(orthogonalBar.orthogonalBar.vertical as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.orthogonal.vertical.bars(data, customConfig)
          expect(orthogonalBar.orthogonalBar.vertical).toHaveBeenCalledWith(
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
        data                  | customConfig         | expectedElement
        ${{ points: [1, 2] }} | ${{ color: 'blue' }} | ${{ id: 'line1' }}
        ${{ points: [3, 4] }} | ${undefined}         | ${{ id: 'line2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.vertical.line and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalLine.orthogonalLine.vertical as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.vertical.line(data, customConfig)
          expect(orthogonalLine.orthogonalLine.vertical).toHaveBeenCalledWith(
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
        data                | customConfig   | expectedElement
        ${[{ x: 1, y: 2 }]} | ${{ size: 5 }} | ${{ id: 'points1' }}
        ${[{ x: 3, y: 4 }]} | ${undefined}   | ${{ id: 'points2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.orthogonal.vertical.points and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalPoint.orthogonalPoint.vertical as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.vertical.points(
            data,
            customConfig
          )
          expect(orthogonalPoint.orthogonalPoint.vertical).toHaveBeenCalledWith(
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
          it should call generators.orthogonal.vertical.text and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            orthogonalText.orthogonalText.vertical as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.orthogonal.vertical.text(data, customConfig)
          expect(orthogonalText.orthogonalText.vertical).toHaveBeenCalledWith(
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
})
