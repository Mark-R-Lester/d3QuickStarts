import { CanvasConfig } from '../../canvas/types'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
  Orientation,
} from '../../core/enums/enums'

import { getCalculatedData } from './calculatedData'
import { QsBarData } from './qsTypes'
import { BarConfig } from './types'
import { JSDOM } from 'jsdom'
import { ConfigStoreManager } from '../../core/config/configStore.class'
import { getScales } from '../../core/scales/getScales'
import {
  Canvas,
  qsCreateCanvas,
} from '../../canvas/orthogonal/canvasOrthogonal'
import { QsCanvasOrthogonal } from '../../canvas/qsTypes'

const dom = new JSDOM()
global.document = dom.window.document

describe('orthogonal Bars calculatedData', () => {
  const config: BarConfig = {
    useDataArea: true,
    padding: 8,
    defaultFillColor: GlobalDefaultColors.BAR_FILL,
    defaultFillOpacity: GlobalDefaultSettings.FILL_OPACITY,
    defaultStrokeColor: GlobalDefaultColors.BAR_STROKE,
    defaultStrokeWidth: GlobalDefaultSettings.STROKE_WIDTH,
    defaultStrokeOpacity: GlobalDefaultSettings.STROKE_OPACITY,
    fillColorScaleData: undefined,
    strokeColorScaleData: undefined,
  }

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

  describe('Horizontal', () => {
    test.each`
      zeroY | zeroHeight | oneY                 | oneHeight            | twoY                 | twoHeight            | threeY | threeHeight | lowestViewableValue | highestViewableValue
      ${0}  | ${100}     | ${25}                | ${75}                | ${50}                | ${50}                | ${75}  | ${25}       | ${0}                | ${100}
      ${0}  | ${100}     | ${33.33333333333334} | ${66.66666666666666} | ${66.66666666666667} | ${33.33333333333333} | ${100} | ${0}        | ${25}               | ${100}
    `(
      `When the lowestViewableValue is $lowestViewableValue
    bar0 is 100 y is $zeroY and height is $zeroHeight 
    bar1 is 75 y is $oneY and height is $oneHeight 
    bar2 is 50 y is $twoY and height is $twoHeight 
    bar3 is 25 y is $threeY and height is $threeHeight`,
      ({
        zeroY,
        zeroHeight,
        oneY,
        oneHeight,
        twoY,
        twoHeight,
        threeY,
        threeHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        const data: QsBarData[] = [
          { lowerBoundry: 0, upperBoundry: 100 },
          { lowerBoundry: 0, upperBoundry: 75 },
          { lowerBoundry: 0, upperBoundry: 50 },
          { lowerBoundry: 0, upperBoundry: 25 },
        ]

        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        const qsCanvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)

        const canvas: Canvas = {
          canvasGroup: qsCanvas.canvasGroup,
          canvasDataGroup: qsCanvas.canvasDataGroup,
          config: qsCanvas.config,
          scales,
          configStore: new ConfigStoreManager().getters,
          elements: [],
        }
        const calculatedData = getCalculatedData(
          canvas,
          data,
          Orientation.HORIZONTAL,
          config
        )
        expect(calculatedData[0].barData.rectangleParams.y).toEqual(zeroY)
        expect(calculatedData[0].barData.rectangleParams.height).toEqual(
          zeroHeight
        )
        expect(calculatedData[1].barData.rectangleParams.y).toEqual(oneY)
        expect(calculatedData[1].barData.rectangleParams.height).toEqual(
          oneHeight
        )
        expect(calculatedData[2].barData.rectangleParams.y).toEqual(twoY)
        expect(calculatedData[2].barData.rectangleParams.height).toEqual(
          twoHeight
        )
        expect(calculatedData[3].barData.rectangleParams.y).toEqual(threeY)
        expect(calculatedData[3].barData.rectangleParams.height).toEqual(
          threeHeight
        )
      }
    )

    test.each`
      zeroY | zeroHeight | oneY | oneHeight            | lowestViewableValue | highestViewableValue
      ${0}  | ${100}     | ${0} | ${90}                | ${0}                | ${100}
      ${0}  | ${100}     | ${0} | ${94.73684210526315} | ${5}                | ${100}
      ${0}  | ${100}     | ${0} | ${100}               | ${10}               | ${100}
    `(
      `When the lowestViewableValue is $lowestViewableValue
    bar0 is 100 y is $zeroY and height is $zeroHeight
    bar1 is 75 y is $oneY and height is $oneHeight
    bar2 is 50 y is $twoY and height is $twoHeight
    bar3 is 25 y is $threeY and height is $threeHeight`,
      ({
        zeroY,
        zeroHeight,
        oneY,
        oneHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        const data: QsBarData[] = [
          { lowerBoundry: 0, upperBoundry: 100 },
          { lowerBoundry: 10, upperBoundry: 100 },
        ]

        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        const qsCanvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)

        const canvas: Canvas = {
          canvasGroup: qsCanvas.canvasGroup,
          canvasDataGroup: qsCanvas.canvasDataGroup,
          config: qsCanvas.config,
          scales,
          configStore: new ConfigStoreManager().getters,
          elements: [],
        }
        const calculatedData = getCalculatedData(
          canvas,
          data,
          Orientation.HORIZONTAL,
          config
        )
        expect(calculatedData[0].barData.rectangleParams.y).toEqual(zeroY)
        expect(calculatedData[0].barData.rectangleParams.height).toEqual(
          zeroHeight
        )
        expect(calculatedData[1].barData.rectangleParams.y).toEqual(oneY)
        expect(calculatedData[1].barData.rectangleParams.height).toEqual(
          oneHeight
        )
      }
    )
  })

  describe('Vertical', () => {
    test.each`
      zeroY | zeroHeight | oneY | oneHeight            | twoY | twoHeight            | threeY | threeHeight | lowestViewableValue | highestViewableValue
      ${0}  | ${100}     | ${0} | ${75}                | ${0} | ${50}                | ${0}   | ${25}       | ${0}                | ${100}
      ${0}  | ${100}     | ${0} | ${66.66666666666666} | ${0} | ${33.33333333333333} | ${0}   | ${0}        | ${25}               | ${100}
    `(
      `When the lowestViewableValue is $lowestViewableValue
    bar0 is 100 y is $zeroY and height is $zeroHeight 
    bar1 is 75 y is $oneY and height is $oneHeight 
    bar2 is 50 y is $twoY and height is $twoHeight 
    bar3 is 25 y is $threeY and height is $threeHeight`,
      ({
        zeroY,
        zeroHeight,
        oneY,
        oneHeight,
        twoY,
        twoHeight,
        threeY,
        threeHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        const data: QsBarData[] = [
          { lowerBoundry: 0, upperBoundry: 100 },
          { lowerBoundry: 0, upperBoundry: 75 },
          { lowerBoundry: 0, upperBoundry: 50 },
          { lowerBoundry: 0, upperBoundry: 25 },
        ]

        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        const qsCanvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)

        const canvas: Canvas = {
          canvasGroup: qsCanvas.canvasGroup,
          canvasDataGroup: qsCanvas.canvasDataGroup,
          config: qsCanvas.config,
          scales,
          configStore: new ConfigStoreManager().getters,
          elements: [],
        }
        const calculatedData = getCalculatedData(
          canvas,
          data,
          Orientation.VERTICAL,
          config
        )
        expect(calculatedData[0].barData.rectangleParams.x).toEqual(zeroY)
        expect(calculatedData[0].barData.rectangleParams.width).toEqual(
          zeroHeight
        )
        expect(calculatedData[1].barData.rectangleParams.x).toEqual(oneY)
        expect(calculatedData[1].barData.rectangleParams.width).toEqual(
          oneHeight
        )
        expect(calculatedData[2].barData.rectangleParams.x).toEqual(twoY)
        expect(calculatedData[2].barData.rectangleParams.width).toEqual(
          twoHeight
        )
        expect(calculatedData[3].barData.rectangleParams.x).toEqual(threeY)
        expect(calculatedData[3].barData.rectangleParams.width).toEqual(
          threeHeight
        )
      }
    )

    test.each`
      zeroY | zeroHeight | oneY                 | oneHeight            | lowestViewableValue | highestViewableValue
      ${0}  | ${100}     | ${10}                | ${90}                | ${0}                | ${100}
      ${0}  | ${100}     | ${5.263157894736842} | ${94.73684210526315} | ${5}                | ${100}
      ${0}  | ${100}     | ${0}                 | ${100}               | ${10}               | ${100}
    `(
      `When the lowestViewableValue is $lowestViewableValue
    bar0 is 100 y is $zeroY and height is $zeroHeight
    bar1 is 75 y is $oneY and height is $oneHeight
    bar2 is 50 y is $twoY and height is $twoHeight
    bar3 is 25 y is $threeY and height is $threeHeight`,
      ({
        zeroY,
        zeroHeight,
        oneY,
        oneHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        const data: QsBarData[] = [
          { lowerBoundry: 0, upperBoundry: 100 },
          { lowerBoundry: 10, upperBoundry: 100 },
        ]

        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        const qsCanvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)

        const canvas: Canvas = {
          canvasGroup: qsCanvas.canvasGroup,
          canvasDataGroup: qsCanvas.canvasDataGroup,
          config: qsCanvas.config,
          scales,
          configStore: new ConfigStoreManager().getters,
          elements: [],
        }
        const calculatedData = getCalculatedData(
          canvas,
          data,
          Orientation.VERTICAL,
          config
        )
        expect(calculatedData[0].barData.rectangleParams.x).toEqual(zeroY)
        expect(calculatedData[0].barData.rectangleParams.width).toEqual(
          zeroHeight
        )
        expect(calculatedData[1].barData.rectangleParams.x).toEqual(oneY)
        expect(calculatedData[1].barData.rectangleParams.width).toEqual(
          oneHeight
        )
      }
    )
  })
})
