import {
  ScaleSequential,
  scaleSequential,
  interpolateRgbBasis,
  ScaleOrdinal,
  scaleOrdinal,
} from 'd3'
import { toStrings } from '../../core/conversion'
import { GlobalDefaults } from '../../core/enums/enums'
import { getPrecidendedColor, getScaledColor } from './color'

describe('color functions', () => {
  describe('getPrecidendedColor', () => {
    test.each`
      color        | defaultColor | scaledColor  | expectedColor
      ${undefined} | ${undefined} | ${undefined} | ${GlobalDefaults.DEFAULT_BAR_COLOR}
      ${undefined} | ${'blue'}    | ${'green'}   | ${'green'}
      ${'red'}     | ${undefined} | ${'green'}   | ${'red'}
      ${'red'}     | ${'blue'}    | ${undefined} | ${'red'}
      ${'red'}     | ${undefined} | ${undefined} | ${'red'}
      ${undefined} | ${undefined} | ${'green'}   | ${'green'}
      ${undefined} | ${'blue'}    | ${undefined} | ${'blue'}
    `(
      'When the bar color is $color, the defaultColor is $defaultColor and scaled color is $scaledColor the result should be $expectedColor',
      ({ color, defaultColor, scaledColor, expectedColor }) => {
        expect(getPrecidendedColor(color, defaultColor, scaledColor)).toEqual(
          expectedColor
        )
      }
    )
  })

  describe('getScaledColor', () => {
    const domain: number[] = [1, 100]
    const range: string[] = ['red', 'green', 'blue']
    const sequentialColorScale: ScaleSequential<string, never> | undefined =
      scaleSequential(domain, interpolateRgbBasis(range))
    const ordinalColorScale: ScaleOrdinal<string, unknown, never> | undefined =
      scaleOrdinal().domain(toStrings(domain)).range(range)
    test.each`
      value | colorScale              | scaleType       | expectedColor
      ${1}  | ${ordinalColorScale}    | ${'ordinal'}    | ${'blue'}
      ${2}  | ${ordinalColorScale}    | ${'ordinal'}    | ${'red'}
      ${3}  | ${ordinalColorScale}    | ${'ordinal'}    | ${'green'}
      ${4}  | ${ordinalColorScale}    | ${'ordinal'}    | ${'blue'}
      ${5}  | ${ordinalColorScale}    | ${'ordinal'}    | ${'red'}
      ${6}  | ${ordinalColorScale}    | ${'ordinal'}    | ${'green'}
      ${10} | ${sequentialColorScale} | ${'sequential'} | ${'rgb(209, 23, 0)'}
      ${20} | ${sequentialColorScale} | ${'sequential'} | ${'rgb(160, 47, 2)'}
      ${30} | ${sequentialColorScale} | ${'sequential'} | ${'rgb(114, 66, 9)'}
      ${40} | ${sequentialColorScale} | ${'sequential'} | ${'rgb(75, 80, 21)'}
      ${50} | ${sequentialColorScale} | ${'sequential'} | ${'rgb(44, 85, 41)'}
      ${60} | ${sequentialColorScale} | ${'sequential'} | ${'rgb(22, 81, 71)'}
    `(
      'When the value is $value, the scale is $scaleType and scaled color is $scaledColor the result should be $expectedColor',
      ({ value, colorScale, expectedColor }) => {
        expect(getScaledColor(value, colorScale)).toEqual(expectedColor)
      }
    )
  })
})
