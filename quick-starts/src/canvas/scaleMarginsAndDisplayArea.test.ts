import { scaleMarginsAndDisplayArea } from './scaleMarginsAndDisplayArea'
import { CanvasConfig } from './types'

describe('scaleMarginsAndDisplayArea', () => {
  const defaultConfig: CanvasConfig = {
    ry: 0,
    rx: 0,
    chartName: 'myChart',
    width: 100,
    height: 100,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    highestViewableValue: 100,
    lowestViewableValue: 0,
    borderColor: 'lightgrey',
    displayAreaHeight: 100,
    displayAreaWidth: 100,
    fillColor: 'none',
    borderWidth: 2,
    highestViewableValueY: 100,
    lowestViewableValueY: 0,
    highestViewableValueX: 100,
    lowestViewableValueX: 0,
  }

  test.each`
    width   | height | marginRight | marginLeft | marginTop | marginBottom | expectedMarginRight | expectedMarginLeft | expectedMarginTop | expectedMarginBottom | expectedDisplayAreaWidth | expectedDisplayAreaHeight
    ${100}  | ${100} | ${0}        | ${0}       | ${0}      | ${0}         | ${0}                | ${0}               | ${0}              | ${0}                 | ${100}                   | ${100}
    ${100}  | ${100} | ${10}       | ${10}      | ${20}     | ${20}        | ${10}               | ${10}              | ${20}             | ${20}                | ${80}                    | ${60}
    ${1000} | ${500} | ${5}        | ${5}       | ${10}     | ${10}        | ${50}               | ${50}              | ${50}             | ${50}                | ${900}                   | ${400}
    ${100}  | ${100} | ${15}       | ${5}       | ${10}     | ${30}        | ${15}               | ${5}               | ${10}             | ${30}                | ${80}                    | ${60}
  `(
    'should correctly calculate margins and display area when width is $width, height is $height, margins are $marginRight, $marginLeft, $marginTop, $marginBottom',
    ({
      width,
      height,
      marginRight,
      marginLeft,
      marginTop,
      marginBottom,
      expectedMarginRight,
      expectedMarginLeft,
      expectedMarginTop,
      expectedMarginBottom,
      expectedDisplayAreaWidth,
      expectedDisplayAreaHeight,
    }) => {
      const config: CanvasConfig = {
        ...defaultConfig,
        width,
        height,
        marginRight,
        marginLeft,
        marginTop,
        marginBottom,
      }

      const result = scaleMarginsAndDisplayArea(config)

      expect(result.marginRight).toEqual(expectedMarginRight)
      expect(result.marginLeft).toEqual(expectedMarginLeft)
      expect(result.marginTop).toEqual(expectedMarginTop)
      expect(result.marginBottom).toEqual(expectedMarginBottom)
      expect(result.displayAreaWidth).toEqual(expectedDisplayAreaWidth)
      expect(result.displayAreaHeight).toEqual(expectedDisplayAreaHeight)
    }
  )

  test('should preserve all original config properties', () => {
    const config = { ...defaultConfig }
    const result = scaleMarginsAndDisplayArea(config)

    expect(result.chartName).toBe('myChart')
    expect(result.ry).toBe(0)
    expect(result.rx).toBe(0)
    expect(result.highestViewableValue).toBe(100)
    expect(result.lowestViewableValue).toBe(0)
    expect(result.borderColor).toBe('lightgrey')
    expect(result.fillColor).toBe('none')
    expect(result.borderWidth).toBe(2)
    expect(result.highestViewableValueY).toBe(100)
    expect(result.lowestViewableValueY).toBe(0)
    expect(result.highestViewableValueX).toBe(100)
    expect(result.lowestViewableValueX).toBe(0)
  })
})
