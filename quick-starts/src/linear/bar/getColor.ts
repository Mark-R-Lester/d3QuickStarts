import { ScaleSequential, ScaleOrdinal } from 'd3'
import { GlobalDefaults } from '../../core/enums/enums'

export const getPrecidendedColor = (
  color?: string,
  defaultColor?: string,
  scaledColor?: string | unknown
): string => {
  if (color) return color
  if (typeof scaledColor === 'string') return scaledColor
  return defaultColor === undefined
    ? GlobalDefaults.DEFAULT_BAR_COLOR
    : defaultColor
}

export const getScaledColor = (
  value: number,
  sequentialColorScale?: ScaleSequential<string, never>,
  ordinalColorScale?: ScaleOrdinal<number, unknown, never>
): string | unknown | undefined => {
  let scaledColor: string | unknown

  if (sequentialColorScale) return (scaledColor = sequentialColorScale(value))
  else if (ordinalColorScale) return (scaledColor = ordinalColorScale(value))
}
