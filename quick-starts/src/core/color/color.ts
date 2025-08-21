import {
  ScaleSequential,
  ScaleOrdinal,
  interpolateRgbBasis,
  scaleOrdinal,
  scaleSequential,
} from 'd3'
import { GlobalDefaultColors } from '../enums/enums'
import { QsEnumColorScale } from '../enums/qsEnums'
import { QsColorScaleData } from '../types/qsTypes'
import { QsOrdinalScaleData } from '../types/qsTypes'

export const getPrecidendedColor = (
  color?: string,
  defaultColor?: string,
  scaledColor?: string | unknown
): string => {
  if (color) return color
  if (typeof scaledColor === 'string') return scaledColor
  return defaultColor ?? GlobalDefaultColors.FILL_COLOR
}

/*
 * The colorScale arg is of type any because the tryping on top of d3 is not correct in this insrtance
 * The typing as it stands would mke this method impossible to implement due to incompatible types
 * In reality the scales are interchangable
 */
export const getScaledColor = (
  value: number,
  colorScale?: any
): string | unknown | undefined => {
  if (colorScale) return colorScale(value)
}

export const findOrdinalValue = (
  index: number,
  data: QsOrdinalScaleData
): number => {
  return (index % data.range.length) + 1
}

export const getColorScale = (
  colorScaleData: QsColorScaleData
):
  | ScaleSequential<string, never>
  | ScaleOrdinal<string, unknown, never>
  | undefined => {
  const { domain, range, type } = colorScaleData

  const createSequentialColorScale = ():
    | ScaleSequential<string, never>
    | undefined => {
    if (domain) return scaleSequential(domain, interpolateRgbBasis(range))
    else
      console.error(
        'Domain was not supplied for colorScale QsEnumColorScale.SEQUENTIAL'
      )
  }

  const createOridinalColorScale = ():
    | ScaleOrdinal<string, unknown, never>
    | undefined => {
    return scaleOrdinal().domain(range).range(range)
  }

  return type === QsEnumColorScale.SEQUENTIAL
    ? createSequentialColorScale()
    : createOridinalColorScale()
}
