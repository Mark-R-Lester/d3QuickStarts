import { ScaleSequential, ScaleOrdinal } from 'd3'
import { GlobalDefaults } from '../../core/enums'
import { QsColorName, QsColorScale } from '../../d3QuickStart'
import { QsBarArgs as QsBarData } from './types'

export interface ScaledColorArgs {
  data: QsBarData
  color: QsColorName | QsColorScale
  sequentialColorScale?: ScaleSequential<string, never>
  oridinalColorScale?: ScaleOrdinal<string, unknown, never>
}

export const getScaledColor = (args: ScaledColorArgs): string => {
  const { data, color, sequentialColorScale, oridinalColorScale } = args

  if (data.color) return data.color

  if (color.colorName)
    return typeof color.colorName === 'string'
      ? color.colorName
      : GlobalDefaults.DEFAULT_BAR_COLOR

  let scaledColor: string | unknown
  if (sequentialColorScale)
    scaledColor = sequentialColorScale(data.upperBoundry)
  if (oridinalColorScale)
    scaledColor = oridinalColorScale(data.upperBoundry.toString())

  return typeof scaledColor === 'string'
    ? scaledColor
    : GlobalDefaults.DEFAULT_BAR_COLOR
}
