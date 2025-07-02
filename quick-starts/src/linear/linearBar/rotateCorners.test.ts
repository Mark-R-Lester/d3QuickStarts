import { rotateCorners } from './rotateCorners'

describe('rotateCorners testing', () => {
  const fullRadiiTestCase = {
    actual: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: 1,
      topLeftCornerRadiusCy: 2,
      topRightCornerRadiusCx: 3,
      topRightCornerRadiusCy: 4,
      bottomRightCornerRadiusCx: 5,
      bottomRightCornerRadiusCy: 6,
      bottomLeftCornerRadiusCx: 7,
      bottomLeftCornerRadiusCy: 8,
    },
    expected: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: 7,
      topLeftCornerRadiusCy: 8,
      topRightCornerRadiusCx: 1,
      topRightCornerRadiusCy: 2,
      bottomRightCornerRadiusCx: 3,
      bottomRightCornerRadiusCy: 4,
      bottomLeftCornerRadiusCx: 5,
      bottomLeftCornerRadiusCy: 6,
    },
  }

  const partialRadiiTestCase = {
    actual: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: undefined,
      topLeftCornerRadiusCy: undefined,
      topRightCornerRadiusCx: 1,
      topRightCornerRadiusCy: 2,
      bottomRightCornerRadiusCx: undefined,
      bottomRightCornerRadiusCy: undefined,
      bottomLeftCornerRadiusCx: undefined,
      bottomLeftCornerRadiusCy: undefined,
    },
    expected: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: undefined,
      topLeftCornerRadiusCy: undefined,
      topRightCornerRadiusCx: undefined,
      topRightCornerRadiusCy: undefined,
      bottomRightCornerRadiusCx: 1,
      bottomRightCornerRadiusCy: 2,
      bottomLeftCornerRadiusCx: undefined,
      bottomLeftCornerRadiusCy: undefined,
    },
  }

  const noRadiiTestCase = {
    actual: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: undefined,
      topLeftCornerRadiusCy: undefined,
      topRightCornerRadiusCx: undefined,
      topRightCornerRadiusCy: undefined,
      bottomRightCornerRadiusCx: undefined,
      bottomRightCornerRadiusCy: undefined,
      bottomLeftCornerRadiusCx: undefined,
      bottomLeftCornerRadiusCy: undefined,
    },
    expected: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: undefined,
      topLeftCornerRadiusCy: undefined,
      topRightCornerRadiusCx: undefined,
      topRightCornerRadiusCy: undefined,
      bottomRightCornerRadiusCx: undefined,
      bottomRightCornerRadiusCy: undefined,
      bottomLeftCornerRadiusCx: undefined,
      bottomLeftCornerRadiusCy: undefined,
    },
  }

  const zeroRadiiTestCase = {
    actual: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: 0,
      topLeftCornerRadiusCy: 0,
      topRightCornerRadiusCx: 0,
      topRightCornerRadiusCy: 0,
      bottomRightCornerRadiusCx: 0,
      bottomRightCornerRadiusCy: 0,
      bottomLeftCornerRadiusCx: 0,
      bottomLeftCornerRadiusCy: 0,
    },
    expected: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: 0,
      topLeftCornerRadiusCy: 0,
      topRightCornerRadiusCx: 0,
      topRightCornerRadiusCy: 0,
      bottomRightCornerRadiusCx: 0,
      bottomRightCornerRadiusCy: 0,
      bottomLeftCornerRadiusCx: 0,
      bottomLeftCornerRadiusCy: 0,
    },
  }

  test.each`
    description                     | testCase
    ${'all corner radii specified'} | ${fullRadiiTestCase}
    ${'partial radii specified'}    | ${partialRadiiTestCase}
    ${'all radii undefined'}        | ${noRadiiTestCase}
    ${'zero-valued radii'}          | ${zeroRadiiTestCase}
  `('rotates corners with $description', ({ testCase }) => {
    const result = rotateCorners(testCase.actual)
    expect(result).toEqual(testCase.expected)
  })
})
