import {
  ScaleSequential,
  scaleSequential,
  interpolateRgbBasis,
  ScaleOrdinal,
  scaleOrdinal,
} from 'd3'
import { toStrings } from '../../core/conversion'
import { getPrecidendedColor, getScaledColor } from './getColor'
import { GlobalDefaults } from '../../core/enums'

describe('color functions', () => {
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
    'When the bar color is $color, the defaultColor is $defaultColor and scaled color is $ scaledColor the result should be $expectedColor',
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
    value | oridinalScale        | scaleType       | sequentialScale         | expectedColor
    ${1}  | ${ordinalColorScale} | ${'ordinal'}    | ${undefined}            | ${'blue'}
    ${2}  | ${ordinalColorScale} | ${'ordinal'}    | ${undefined}            | ${'red'}
    ${3}  | ${ordinalColorScale} | ${'ordinal'}    | ${undefined}            | ${'green'}
    ${4}  | ${ordinalColorScale} | ${'ordinal'}    | ${undefined}            | ${'blue'}
    ${5}  | ${ordinalColorScale} | ${'ordinal'}    | ${undefined}            | ${'red'}
    ${6}  | ${ordinalColorScale} | ${'ordinal'}    | ${undefined}            | ${'green'}
    ${10} | ${undefined}         | ${'sequential'} | ${sequentialColorScale} | ${'rgb(209, 23, 0)'}
    ${20} | ${undefined}         | ${'sequential'} | ${sequentialColorScale} | ${'rgb(160, 47, 2)'}
    ${30} | ${undefined}         | ${'sequential'} | ${sequentialColorScale} | ${'rgb(114, 66, 9)'}
    ${40} | ${undefined}         | ${'sequential'} | ${sequentialColorScale} | ${'rgb(75, 80, 21)'}
    ${50} | ${undefined}         | ${'sequential'} | ${sequentialColorScale} | ${'rgb(44, 85, 41)'}
    ${60} | ${undefined}         | ${'sequential'} | ${sequentialColorScale} | ${'rgb(22, 81, 71)'}
  `(
    'When the value is $value, the scale is $scaleType and scaled color is $ scaledColor the result should be $expectedColor',
    ({ value, sequentialScale, oridinalScale, expectedColor }) => {
      expect(getScaledColor(value, sequentialScale, oridinalScale)).toEqual(
        expectedColor
      )
    }
  )
})
