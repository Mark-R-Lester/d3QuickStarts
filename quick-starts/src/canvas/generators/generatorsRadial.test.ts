import * as legend from '../../unbound/legend/legend'
import * as text from '../../unbound/text/text'
import * as radialArc from '../../radialArc/radialArc/radialArc'
import * as radialArcText from '../../radialArc/radialArcText/radialArcText'
import * as radialArea from '../../radialCentroid/radialCentroidArea/centroidArea'
import * as radialAxis from '../../radialCentroid/radialCentroidAxis/centroidAxis'
import * as radialLine from '../../radialCentroid/radialCentroidLine/centroidLine'
import * as radialPoint from '../../radialCentroid/radialCentroidPoints/centroidPoints'
import { radialSpokes } from '../../radialCentroid/radialCentroidSpokes/centroidSpokes'
import { radialText } from '../../radialCentroid/radialCentroidText/centroidText'

import { QsCanvasRadial } from '../qsTypes'
import { QsGeneratorRadial } from './generatorsRadial'
import { qsCreateCanvasRadial } from '../canvas'

let testElements: any[] = []

jest.mock('../canvas', () => ({
  qsCreateCanvasRadial: jest.fn().mockImplementation(() => {
    const canvas = { elements: testElements, generate: {} }
    canvas.generate = jest
      .requireActual('./generatorsRadial')
      .getGenerators(canvas)
    return canvas
  }),
}))

jest.mock('../../unbound/legend/legend')
jest.mock('../../unbound/text/text')
jest.mock('../../radialArc/radialArc/radialArc')
jest.mock('../../radialArc/radialArcText/radialArcText')
jest.mock('../../radialCentroid/radialCentroidArea/centroidArea')
jest.mock('../../radialCentroid/radialCentroidAxis/centroidAxis')
jest.mock('../../radialCentroid/radialCentroidLine/centroidLine')
jest.mock('../../radialCentroid/radialCentroidPoints/centroidPoints')
jest.mock('../../radialCentroid/radialCentroidSpokes/centroidSpokes')
jest.mock('../../radialCentroid/radialCentroidText/centroidText')

describe('getGenerators', () => {
  let canvas: QsCanvasRadial
  let generators: QsGeneratorRadial

  beforeEach(() => {
    testElements = [] // Reset elements for each test
    canvas = qsCreateCanvasRadial()
    generators = canvas.generate
    jest.clearAllMocks()
  })

  /*Since all functions called by the generator are mocked the types are unimportant
    What is important is that: 
      The correct function is called
      It adds the result to the canvas element array
      Returns the result
   */
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
        ;(radialArc.arc as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.radialArc.arc(data, customConfig)
        expect(radialArc.arc).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data               | customConfig       | expectedElement
      ${[{ value: 10 }]} | ${{ radius: 100 }} | ${{ id: 'radial1' }}
      ${[{ value: 20 }]} | ${undefined}       | ${{ id: 'radial2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.radialArc.envelope and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialArc.envelope as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.radialArc.envelope(data, customConfig)
        expect(radialArc.envelope).toHaveBeenCalledWith(
          expect.anything(),
          data,
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement, data })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data               | customConfig       | expectedElement
      ${[{ value: 10 }]} | ${{ radius: 100 }} | ${{ id: 'radial1' }}
      ${[{ value: 20 }]} | ${undefined}       | ${{ id: 'radial2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.radialArc.envelope and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialArc.segment as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.radialArc.segment(data, customConfig)
        expect(radialArc.segment).toHaveBeenCalledWith(
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
          ;(radialArcText.ArcText.follow as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.radialArc.text.follow(data, customConfig)
          expect(radialArcText.ArcText.follow).toHaveBeenCalledWith(
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
          ;(radialArcText.ArcText.horizontal as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.radialArc.text.horizontal(
            data,
            customConfig
          )
          expect(radialArcText.ArcText.horizontal).toHaveBeenCalledWith(
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
          ;(radialArcText.ArcText.rotated as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.radialArc.text.rotated(data, customConfig)
          expect(radialArcText.ArcText.rotated).toHaveBeenCalledWith(
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
          ;(radialArcText.ArcText.spoke as jest.Mock).mockReturnValue(
            expectedElement
          )
          const result = generators.radialArc.text.spokes(data, customConfig)
          expect(radialArcText.ArcText.spoke).toHaveBeenCalledWith(
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

  describe('centroid', () => {
    test.each`
      data                  | customConfig         | expectedElement
      ${{ values: [1, 2] }} | ${{ fill: 'green' }} | ${{ id: 'area1' }}
      ${{ values: [3, 4] }} | ${undefined}         | ${{ id: 'area2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.centroid.area and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialArea.radialArea.area as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.centroid.area(data, customConfig)
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
      customConfig    | expectedElement
      ${{ ticks: 5 }} | ${{ id: 'axis1' }}
      ${undefined}    | ${{ id: 'axis2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.centroid.axis and add to elements
        expectedElement = $expectedElement`,
      ({ customConfig, expectedElement }) => {
        ;(radialAxis.radialAxis.rings as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.centroid.axis(customConfig)
        expect(radialAxis.radialAxis.rings).toHaveBeenCalledWith(
          expect.anything(),
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data                  | customConfig         | expectedElement
      ${{ points: [1, 2] }} | ${{ color: 'blue' }} | ${{ id: 'line1' }}
      ${{ points: [3, 4] }} | ${undefined}         | ${{ id: 'line2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.centroid.line and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialLine.centroidLine.line as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.centroid.line(data, customConfig)
        expect(radialLine.centroidLine.line).toHaveBeenCalledWith(
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
        it should call generators.centroid.points and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialPoint.radialPoint.points as jest.Mock).mockReturnValue(
          expectedElement
        )
        const result = generators.centroid.points(data, customConfig)
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
      customConfig    | expectedElement
      ${{ count: 8 }} | ${{ id: 'spokes1' }}
      ${undefined}    | ${{ id: 'spokes2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.centroid.spokes and add to elements
        expectedElement = $expectedElement`,
      ({ customConfig, expectedElement }) => {
        ;(radialSpokes.spokes as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.centroid.spokes(customConfig)

        expect(radialSpokes.spokes).toHaveBeenCalledWith(
          expect.anything(),
          customConfig
        )
        expect(testElements).toContainEqual({ element: expectedElement })
        expect(result).toEqual(expectedElement)
      }
    )

    test.each`
      data            | customConfig             | expectedElement
      ${{ value: 5 }} | ${{ useDataArea: true }} | ${{ id: 'text1' }}
      ${{ value: 5 }} | ${undefined}             | ${{ id: 'text2' }}
    `(
      `When data is $data and customConfig is $customConfig
        it should call generators.centroid.spokes and add to elements
        expectedElement = $expectedElement`,
      ({ data, customConfig, expectedElement }) => {
        ;(radialText.text as jest.Mock).mockReturnValue(expectedElement)
        const result = generators.centroid.text(data, customConfig)
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
