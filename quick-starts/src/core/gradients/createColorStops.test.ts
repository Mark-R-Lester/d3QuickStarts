import { createColorStops } from './createColorStops'
import { QsColorStop } from './gradients'

const multipleColors: string[] = ['red', 'blue', 'green']
const singleColor: string[] = ['yellow']
const emptyColors: string[] = []

const multipleColorsExpected: QsColorStop[] = [
  { color: 'red', offset: 0 },
  { color: 'blue', offset: 50 },
  { color: 'green', offset: 100 },
]

const singleColorExpected: QsColorStop[] = [{ color: 'yellow', offset: NaN }]

const emptyColorsExpected: QsColorStop[] = []

describe('createColorStops', () => {
  test.each`
    colors            | expected
    ${multipleColors} | ${multipleColorsExpected}
    ${singleColor}    | ${singleColorExpected}
    ${emptyColors}    | ${emptyColorsExpected}
  `(
    'When colors is $colors, it should return expected = $expected',
    ({ colors, expected }) => {
      const result = createColorStops(colors)
      expect(result).toEqual(expected)
    }
  )
})
