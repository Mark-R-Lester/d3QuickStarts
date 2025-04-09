import { getScales } from './getScales'

import { CanvasConfigStrict } from './types'

let canvasConfig: CanvasConfigStrict = {
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

beforeEach(() => {
  canvasConfig = {
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
})

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

  describe('xPercentScaleInverted', () => {
    test.each`
      valueToScale | scaledValue | lowestViewableValue | highestViewableValue
      ${25}        | ${75}       | ${0}                | ${100}
      ${25}        | ${75}       | ${50}               | ${100}
    `(
      `xPercentScaleInverted is unaffected by changes to lowestViewableValue or highestViewableValue
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
        expect(scales.xPercentScaleInverted(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth
      ${25}        | ${75}       | ${100}            | ${100}
      ${25}        | ${150}      | ${100}            | ${200}
      ${25}        | ${75}       | ${200}            | ${100}
    `(
      `xPercentScaleInverted is only affected by changes to displayAreaWidth
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({ valueToScale, scaledValue, displayAreaWidth, displayAreaHeight }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        const scales = getScales(canvasConfig)
        expect(scales.xPercentScaleInverted(valueToScale)).toEqual(scaledValue)
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

  describe('yPercentScaleInverted', () => {
    test.each`
      valueToScale | scaledValue | lowestViewableValue | highestViewableValue
      ${25}        | ${75}       | ${0}                | ${100}
      ${25}        | ${75}       | ${50}               | ${100}
    `(
      `yPercentScaleInverted is unaffected by changes to lowestViewableValue or highestViewableValue
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
        expect(scales.yPercentScaleInverted(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth
      ${25}        | ${75}       | ${100}            | ${100}
      ${25}        | ${75}       | ${100}            | ${200}
      ${25}        | ${150}      | ${200}            | ${100}
    `(
      `yPercentScaleInverted is only affected by changes to displayAreaWidth
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({ valueToScale, scaledValue, displayAreaWidth, displayAreaHeight }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        const scales = getScales(canvasConfig)
        expect(scales.yPercentScaleInverted(valueToScale)).toEqual(scaledValue)
      }
    )
  })

  describe('xDataScale', () => {
    test.each`
      valueToScale | scaledValue | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${25}       | ${100}           | ${0}                | ${100}
      ${25}        | ${25}       | ${200}           | ${0}                | ${100}
      ${25}        | ${-50}      | ${100}           | ${50}               | ${100}
      ${25}        | ${12.5}     | ${100}           | ${0}                | ${200}
    `(
      `xDataScale is affected by changes to displayAreaWidth, lowestViewableValue and highestViewableValue
        when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
        valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.xDataScale(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${25}       | ${100}            | ${100}           | ${0}                | ${100}
      ${25}        | ${25}       | ${200}            | ${100}           | ${0}                | ${100}
    `(
      `xDataScale is not affected by changes to  displayAreaHeight
      when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
      valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.xDataScale(valueToScale)).toEqual(scaledValue)
      }
    )
  })

  describe('xDataScaleInverted', () => {
    test.each`
      valueToScale | scaledValue | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${75}       | ${100}           | ${0}                | ${100}
      ${25}        | ${75}       | ${200}           | ${0}                | ${100}
      ${25}        | ${150}      | ${100}           | ${50}               | ${100}
      ${25}        | ${87.5}     | ${100}           | ${0}                | ${200}
    `(
      `xDataScaleInverted is affected by changes to displayAreaWidth, lowestViewableValue and highestViewableValue
        when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
        valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.xDataScaleInverted(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${75}       | ${100}            | ${100}           | ${0}                | ${100}
      ${25}        | ${75}       | ${200}            | ${100}           | ${0}                | ${100}
    `(
      `xDataScaleInverted is not affected by changes to  displayAreaHeight
      when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
      valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.xDataScaleInverted(valueToScale)).toEqual(scaledValue)
      }
    )
  })

  describe('yDataScale', () => {
    test.each`
      valueToScale | scaledValue | displayAreaHeight | lowestViewableValue | highestViewableValue
      ${25}        | ${75}       | ${100}            | ${0}                | ${100}
      ${25}        | ${150}      | ${200}            | ${0}                | ${100}
      ${25}        | ${150}      | ${100}            | ${50}               | ${100}
      ${25}        | ${87.5}     | ${100}            | ${0}                | ${200}
    `(
      `yDataScale is affected by changes to displayAreaHeight, lowestViewableValue and highestViewableValue
        when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
        valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.yDataScale(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${75}       | ${100}            | ${100}           | ${0}                | ${100}
      ${25}        | ${75}       | ${100}            | ${200}           | ${0}                | ${100}
    `(
      `yDataScale is not affected by changes to  displayAreaWidth
      when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
      valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.yDataScale(valueToScale)).toEqual(scaledValue)
      }
    )
  })

  describe('yDataScaleInverted', () => {
    test.each`
      valueToScale | scaledValue | displayAreaHeight | lowestViewableValue | highestViewableValue
      ${25}        | ${25}       | ${100}            | ${0}                | ${100}
      ${25}        | ${50}       | ${200}            | ${0}                | ${100}
      ${25}        | ${-50}      | ${100}            | ${50}               | ${100}
      ${25}        | ${12.5}     | ${100}            | ${0}                | ${200}
    `(
      `yDataScaleInverted is affected by changes to displayAreaHeight, lowestViewableValue and highestViewableValue
        when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
        valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.yDataScaleInverted(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${25}       | ${100}            | ${100}           | ${0}                | ${100}
      ${25}        | ${25}       | ${100}            | ${200}           | ${0}                | ${100}
    `(
      `yDataScaleInverted is not affected by changes to  displayAreaWidth
      when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
      valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.yDataScaleInverted(valueToScale)).toEqual(scaledValue)
      }
    )
  })

  describe('xDataScalePlotted', () => {
    test.each`
      valueToScale | scaledValue           | displayAreaHeight | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${25}                 | ${100}            | ${100}           | ${0}                | ${100}
      ${25}        | ${12.5}               | ${100}            | ${100}           | ${0}                | ${200}
      ${25}        | ${50}                 | ${100}            | ${100}           | ${0}                | ${50}
      ${25}        | ${16.666666666666664} | ${100}            | ${100}           | ${10}               | ${100}
      ${25}        | ${0}                  | ${100}            | ${100}           | ${25}               | ${100}
    `(
      `xDataScalePlotted is affected by changes to lowestViewableValue, highestViewableValue
      when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
      valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.xDataScalePlotted(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${25}       | ${100}            | ${100}           | ${0}                | ${100}
      ${25}        | ${25}       | ${100}            | ${200}           | ${0}                | ${100}
      ${25}        | ${25}       | ${200}            | ${100}           | ${0}                | ${100}
      ${25}        | ${50}       | ${200}            | ${400}           | ${0}                | ${100}
      ${25}        | ${50}       | ${400}            | ${200}           | ${0}                | ${100}
    `(
      `xDataScalePlotted is affected by changes to the value of displayAreaHeight or displayAreaWidth
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.xDataScalePlotted(valueToScale)).toEqual(scaledValue)
      }
    )
  })

  describe('yDataScalePlotted', () => {
    test.each`
      valueToScale | scaledValue          | displayAreaHeight | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${75}                | ${100}            | ${100}           | ${0}                | ${100}
      ${25}        | ${87.5}              | ${100}            | ${100}           | ${0}                | ${200}
      ${25}        | ${50}                | ${100}            | ${100}           | ${0}                | ${50}
      ${25}        | ${83.33333333333334} | ${100}            | ${100}           | ${10}               | ${100}
      ${25}        | ${100}               | ${100}            | ${100}           | ${25}               | ${100}
    `(
      `yDataScalePlotted is affected by changes to lowestViewableValue, highestViewableValue
      when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
      valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.yDataScalePlotted(valueToScale)).toEqual(scaledValue)
      }
    )

    test.each`
      valueToScale | scaledValue | displayAreaHeight | displayAreaWidth | lowestViewableValue | highestViewableValue
      ${25}        | ${75}       | ${100}            | ${100}           | ${0}                | ${100}
      ${25}        | ${75}       | ${100}            | ${200}           | ${0}                | ${100}
      ${25}        | ${75}       | ${200}            | ${100}           | ${0}                | ${100}
      ${25}        | ${150}      | ${200}            | ${400}           | ${0}                | ${100}
      ${25}        | ${150}      | ${400}            | ${200}           | ${0}                | ${100}
    `(
      `yDataScalePlotted is affected by changes to the value of displayAreaHeight or displayAreaWidth
      when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
      valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
      ({
        valueToScale,
        scaledValue,
        displayAreaWidth,
        displayAreaHeight,
        lowestViewableValue,
        highestViewableValue,
      }) => {
        canvasConfig.displayAreaHeight = displayAreaHeight
        canvasConfig.displayAreaWidth = displayAreaWidth
        canvasConfig.lowestViewableValue = lowestViewableValue
        canvasConfig.highestViewableValue = highestViewableValue
        const scales = getScales(canvasConfig)
        expect(scales.yDataScalePlotted(valueToScale)).toEqual(scaledValue)
      }
    )
  })
})
