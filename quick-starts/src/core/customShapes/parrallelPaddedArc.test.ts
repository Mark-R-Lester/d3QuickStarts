import {
  calculateInnerRadius,
  calculateCentralAngle,
  adjustForParallelPadding,
  ParalelPaddedArcArgs,
} from './parallelPaddedArc'

describe('calculateInnerRadius testing', () => {
  test.each`
    padding | startAngle      | endAngle       | expected    | matcher
    ${10}   | ${0}            | ${Math.PI / 2} | ${14.24}    | ${'toBeCloseTo'}
    ${10}   | ${0}            | ${Math.PI * 2} | ${-9.9}     | ${'toBeCloseTo'}
    ${10}   | ${0}            | ${0}           | ${Infinity} | ${'toBe'}
    ${10}   | ${0}            | ${Math.PI}     | ${10.1}     | ${'toBeCloseTo'}
    ${10}   | ${-Math.PI / 2} | ${0}           | ${14.24}    | ${'toBeCloseTo'}
    ${0}    | ${0}            | ${Math.PI / 2} | ${0.1}      | ${'toBeCloseTo'}
  `(
    'calculates inner radius with padding=$padding, startAngle=$startAngle, endAngle=$endAngle to $expected',
    ({ padding, startAngle, endAngle, expected, matcher }) => {
      const result = calculateInnerRadius(padding, startAngle, endAngle)
      if (matcher === 'toBe') {
        expect(result).toBe(expected)
      } else {
        expect(result).toBeCloseTo(expected, 2)
      }
    }
  )
})

describe('calculateCentralAngle testing', () => {
  test.each`
    radius | gap   | expected | matcher
    ${100} | ${5}  | ${11.48} | ${'toBeCloseTo'}
    ${100} | ${0}  | ${0}     | ${'toBe'}
    ${100} | ${50} | ${180}   | ${'toBe'}
    ${0}   | ${5}  | ${NaN}   | ${'toBe'}
  `(
    'calculates central angle with radius=$radius, gap=$gap to $expected degrees',
    ({ radius, gap, expected, matcher }) => {
      const result = calculateCentralAngle(radius, gap)
      if (matcher === 'toBe') {
        expect(result).toBe(expected)
      } else {
        expect(result).toBeCloseTo(expected, 2)
      }
    }
  )
})

describe('adjustForParallelPadding testing', () => {
  test('returns correct CustomArcArgs with sufficient inner radius', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 50,
      startAngle: 0,
      endAngle: Math.PI / 2,
      padding: 10,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: 50,
      outerStartAngle: expect.closeTo(-1.471, 3),
      outerEndAngle: expect.closeTo(-0.1, 3),
      innerStartAngle: expect.closeTo(-1.369, 3),
      innerEndAngle: expect.closeTo(-0.201, 3),
    })
  })

  test('returns correct CustomArcArgs with small inner radius (angle ≤ 90°)', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 5,
      startAngle: 0,
      endAngle: Math.PI / 2,
      padding: 10,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: expect.closeTo(14.243, 2),
      outerStartAngle: expect.closeTo(-1.471, 3),
      outerEndAngle: expect.closeTo(-0.1, 3),
      innerStartAngle: expect.closeTo(-0.792, 3),
      innerEndAngle: expect.closeTo(-0.778, 3),
    })
  })

  test('returns correct CustomArcArgs with large angle (> 90°)', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 5,
      startAngle: 0,
      endAngle: Math.PI * 2,
      padding: 10,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: expect.closeTo(-9.9, 2),
      outerStartAngle: expect.closeTo(-1.471, 3),
      outerEndAngle: expect.closeTo(4.612, 3),
      innerStartAngle: expect.any(Number),
      innerEndAngle: expect.any(Number),
    })
  })

  test('returns correct CustomArcArgs with exactly 90° angle', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 5,
      startAngle: 0,
      endAngle: Math.PI,
      padding: 10,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: expect.closeTo(10.1, 2),
      outerStartAngle: expect.closeTo(-1.471, 3),
      outerEndAngle: expect.closeTo(1.471, 3),
      innerStartAngle: expect.closeTo(-0.141, 3),
      innerEndAngle: expect.closeTo(0.141, 3),
    })
  })

  test('returns correct CustomArcArgs with zero angle difference', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 5,
      startAngle: Math.PI / 2,
      endAngle: Math.PI / 2,
      padding: 10,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: Infinity,
      outerStartAngle: expect.closeTo(0.1, 3),
      outerEndAngle: expect.closeTo(-0.1, 3),
      innerStartAngle: expect.closeTo(0, 3),
      innerEndAngle: expect.closeTo(0, 3),
    })
  })

  test('returns correct CustomArcArgs with zero padding', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 50,
      startAngle: 0,
      endAngle: Math.PI / 2,
      padding: 0,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: 50,
      outerStartAngle: expect.closeTo(-1.571, 3),
      outerEndAngle: expect.closeTo(0, 3),
      innerStartAngle: expect.closeTo(-1.571, 3),
      innerEndAngle: expect.closeTo(0, 3),
    })
  })

  test('returns correct CustomArcArgs with negative angles', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 50,
      startAngle: -Math.PI / 2,
      endAngle: 0,
      padding: 10,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: 50,
      outerStartAngle: expect.closeTo(-3.041, 3),
      outerEndAngle: expect.closeTo(-1.671, 3),
      innerStartAngle: expect.closeTo(-2.94, 3),
      innerEndAngle: expect.closeTo(-1.772, 3),
    })
  })

  test('returns correct CustomArcArgs with zero inner radius', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 0,
      startAngle: 0,
      endAngle: Math.PI,
      padding: 10,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: expect.closeTo(10.1, 2),
      outerStartAngle: expect.closeTo(-1.471, 3),
      outerEndAngle: expect.closeTo(1.471, 3),
      innerStartAngle: expect.closeTo(-0.141, 3),
      innerEndAngle: expect.closeTo(0.141, 3),
    })
  })

  test('returns correct CustomArcArgs with large padding', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 100,
      innerRadius: 50,
      startAngle: 0,
      endAngle: Math.PI / 2,
      padding: 100,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 100,
      innerRadius: expect.closeTo(141.521, 2),
      outerStartAngle: expect.closeTo(0, 3),
      outerEndAngle: expect.closeTo(-1.571, 3),
      innerStartAngle: expect.closeTo(-0.786, 3),
      innerEndAngle: expect.closeTo(-0.785, 3),
    })
  })

  test('returns correct CustomArcArgs with zero outer radius', () => {
    const args: ParalelPaddedArcArgs = {
      outerRadius: 0,
      innerRadius: 50,
      startAngle: 0,
      endAngle: Math.PI / 2,
      padding: 10,
    }
    const result = adjustForParallelPadding(args)

    expect(result).toEqual({
      outerRadius: 0,
      innerRadius: 50,
      outerStartAngle: expect.any(Number),
      outerEndAngle: expect.any(Number),
      innerStartAngle: expect.closeTo(-1.369, 3),
      innerEndAngle: expect.closeTo(-0.201, 3),
    })
  })
})
