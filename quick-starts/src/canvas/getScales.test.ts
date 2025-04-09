import { getScales } from './getScales'

import { CanvasConfigStrict } from './types'

const canvasConfig: CanvasConfigStrict = {
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
  displayAreaHeight: 100,
  displayAreaWidth: 100,
}

describe('getScales', () => {
  describe('GenralPercentScale', () => {
    test.each`
      valueToScale | scaledValue | lowestViewableValue | highestViewableValue
      ${25}        | ${25}       | ${0}                | ${100}
      ${25}        | ${25}       | ${50}               | ${100}
    `(
      `GenralPercentScale is unaffected by changes to lowestViewableValue or highestViewableValue
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.genralPercentScale(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth
      ${25}        | ${25}       | ${100}            | ${100}
      ${25}        | ${25}       | ${100}            | ${200}
      ${25}        | ${25}       | ${200}            | ${100}
      ${25}        | ${50}       | ${300}            | ${200}
    `(
      `GenralPercentScale is only affected by changes to lowest value of displayAreaHeight and displayAreaWidth
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({ valueToScale, scaledValue, displayAreaWidth, displayAreaHeight }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        const scales = getScales(canvasConfig)
        expect(scales.genralPercentScale(valueToScale)).toEqual(scaledValue)
      }
    )
  })

  describe('XPercentScale', () => {
    test.each`
      valueToScale | scaledValue | lowestViewableValue | highestViewableValue
      ${25}        | ${25}       | ${0}                | ${100}
      ${25}        | ${25}       | ${50}               | ${100}
    `(
      `XPercentScale is unaffected by changes to lowestViewableValue or highestViewableValue
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.xPercentScale(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth
      ${25}        | ${25}       | ${100}            | ${100}
      ${25}        | ${50}       | ${100}            | ${200}
      ${25}        | ${25}       | ${200}            | ${100}
    `(
      `XPercentScale is only affected by changes to displayAreaWidth
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({ valueToScale, scaledValue, displayAreaWidth, displayAreaHeight }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        const scales = getScales(canvasConfig)
        expect(scales.xPercentScale(valueToScale)).toEqual(scaledValue)
      }
    )
  })

  describe('YPercentScale', () => {
    test.each`
      valueToScale | scaledValue | lowestViewableValue | highestViewableValue
      ${25}        | ${25}       | ${0}                | ${100}
      ${25}        | ${25}       | ${50}               | ${100}
    `(
      `YPercentScale is unaffected by changes to lowestViewableValue or highestViewableValue
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.highestViewableValue = highestViewableValue
        canvasConfig.lowestViewableValue = lowestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.yPercentScale(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth
      ${25}        | ${25}       | ${100}            | ${100}
      ${25}        | ${25}       | ${100}            | ${200}
      ${25}        | ${50}       | ${200}            | ${100}
    `(
      `YPercentScale is only affected by changes to displayAreaWidth
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({ valueToScale, scaledValue, displayAreaWidth, displayAreaHeight }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        const scales = getScales(canvasConfig)
        expect(scales.yPercentScale(valueToScale)).toEqual(scaledValue)
      }
    )
  })
})
