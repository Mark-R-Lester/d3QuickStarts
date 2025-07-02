import { rotateCorners } from './rotateCorners'

describe('rotateCorners testing', () => {
  const fullRadiiTestCase = {
    actual: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: 20,
      topRightCornerRadiusCx: 40,
      bottomLeftCornerRadiusCx: 10,
      bottomRightCornerRadiusCx: 30,
      topLeftCornerRadiusCy: 25,
      topRightCornerRadiusCy: 45,
      bottomLeftCornerRadiusCy: 15,
      bottomRightCornerRadiusCy: 35,
    },
    expected: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: 10,
      topLeftCornerRadiusCy: 15,
      topRightCornerRadiusCx: 20,
      topRightCornerRadiusCy: 25,
      bottomRightCornerRadiusCx: 40,
      bottomRightCornerRadiusCy: 45,
      bottomLeftCornerRadiusCx: 30,
      bottomLeftCornerRadiusCy: 35,
    },
  }

  const partialRadiiTestCase = {
    actual: {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topRightCornerRadiusCx: 40,
      topRightCornerRadiusCy: 45,
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
      bottomRightCornerRadiusCx: 40,
      bottomRightCornerRadiusCy: 45,
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
      topRightCornerRadiusCx: 0,
      bottomLeftCornerRadiusCx: 0,
      bottomRightCornerRadiusCx: 0,
      topLeftCornerRadiusCy: 0,
      topRightCornerRadiusCy: 0,
      bottomLeftCornerRadiusCy: 0,
      bottomRightCornerRadiusCy: 0,
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

  const minimalDimensionsTestCase = {
    actual: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
      topLeftCornerRadiusCx: 20,
      topRightCornerRadiusCx: 40,
      bottomLeftCornerRadiusCx: 10,
      bottomRightCornerRadiusCx: 30,
      topLeftCornerRadiusCy: 25,
      topRightCornerRadiusCy: 45,
      bottomLeftCornerRadiusCy: 15,
      bottomRightCornerRadiusCy: 35,
    },
    expected: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
      topLeftCornerRadiusCx: 10,
      topLeftCornerRadiusCy: 15,
      topRightCornerRadiusCx: 20,
      topRightCornerRadiusCy: 25,
      bottomRightCornerRadiusCx: 40,
      bottomRightCornerRadiusCy: 45,
      bottomLeftCornerRadiusCx: 30,
      bottomLeftCornerRadiusCy: 35,
    },
  }

  test.each`
    description                     | testCase
    ${'all corner radii specified'} | ${fullRadiiTestCase}
    ${'partial radii specified'}    | ${partialRadiiTestCase}
    ${'all radii undefined'}        | ${noRadiiTestCase}
    ${'zero-valued radii'}          | ${zeroRadiiTestCase}
    ${'minimal dimensions'}         | ${minimalDimensionsTestCase}
  `('rotates corners with $description', ({ testCase }) => {
    const result = rotateCorners(testCase.actual)
    expect(result).toEqual(testCase.expected)
  })
})
