import { JSDOM } from 'jsdom'
import { calculateDataSize } from './calculatedData'

const dom = new JSDOM()
global.document = dom.window.document

describe('Linear Bars calculateDataSize', () => {
  test.each`
    lowerBoundry | upperBoundry | lowestViewableValue | expectedResult
    ${0}         | ${200}       | ${0}                | ${200}
    ${0}         | ${200}       | ${100}              | ${200}
    ${0}         | ${200}       | ${200}              | ${200}
    ${100}       | ${200}       | ${0}                | ${100}
    ${100}       | ${200}       | ${50}               | ${150}
    ${100}       | ${200}       | ${100}              | ${200}
    ${100}       | ${200}       | ${150}              | ${200}
    ${100}       | ${200}       | ${200}              | ${200}
  `(
    `When the lowestViewableValue is $lowestViewableValue
    lowerBoundry is $lowerBoundry and upperBoundry is $upperBoundry
    expectedResult = $expectedResult`,

    ({ lowerBoundry, upperBoundry, lowestViewableValue, expectedResult }) => {
      const result = calculateDataSize(
        lowestViewableValue,
        lowerBoundry,
        upperBoundry
      )

      expect(result).toEqual(expectedResult)
    }
  )
})
