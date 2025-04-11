import { JSDOM } from 'jsdom'
import { calculateDataWidth } from './calculatedData'

const dom = new JSDOM()
global.document = dom.window.document

describe('Linear Bars calculateDataSize', () => {
  test.each`
    lowerBoundry | upperBoundry | lowestViewableValue | highestViewableValue | expectedResult
    ${0}         | ${200}       | ${0}                | ${300}               | ${200}
    ${0}         | ${200}       | ${100}              | ${300}               | ${200}
    ${0}         | ${200}       | ${200}              | ${300}               | ${200}
    ${100}       | ${200}       | ${0}                | ${300}               | ${100}
    ${100}       | ${200}       | ${50}               | ${300}               | ${150}
    ${100}       | ${200}       | ${100}              | ${300}               | ${200}
    ${100}       | ${200}       | ${150}              | ${300}               | ${200}
    ${100}       | ${200}       | ${200}              | ${300}               | ${200}
    ${100}       | ${200}       | ${300}              | ${300}               | ${0}
  `(
    `When the lowestViewableValue is $lowestViewableValue
    lowerBoundry is $lowerBoundry and upperBoundry is $upperBoundry
    expectedResult = $expectedResult`,

    ({
      lowerBoundry,
      upperBoundry,
      lowestViewableValue,
      highestViewableValue,
      expectedResult,
    }) => {
      const result = calculateDataWidth(
        lowestViewableValue,
        highestViewableValue,
        lowerBoundry,
        upperBoundry
      )

      expect(result).toEqual(expectedResult)
    }
  )
})
