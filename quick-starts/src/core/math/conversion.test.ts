import { degreesToRadians, radiansToDegrees, toStrings } from './conversion'

describe('toStrings testing', () => {
  test.each`
    input                         | expected
    ${[1, 2, 3]}                  | ${['1', '2', '3']}
    ${[0, -5, 3.142]}             | ${['0', '-5', '3.142']}
    ${['hello', 'world']}         | ${['hello', 'world']}
    ${[1, 'two', 3.0]}            | ${['1', 'two', '3']}
    ${[]}                         | ${[]}
    ${[Infinity, NaN, -Infinity]} | ${['Infinity', 'NaN', '-Infinity']}
  `('converts $input to $expected', ({ input, expected }) => {
    const result = toStrings(input)
    expect(result).toEqual(expected)
  })
})

describe('degreesToRadians testing', () => {
  test.each`
    degrees | expected  | matcher
    ${180}  | ${3.142}  | ${'toBeCloseTo'}
    ${90}   | ${1.571}  | ${'toBeCloseTo'}
    ${0}    | ${0}      | ${'toBe'}
    ${-90}  | ${-1.571} | ${'toBeCloseTo'}
  `(
    'converts $degrees degrees to $expected radians',
    ({ degrees, expected, matcher }) => {
      const result = degreesToRadians(degrees)
      if (matcher === 'toBe') {
        expect(result).toBe(expected)
      } else {
        expect(result).toBeCloseTo(expected, 3)
      }
    }
  )
})

describe('radiansToDegrees testing', () => {
  test.each`
    radians         | expected | matcher
    ${Math.PI}      | ${180}   | ${'toBe'}
    ${Math.PI / 2}  | ${90}    | ${'toBeCloseTo'}
    ${0}            | ${0}     | ${'toBe'}
    ${-Math.PI / 2} | ${-90}   | ${'toBeCloseTo'}
  `(
    'converts $radians radians to $expected degrees',
    ({ radians, expected, matcher }) => {
      const result = radiansToDegrees(radians)
      if (matcher === 'toBe') {
        expect(result).toBe(expected)
      } else {
        expect(result).toBeCloseTo(expected, 3)
      }
    }
  )
})
