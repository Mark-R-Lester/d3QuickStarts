import { getScales } from './getScales'

import { JSDOM } from 'jsdom'
import { CanvasConfigStrict } from './types'

const dom = new JSDOM()
global.document = dom.window.document

describe('Get scales', () => {
  test.each`
    valueToScale | scaledValue | lowestViewableValue | highestViewableValue
    ${25}        | ${25}       | ${0}                | ${100}
    ${0}         | ${0}        | ${25}               | ${100}
  `(
    `GenralPercentScale 
    when the lowestViewableValue is $lowestViewableValue and the highestViewableValue is $highestViewableValue
    valueToScale is $valueToScaleis the scaledValue should be $scaledValue`,
    ({
      valueToScale,
      scaledValue,
      lowestViewableValue,
      highestViewableValue,
    }) => {
      const canvasConfig: CanvasConfigStrict = {
        chartName: 'myChart',
        width: 100,
        height: 100,
        marginRight: 0,
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 0,
        highestViewableValue,
        lowestViewableValue,
        borderColor: 'lightgrey',
        displayAreaHeight: 100,
        displayAreaWidth: 100,
      }
      const scales = getScales(canvasConfig)
      expect(scales.genralPercentScale(valueToScale)).toEqual(scaledValue)
    }
  )
})
