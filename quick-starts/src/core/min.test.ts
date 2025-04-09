import {
  qsFindMinSum,
  qsFindMin,
  qsFindMinCoordinateX,
  qsFindMinCoordinateY,
} from './min'

describe('conversion testing', () => {
  test('find min sum', () => {
    const arrays = [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ]
    expect(qsFindMinSum(arrays)).toBe(2)
  })

  test('find min', () => {
    const arrays = [
      [1, 1],
      [2, 2],
      [3, 7],
      [4, 4],
    ]
    expect(qsFindMin(arrays)).toBe(1)
  })

  test('find min corodinate x', () => {
    const arrays = [
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 9, y: 10 },
      { x: 1, y: 1 },
    ]
    expect(qsFindMinCoordinateX(arrays)).toBe(1)
  })

  test('find min corodinate y', () => {
    const arrays = [
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 9, y: 10 },
      { x: 1, y: 1 },
    ]
    expect(qsFindMinCoordinateY(arrays)).toBe(1)
  })
})
