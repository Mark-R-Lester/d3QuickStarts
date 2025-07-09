import { addColorsToGradient } from './addColorsToGradient'
import * as d3 from 'd3'
import { QsColorStop } from './gradients'

jest.mock('d3', () => ({
  select: jest.fn(() => ({
    append: jest.fn().mockReturnThis(),
    attr: jest.fn().mockReturnThis(),
  })),
}))

// Define constants for test inputs in camelCase
const multipleStops: QsColorStop[] = [
  { color: 'red', offset: 0 },
  { color: 'blue', offset: 50 },
  { color: 'green', offset: 100 },
]
const singleStop: QsColorStop[] = [{ color: 'yellow', offset: 25 }]
const emptyStops: QsColorStop[] = []

const multipleStopsExpectedCalls: any[] = [
  ['append', 'stop'],
  ['attr', 'offset', '0%'],
  ['attr', 'stop-color', 'red'],
  ['append', 'stop'],
  ['attr', 'offset', '50%'],
  ['attr', 'stop-color', 'blue'],
  ['append', 'stop'],
  ['attr', 'offset', '100%'],
  ['attr', 'stop-color', 'green'],
]
const singleStopExpectedCalls: any[] = [
  ['append', 'stop'],
  ['attr', 'offset', '25%'],
  ['attr', 'stop-color', 'yellow'],
]
const emptyStopsExpectedCalls: any[] = []

describe('addColorsToGradient', () => {
  let mockGradient: any

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
    // Create a mock gradient selection
    mockGradient = d3.select(null)
  })

  test.each`
    stops            | expectedCalls
    ${multipleStops} | ${multipleStopsExpectedCalls}
    ${singleStop}    | ${singleStopExpectedCalls}
    ${emptyStops}    | ${emptyStopsExpectedCalls}
  `(
    'When stops is $stops, it should make expected D3 calls = $expectedCalls',
    ({ stops, expectedCalls }) => {
      // Call the function
      addColorsToGradient(stops, mockGradient)

      // Verify the number of D3 method calls
      expect(mockGradient.append).toHaveBeenCalledTimes(stops.length)
      expect(mockGradient.attr).toHaveBeenCalledTimes(stops.length * 2)

      // Verify each expected call
      let appendCallIndex = 1
      let attrCallIndex = 1

      expectedCalls.forEach(([method, ...args]: [string, ...string[]]) => {
        if (method === 'append') {
          expect(mockGradient.append).toHaveBeenNthCalledWith(
            appendCallIndex++,
            ...args
          )
        } else if (method === 'attr') {
          expect(mockGradient.attr).toHaveBeenNthCalledWith(
            attrCallIndex++,
            ...args
          )
        }
      })
    }
  )
})
