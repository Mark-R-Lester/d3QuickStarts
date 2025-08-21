import {
  ScaleSequential,
  scaleSequential,
  interpolateRgbBasis,
  ScaleOrdinal,
  scaleOrdinal,
} from 'd3'
import { toStrings } from '../math/conversion'
import { GlobalDefaultColors } from '../../core/enums/enums'
import { findOrdinalValue, getPrecidendedColor, getScaledColor } from './color'
import { QsOrdinalScaleData } from '../types/qsTypes'
import { QsEnumColorScale } from '../enums/qsEnums'

describe('color functions', () => {
  describe('getPrecidendedColor', () => {
    test.each`
      color        | defaultColor | scaledColor  | expectedColor
      ${undefined} | ${undefined} | ${undefined} | ${GlobalDefaultColors.FILL_COLOR}
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

  describe('findOrdinalValue', () => {
    test.each`
      index | rangeLength | range                       | expected | description
      ${0}  | ${3}        | ${['red', 'blue', 'green']} | ${1}     | ${'index 0 with range length 3 returns 1'}
      ${1}  | ${3}        | ${['red', 'blue', 'green']} | ${2}     | ${'index 1 with range length 3 returns 2'}
      ${2}  | ${3}        | ${['red', 'blue', 'green']} | ${3}     | ${'index 2 with range length 3 returns 3'}
      ${3}  | ${3}        | ${['red', 'blue', 'green']} | ${1}     | ${'index 3 with range length 3 returns 1 (cycles)'}
      ${4}  | ${3}        | ${['red', 'blue', 'green']} | ${2}     | ${'index 4 with range length 3 returns 2 (cycles)'}
      ${0}  | ${1}        | ${['red']}                  | ${1}     | ${'index 0 with range length 1 returns 1'}
      ${1}  | ${1}        | ${['red']}                  | ${1}     | ${'index 1 with range length 1 returns 1'}
      ${0}  | ${2}        | ${['red', 'blue']}          | ${1}     | ${'index 0 with range length 2 returns 1'}
      ${1}  | ${2}        | ${['red', 'blue']}          | ${2}     | ${'index 1 with range length 2 returns 2'}
      ${2}  | ${2}        | ${['red', 'blue']}          | ${1}     | ${'index 2 with range length 2 returns 1 (cycles)'}
      ${0}  | ${0}        | ${[]}                       | ${NaN}   | ${'index 0 with empty range returns NaN'}
      ${1}  | ${0}        | ${[]}                       | ${NaN}   | ${'index 1 with empty range returns NaN'}
    `(
      'When index is $index and range is $description, the result should be $expected',
      ({ index, range, expected }) => {
        const data: QsOrdinalScaleData = {
          type: QsEnumColorScale.ORDINAL,
          range,
        }
        expect(findOrdinalValue(index, data)).toEqual(expected)
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
