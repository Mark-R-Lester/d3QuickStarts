import { getScales } from '../../canvas/getScales'
import { CanvasConfig } from '../../canvas/types'
import {
  GlobalDefaultColors,
  GlobalDefaultSettings,
  Orientation,
} from '../../core/enums/enums'
import { Canvas, qsCreateCanvas } from '../../canvas/canvas'
import { QsCanvas } from '../../canvas/qsTypes'
import { getCalculatedData } from './calculatedData'
import { QsBarData } from './qsTypes'
import { BarConfig, DrawArgs } from './types'
import { JSDOM } from 'jsdom'
import { ConfigStoreManager } from '../../core/config/configStore.class'

const dom = new JSDOM()
global.document = dom.window.document

describe('Linear Bars calculatedData', () => {
  const config: BarConfig = {
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
        const args: DrawArgs = {
          data,
          orientation: Orientation.HORIZONTAL,
        }

        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        const qsCanvas: QsCanvas = qsCreateCanvas(canvasConfig)

        const canvas: Canvas = {
          displayGroup: qsCanvas.displayGroup,
          config: qsCanvas.config,
          scales,
          configStore: new ConfigStoreManager().getters,
        }
        const calculatedData = getCalculatedData(canvas, args, config)
        expect(calculatedData[0].barData.y).toEqual(zeroY)
        expect(calculatedData[0].barData.height).toEqual(zeroHeight)
        expect(calculatedData[1].barData.y).toEqual(oneY)
        expect(calculatedData[1].barData.height).toEqual(oneHeight)
        expect(calculatedData[2].barData.y).toEqual(twoY)
        expect(calculatedData[2].barData.height).toEqual(twoHeight)
        expect(calculatedData[3].barData.y).toEqual(threeY)
        expect(calculatedData[3].barData.height).toEqual(threeHeight)
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
        const args: DrawArgs = {
          data,
          orientation: Orientation.HORIZONTAL,
        }

        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        const qsCanvas: QsCanvas = qsCreateCanvas(canvasConfig)

        const canvas: Canvas = {
          displayGroup: qsCanvas.displayGroup,
          config: qsCanvas.config,
          scales,
          configStore: new ConfigStoreManager().getters,
        }
        const calculatedData = getCalculatedData(canvas, args, config)
        expect(calculatedData[0].barData.y).toEqual(zeroY)
        expect(calculatedData[0].barData.height).toEqual(zeroHeight)
        expect(calculatedData[1].barData.y).toEqual(oneY)
        expect(calculatedData[1].barData.height).toEqual(oneHeight)
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
        const args: DrawArgs = {
          data,
          orientation: Orientation.VERTICAL,
        }

        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        const qsCanvas: QsCanvas = qsCreateCanvas(canvasConfig)

        const canvas: Canvas = {
          displayGroup: qsCanvas.displayGroup,
          config: qsCanvas.config,
          scales,
          configStore: new ConfigStoreManager().getters,
        }
        const calculatedData = getCalculatedData(canvas, args, config)
        expect(calculatedData[0].barData.x).toEqual(zeroY)
        expect(calculatedData[0].barData.width).toEqual(zeroHeight)
        expect(calculatedData[1].barData.x).toEqual(oneY)
        expect(calculatedData[1].barData.width).toEqual(oneHeight)
        expect(calculatedData[2].barData.x).toEqual(twoY)
        expect(calculatedData[2].barData.width).toEqual(twoHeight)
        expect(calculatedData[3].barData.x).toEqual(threeY)
        expect(calculatedData[3].barData.width).toEqual(threeHeight)
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
        const args: DrawArgs = {
          data,
          orientation: Orientation.VERTICAL,
        }

        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        const qsCanvas: QsCanvas = qsCreateCanvas(canvasConfig)

        const canvas: Canvas = {
          displayGroup: qsCanvas.displayGroup,
          config: qsCanvas.config,
          scales,
          configStore: new ConfigStoreManager().getters,
        }
        const calculatedData = getCalculatedData(canvas, args, config)
        expect(calculatedData[0].barData.x).toEqual(zeroY)
        expect(calculatedData[0].barData.width).toEqual(zeroHeight)
        expect(calculatedData[1].barData.x).toEqual(oneY)
        expect(calculatedData[1].barData.width).toEqual(oneHeight)
      }
    )
  })
})
