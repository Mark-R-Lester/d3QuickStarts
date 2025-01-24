import {
  ScaleSequential,
  ScaleOrdinal,
  interpolateRgbBasis,
  scaleOrdinal,
  scaleSequential,
} from 'd3'
import { GlobalDefaultColors } from '../enums/enums'
import { QsEnumColorScale } from '../enums/qsEnums'
import { toStrings } from '../conversion'
import { QsColorScaleData } from '../types/qsTypes'

export const getPrecidendedColor = (
  color?: string,
  defaultColor?: string,
  scaledColor?: string | unknown
): string => {
  if (color) return color
  if (typeof scaledColor === 'string') return scaledColor
  return defaultColor === undefined
    ? GlobalDefaultColors.FILL_COLOR
    : defaultColor
}

export const applyDefaultColorIfNeeded = (colors: {
  color?: string
  newColor?: string
}): string => {
  const { color, newColor } = colors
  if (newColor) return newColor
  return color === undefined ? GlobalDefaultColors.FILL_COLOR : color
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
    return scaleSequential(domain, interpolateRgbBasis(range))
  }

  const createOridinalColorScale = ():
    | ScaleOrdinal<string, unknown, never>
    | undefined => {
    return scaleOrdinal().domain(toStrings(domain)).range(range)
  }

  return type === QsEnumColorScale.SEQUENTIAL
    ? createSequentialColorScale()
    : createOridinalColorScale()
}
