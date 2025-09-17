import { customRectangle, RectangleConfig } from './customRectangle'

describe('customRectangle', () => {
  // Base parameters for testing
  const baseParams: RectangleConfig = {
    height: 100,
    width: 200,
    x: 50,
    y: 75,
    topLeftCornerRadiusCx: 20,
    topRightCornerRadiusCx: 40,
    bottomLeftCornerRadiusCx: 10,
    bottomRightCornerRadiusCx: 30,
    topLeftCornerRadiusCy: 20,
    topRightCornerRadiusCy: 10,
    bottomLeftCornerRadiusCy: 10,
    bottomRightCornerRadiusCy: 30,
  }

  test('should create correct SVG path with standard parameters', () => {
    const result = customRectangle(baseParams)
    expect(result).toBe(
      'M70,75 L210,75 A40,10 0 0 1 250,85 L250,145 A30,30 0 0 1 220,175 L60,175 A10,10 0 0 1 50,165 L50,95 A20,20 0 0 1 70,75 Z'
    )
  })

  test('should handle all default corner radii (0)', () => {
    const params: RectangleConfig = {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      // All radii omitted, should default to 0
    }
    const result = customRectangle(params)
    expect(result).toBe(
      'M50,75 L250,75 A0,0 0 0 1 250,75 L250,175 A0,0 0 0 1 250,175 L50,175 A0,0 0 0 1 50,175 L50,75 A0,0 0 0 1 50,75 Z'
    )
  })

  test('should handle equal corner radii for circular corners', () => {
    const params: RectangleConfig = {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topLeftCornerRadiusCx: 20,
      topRightCornerRadiusCx: 20,
      bottomLeftCornerRadiusCx: 20,
      bottomRightCornerRadiusCx: 20,
      topLeftCornerRadiusCy: 20,
      topRightCornerRadiusCy: 20,
      bottomLeftCornerRadiusCy: 20,
      bottomRightCornerRadiusCy: 20,
    }
    const result = customRectangle(params)
    expect(result).toBe(
      'M70,75 L230,75 A20,20 0 0 1 250,95 L250,155 A20,20 0 0 1 230,175 L70,175 A20,20 0 0 1 50,155 L50,95 A20,20 0 0 1 70,75 Z'
    )
  })

  test('should handle lopsided top-right corner radii', () => {
    const params: RectangleConfig = {
      height: 100,
      width: 200,
      x: 50,
      y: 75,
      topRightCornerRadiusCx: 50,
      topRightCornerRadiusCy: 10,
      // Other radii omitted, should default to 0
    }
    const result = customRectangle(params)
    expect(result).toBe(
      'M50,75 L200,75 A50,10 0 0 1 250,85 L250,175 A0,0 0 0 1 250,175 L50,175 A0,0 0 0 1 50,175 L50,75 A0,0 0 0 1 50,75 Z'
    )
  })

  test('should handle minimal rectangle dimensions and default radii', () => {
    const params: RectangleConfig = {
      height: 0,
      width: 0,
      x: 50,
      y: 75,
      // All radii omitted, should default to 0
    }
    const result = customRectangle(params)
    expect(result).toBe(
      'M50,75 L50,75 A0,0 0 0 1 50,75 L50,75 A0,0 0 0 1 50,75 L50,75 A0,0 0 0 1 50,75 L50,75 A0,0 0 0 1 50,75 Z'
    )
  })

  test('should handle different x and y positions', () => {
    const params: RectangleConfig = {
      height: 100,
      width: 200,
      x: 10,
      y: 20,
      topLeftCornerRadiusCx: 20,
      topRightCornerRadiusCx: 40,
      bottomLeftCornerRadiusCx: 10,
      bottomRightCornerRadiusCx: 30,
      topLeftCornerRadiusCy: 20,
      topRightCornerRadiusCy: 10,
      bottomLeftCornerRadiusCy: 10,
      bottomRightCornerRadiusCy: 30,
    }
    const result = customRectangle(params)
    expect(result).toBe(
      'M30,20 L170,20 A40,10 0 0 1 210,30 L210,90 A30,30 0 0 1 180,120 L20,120 A10,10 0 0 1 10,110 L10,40 A20,20 0 0 1 30,20 Z'
    )
  })
})
