import { QsGenerator } from './generators'
import * as legend from '../../unbound/legend/legend'
import * as text from '../../unbound/text/text'
import * as linearArea from '../../linear/linearArea/area'
import * as linearAxis from '../../linear/linearAxis/axis'
import * as linearBar from '../../linear/linearBar/bar'
import * as linearBarGroup from '../../linear/linearBarGroup/barGroup'
import * as linearBarStack from '../../linear/linearBarStack/barStack'
import * as linearLine from '../../linear/linearLine/line'
import * as linearPoint from '../../linear/linearPoints/points'
import * as linearText from '../../linear/linearText/text'
import * as plottedLine from '../../plots/plottedLine/plottedLine'
import * as plottedPoint from '../../plots/plottedPoints/plottedPoints'
import * as plottedText from '../../plots/plottedText/plottedText'
import * as radialArc from '../../radialArc/radialArc/radialArc'
import * as radialArcText from '../../radialArc/radialArcText/radialArcText'
import * as radialArea from '../../radialCentroid/radialCentroidArea/radialCentroidArea'
import * as radialAxis from '../../radialCentroid/radialCentroidAxis/radialCentroidAxis'
import * as radialLine from '../../radialCentroid/radialCentroidLine/radialCentroidLine'
import * as radialPoint from '../../radialCentroid/radialCentroidPoints/radialCentroidPoints'
import { radialSpokes } from '../../radialCentroid/radialCentroidSpokes/radialCentroidSpokes'
import { radialText } from '../../radialCentroid/radialCentroidText/radialCentroidText'

import { qsCreateCanvas } from './canvas'
import { QsCanvas } from '../qsTypes'

// Test-scoped elements array
let testElements: any[] = []

// Mock qsCreateCanvas to return a canvas with a controlled elements array
jest.mock('./canvas', () => ({
  qsCreateCanvas: jest.fn().mockImplementation(() => {
    const canvas = { elements: testElements, generate: {} }
    canvas.generate = jest.requireActual('./generators').getGenerators(canvas)
    return canvas
  }),
}))

// Mock all imported modules
jest.mock('../../unbound/legend/legend')
jest.mock('../../unbound/text/text')
jest.mock('../../linear/linearArea/area')
jest.mock('../../linear/linearAxis/axis')
jest.mock('../../linear/linearBar/bar')
jest.mock('../../linear/linearBarGroup/barGroup')
jest.mock('../../linear/linearBarStack/barStack')
jest.mock('../../linear/linearLine/line')
jest.mock('../../linear/linearPoints/points')
jest.mock('../../linear/linearText/text')
jest.mock('../../plots/plottedLine/plottedLine')
jest.mock('../../plots/plottedPoints/plottedPoints')
jest.mock('../../plots/plottedText/plottedText')
jest.mock('../../radialArc/radialArc/radialArc')
jest.mock('../../radialArc/radialArcText/radialArcText')
jest.mock('../../radialCentroid/radialCentroidArea/radialCentroidArea')
jest.mock('../../radialCentroid/radialCentroidAxis/radialCentroidAxis')
jest.mock('../../radialCentroid/radialCentroidLine/radialCentroidLine')
jest.mock('../../radialCentroid/radialCentroidPoints/radialCentroidPoints')
jest.mock('../../radialCentroid/radialCentroidSpokes/radialCentroidSpokes')
jest.mock('../../radialCentroid/radialCentroidText/radialCentroidText')

describe('getGenerators', () => {
  let canvas: QsCanvas
  let generators: QsGenerator

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
  describe('linear', () => {
    describe('horizontal', () => {
      test.each`
        data                     | customConfig        | expectedElement
        ${{ values: [1, 2, 3] }} | ${{ color: 'red' }} | ${{ id: 'area1' }}
        ${{ values: [4, 5, 6] }} | ${undefined}        | ${{ id: 'area2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.linear.horizontal.area and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearArea.linearArea.horizontal as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.horizontal.area(data, customConfig)
          expect(linearArea.linearArea.horizontal).toHaveBeenCalledWith(
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
          it should call generators.linear.horizontal.barGroup and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearBarGroup.linearBarGroup.group as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.horizontal.barGroup(
            data,
            customConfig
          )
          expect(linearBarGroup.linearBarGroup.group).toHaveBeenCalledWith(
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
        ${[[1, 2], [3, 4]]} | ${{ width: 10 }} | ${{ id: 'barStack1' }}
        ${[[5, 6], [7, 8]]} | ${undefined}     | ${{ id: 'barStack2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.linear.horizontal.barStack and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearBarStack.linearBarStack.stack as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.horizontal.barStack(
            data,
            customConfig
          )
          expect(linearBarStack.linearBarStack.stack).toHaveBeenCalledWith(
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
        data               | customConfig      | expectedElement
        ${[{ value: 10 }]} | ${{ height: 20 }} | ${{ id: 'bars1' }}
        ${[{ value: 15 }]} | ${undefined}      | ${{ id: 'bars2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.linear.horizontal.bars and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearBar.linearBar.horizontal as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.horizontal.bars(data, customConfig)
          expect(linearBar.linearBar.horizontal).toHaveBeenCalledWith(
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
          it should call generators.linear.horizontal.line and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearLine.linearLine.horizontal as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.horizontal.line(data, customConfig)
          expect(linearLine.linearLine.horizontal).toHaveBeenCalledWith(
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
          it should call generators.linear.horizontal.points and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearPoint.linearPoint.horizontal as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.horizontal.points(data, customConfig)
          expect(linearPoint.linearPoint.horizontal).toHaveBeenCalledWith(
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
          it should call generators.linear.horizontal.text and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearText.linearText.horizontal as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.horizontal.text(data, customConfig)
          expect(linearText.linearText.horizontal).toHaveBeenCalledWith(
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
            it should call generators.linear.horizontal.axis.bottom and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(linearAxis.linearAxis.xAxisBottom as jest.Mock).mockReturnValue(
              expectedElement
            )
            const result = generators.linear.horizontal.axis.bottom(
              data,
              customConfig
            )
            expect(linearAxis.linearAxis.xAxisBottom).toHaveBeenCalledWith(
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
          data          | customConfig    | expectedElement
          ${[0, 1, 2]}  | ${{ ticks: 5 }} | ${{ id: 'axisTop1' }}
          ${['a', 'b']} | ${undefined}    | ${{ id: 'axisTop2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.linear.horizontal.axis.top and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(linearAxis.linearAxis.xAxisTop as jest.Mock).mockReturnValue(
              expectedElement
            )
            const result = generators.linear.horizontal.axis.top(
              data,
              customConfig
            )
            expect(linearAxis.linearAxis.xAxisTop).toHaveBeenCalledWith(
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
      test.each`
        data               | customConfig      | expectedElement
        ${[{ value: 10 }]} | ${{ height: 20 }} | ${{ id: 'bars1' }}
        ${[{ value: 15 }]} | ${undefined}      | ${{ id: 'bars2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.linear.vertical.bars and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearBar.linearBar.vertical as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.vertical.bars(data, customConfig)
          expect(linearBar.linearBar.vertical).toHaveBeenCalledWith(
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
          it should call generators.linear.vertical.line and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearLine.linearLine.vertical as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.vertical.line(data, customConfig)
          expect(linearLine.linearLine.vertical).toHaveBeenCalledWith(
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
          it should call generators.linear.vertical.points and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearPoint.linearPoint.vertical as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.vertical.points(data, customConfig)
          expect(linearPoint.linearPoint.vertical).toHaveBeenCalledWith(
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
          it should call generators.linear.vertical.text and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(linearText.linearText.vertical as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.linear.vertical.text(data, customConfig)
          expect(linearText.linearText.vertical).toHaveBeenCalledWith(
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
            it should call generators.linear.vertical.axis.left and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(linearAxis.linearAxis.yAxisLeft as jest.Mock).mockReturnValue(
              expectedElement
            )
            const result = generators.linear.vertical.axis.left(
              data,
              customConfig
            )
            expect(linearAxis.linearAxis.yAxisLeft).toHaveBeenCalledWith(
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
          data           | customConfig    | expectedElement
          ${[0, 10, 20]} | ${{ ticks: 4 }} | ${{ id: 'axisRight1' }}
          ${['x', 'y']}  | ${undefined}    | ${{ id: 'axisRight2' }}
        `(
          `When data is $data and customConfig is $customConfig
            it should call generators.linear.vertical.axis.right and add to elements
            expectedElement = $expectedElement`,
          ({ data, customConfig, expectedElement }) => {
            ;(linearAxis.linearAxis.yAxisRight as jest.Mock).mockReturnValue(
              expectedElement
            )
            const result = generators.linear.vertical.axis.right(
              data,
              customConfig
            )
            expect(linearAxis.linearAxis.yAxisRight).toHaveBeenCalledWith(
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

  describe('radialArc', () => {
    test.each`
      data               | customConfig       | expectedElement
      ${[{ value: 10 }]} | ${{ radius: 100 }} | ${{ id: 'radial1' }}
      ${[{ value: 20 }]} | ${undefined}       | ${{ id: 'radial2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.radialArc.radial and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialArc.radialArc.radial as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.radialArc.radial(data, customConfig)
        expect(radialArc.radialArc.radial).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )

    describe('text', () => {
      test.each`
        data               | customConfig        | expectedElement
        ${[{ text: 'A' }]} | ${{ fontSize: 12 }} | ${{ id: 'textFollow1' }}
        ${[{ text: 'B' }]} | ${undefined}        | ${{ id: 'textFollow2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.radialArc.text.follow and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(radialArcText.radialArcText.follow as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.radialArc.text.follow(data, customConfig)
          expect(radialArcText.radialArcText.follow).toHaveBeenCalledWith(
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
        ${[{ text: 'A' }]} | ${{ fontSize: 12 }} | ${{ id: 'textHorizontal1' }}
        ${[{ text: 'B' }]} | ${undefined}        | ${{ id: 'textHorizontal2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.radialArc.text.horizontal and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(
            radialArcText.radialArcText.horizontal as jest.Mock
          ).mockReturnValue(expectedElement)
          const result = generators.radialArc.text.horizontal(
            data,
            customConfig
          )
          expect(radialArcText.radialArcText.horizontal).toHaveBeenCalledWith(
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
        ${[{ text: 'A' }]} | ${{ fontSize: 12 }} | ${{ id: 'textRotated1' }}
        ${[{ text: 'B' }]} | ${undefined}        | ${{ id: 'textRotated2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.radialArc.text.rotated and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(radialArcText.radialArcText.rotated as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.radialArc.text.rotated(data, customConfig)
          expect(radialArcText.radialArcText.rotated).toHaveBeenCalledWith(
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
        ${[{ text: 'A' }]} | ${{ fontSize: 12 }} | ${{ id: 'textSpoke1' }}
        ${[{ text: 'B' }]} | ${undefined}        | ${{ id: 'textSpoke2' }}
      `(
        `When data is $data and customConfig is $customConfig
          it should call generators.radialArc.text.spoke and add to elements
          expectedElement = $expectedElement`,
        ({ data, customConfig, expectedElement }) => {
          ;(radialArcText.radialArcText.spoke as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.radialArc.text.spoke(data, customConfig)
          expect(radialArcText.radialArcText.spoke).toHaveBeenCalledWith(
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

  describe('radialCentroid', () => {
    test.each`
      data                  | customConfig         | expectedElement
      ${{ values: [1, 2] }} | ${{ fill: 'green' }} | ${{ id: 'area1' }}
      ${{ values: [3, 4] }} | ${undefined}         | ${{ id: 'area2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.radialCentroid.area and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialArea.radialArea.area as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.radialCentroid.area(data, customConfig)
        expect(radialArea.radialArea.area).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data         | customConfig    | expectedElement
      ${[0, 1, 2]} | ${{ ticks: 5 }} | ${{ id: 'axis1' }}
      ${[3, 4, 5]} | ${undefined}    | ${{ id: 'axis2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.radialCentroid.axis and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialAxis.radialAxis.rings as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.radialCentroid.axis(data, customConfig)
        expect(radialAxis.radialAxis.rings).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data                  | customConfig         | expectedElement
      ${{ points: [1, 2] }} | ${{ color: 'blue' }} | ${{ id: 'line1' }}
      ${{ points: [3, 4] }} | ${undefined}         | ${{ id: 'line2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.radialCentroid.line and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialLine.radialLine.line as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.radialCentroid.line(data, customConfig)
        expect(radialLine.radialLine.line).toHaveBeenCalledWith(
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
        it should call generators.radialCentroid.points and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialPoint.radialPoint.points as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.radialCentroid.points(data, customConfig)
        expect(radialPoint.radialPoint.points).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data  | customConfig    | expectedElement
      ${8}  | ${{ count: 8 }} | ${{ id: 'spokes1' }}
      ${12} | ${undefined}    | ${{ id: 'spokes2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.radialCentroid.spokes and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialSpokes.spokes as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.radialCentroid.spokes(data, customConfig)

        expect(radialSpokes.spokes).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data            | customConfig             | expectedElement
      ${{ value: 5 }} | ${{ useDataArea: true }} | ${{ id: 'text1' }}
      ${{ value: 5 }} | ${undefined}             | ${{ id: 'text2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.radialCentroid.spokes and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialText.text as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.radialCentroid.text(data, customConfig)
        expect(radialText.text).toHaveBeenCalledWith(
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
