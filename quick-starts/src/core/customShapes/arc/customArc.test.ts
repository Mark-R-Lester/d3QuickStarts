import { customArc, CustomArcArgs } from './customArc'

describe('customArc testing', () => {
  test('creates a full ring arc with equal inner and outer angles', () => {
    const args: CustomArcArgs = {
      outerRadius: 100,
      innerRadius: 50,
      outerStartAngle: 0,
      outerEndAngle: Math.PI * 2,
      innerStartAngle: 0,
      innerEndAngle: Math.PI * 2,
    }
    const result = customArc(args)

    expect(result).toMatch(/^M100,-?[\d.e-]+/)
    expect(result).toMatch(/A100,100,0,1,1,100,-?[\d.e-]+/)
    expect(result).toMatch(/L50,-?[\d.e-]+/)
    expect(result).toMatch(
      /A50,50,0,1,0,-50,[\d.e-]+A50,50,0,1,0,50,-?[\d.e-]+/
    )
    expect(result).toMatch(/L100,-?[\d.e-]+Z/)
  })

  test('creates a quarter arc from 0 to π/2', () => {
    const args: CustomArcArgs = {
      outerRadius: 100,
      innerRadius: 50,
      outerStartAngle: 0,
      outerEndAngle: Math.PI / 2,
      innerStartAngle: 0,
      innerEndAngle: Math.PI / 2,
    }
    const result = customArc(args)

    expect(result).toMatch(/^M100,-?[\d.e-]+/)
    expect(result).toMatch(/A100,100,0,0,1,-?[\d.e-]+,100/)
    expect(result).toMatch(/L-?[\d.e-]+,50/)
    expect(result).toMatch(/A50,50,0,0,0,50,-?[\d.e-]+/)
    expect(result).toMatch(/L100,-?[\d.e-]+Z/)
  })

  test('creates arc with negative angles', () => {
    const args: CustomArcArgs = {
      outerRadius: 100,
      innerRadius: 50,
      outerStartAngle: -Math.PI / 2,
      outerEndAngle: 0,
      innerStartAngle: -Math.PI / 2,
      innerEndAngle: 0,
    }
    const result = customArc(args)

    expect(result).toMatch(/^M-?[\d.e-]+,-100/)
    expect(result).toMatch(/A100,100,0,0,1,100,-?[\d.e-]+/)
    expect(result).toMatch(/L50,-?[\d.e-]+/)
    expect(result).toMatch(/A50,50,0,0,0,-?[\d.e-]+,-50/)
    expect(result).toMatch(/L-?[\d.e-]+,-100Z/)
  })

  test('creates arc with zero inner radius', () => {
    const args: CustomArcArgs = {
      outerRadius: 100,
      innerRadius: 0,
      outerStartAngle: 0,
      outerEndAngle: Math.PI,
      innerStartAngle: 0,
      innerEndAngle: Math.PI,
    }
    const result = customArc(args)

    expect(result).toMatch(/^M100,-?[\d.e-]+/)
    expect(result).toMatch(/A100,100,0,1,1,-100,[\d.e-]+/)
    expect(result).toMatch(/L0,0/)
    expect(result).toMatch(/L100,-?[\d.e-]+Z/)
  })

  test('creates arc with small angle difference', () => {
    const args: CustomArcArgs = {
      outerRadius: 100,
      innerRadius: 50,
      outerStartAngle: 0,
      outerEndAngle: 0.1,
      innerStartAngle: 0,
      innerEndAngle: 0.1,
    }
    const result = customArc(args)

    expect(result).toMatch(/^M100,-?[\d.e-]+/)
    expect(result).toMatch(/A100,100,0,0,1/)
    expect(result).toMatch(/L/)
    expect(result).toMatch(/A50,50,0,0,0/)
    expect(result).toMatch(/Z/)
  })
})
