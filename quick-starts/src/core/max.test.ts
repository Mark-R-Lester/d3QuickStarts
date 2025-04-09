import {
  qsFindMax,
  qsFindMaxCoordinateX,
  qsFindMaxCoordinateY,
  qsFindMaxSum,
} from './max'

describe('conversion testing', () => {
  test('find max sum', () => {
    const arrays = [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ]
    expect(qsFindMaxSum(arrays)).toBe(8)
  })

  test('find max', () => {
    const arrays = [
      [1, 1],
      [2, 2],
      [3, 7],
      [4, 4],
    ]
    expect(qsFindMax(arrays)).toBe(7)
  })

  test('find max corodinate x', () => {
    const arrays = [
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 9, y: 10 },
      { x: 1, y: 1 },
    ]
    expect(qsFindMaxCoordinateX(arrays)).toBe(9)
  })

  test('find max corodinate y', () => {
    const arrays = [
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 9, y: 10 },
      { x: 1, y: 1 },
    ]
    expect(qsFindMaxCoordinateY(arrays)).toBe(10)
  })
})
