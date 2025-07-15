import {
  hypotenuseFromAdjacent,
  hypotenuseFromOpposite,
  adjacentFromHypotenuse,
  adjacentFromOpposite,
  oppositeFromHypotenuse,
  oppositeFromAdjacent,
} from './trigonometricFunctions'

describe('Triangle Calculations', () => {
  describe('hypotenuseFromAdjacent', () => {
    test.each`
      input                                     | expected
      ${{ adjacent: 10, radians: Math.PI / 6 }} | ${11.547}
      ${{ adjacent: 5, radians: Math.PI / 4 }}  | ${7.071}
      ${{ adjacent: 10, radians: 0 }}           | ${10}
    `('calculates hypotenuse for given input', ({ input, expected }) => {
      expect(hypotenuseFromAdjacent(input)).toBeCloseTo(expected, 3)
    })
  })

  describe('hypotenuseFromOpposite', () => {
    test.each`
      input                                    | expected
      ${{ opposite: 5, radians: Math.PI / 6 }} | ${10}
      ${{ opposite: 5, radians: Math.PI / 4 }} | ${7.071}
    `('calculates hypotenuse for given input', ({ input, expected }) => {
      expect(hypotenuseFromOpposite(input)).toBeCloseTo(expected, 3)
    })
  })

  describe('adjacentFromHypotenuse', () => {
    test.each`
      input                                          | expected
      ${{ hypotenuse: 10, radians: Math.PI / 6 }}    | ${8.66}
      ${{ hypotenuse: 7.071, radians: Math.PI / 4 }} | ${5}
      ${{ hypotenuse: 10, radians: 0 }}              | ${10}
    `('calculates adjacent for given input', ({ input, expected }) => {
      expect(adjacentFromHypotenuse(input)).toBeCloseTo(expected, 3)
    })
  })

  describe('adjacentFromOpposite', () => {
    test.each`
      input                                    | expected
      ${{ opposite: 5, radians: Math.PI / 6 }} | ${8.66}
      ${{ opposite: 5, radians: Math.PI / 4 }} | ${5}
    `('calculates adjacent for given input', ({ input, expected }) => {
      expect(adjacentFromOpposite(input)).toBeCloseTo(expected, 3)
    })
  })

  describe('oppositeFromHypotenuse', () => {
    test.each`
      input                                          | expected
      ${{ hypotenuse: 10, radians: Math.PI / 6 }}    | ${5}
      ${{ hypotenuse: 7.071, radians: Math.PI / 4 }} | ${5}
      ${{ hypotenuse: 10, radians: 0 }}              | ${0}
    `('calculates opposite for given input', ({ input, expected }) => {
      expect(oppositeFromHypotenuse(input)).toBeCloseTo(expected, 3)
    })
  })

  describe('oppositeFromAdjacent', () => {
    test.each`
      input                                     | expected
      ${{ adjacent: 10, radians: Math.PI / 6 }} | ${5.774}
      ${{ adjacent: 5, radians: Math.PI / 4 }}  | ${5}
      ${{ adjacent: 10, radians: 0 }}           | ${0}
    `('calculates opposite for given input', ({ input, expected }) => {
      expect(oppositeFromAdjacent(input)).toBeCloseTo(expected, 3)
    })
  })
})
