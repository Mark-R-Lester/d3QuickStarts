import { QsCanvasConfig } from '../../canvas/qsTypes'
import { QsLegendConfig } from '../../legend/qsTypes'
import { QsAreaConfig } from '../../linear/linearArea/qsTypes'
import { QsAxisConfig } from '../../linear/linearAxis/qsTypes'
import { QsBarConfig } from '../../linear/linearBar/qsTypes'
import { QsBarGroupConfig } from '../../linear/linearBarGroup/qsTypes'
import { QsBarStackedConfig } from '../../linear/linearBarStack/qsTypes'
import { QsLineConfig } from '../../linear/linearLine/qsTypes'
import { QsPointsConfig } from '../../linear/linearPoints/qsTypes'
import { QsTextConfig } from '../../linear/linearText/qsTypes'
import { QsPlottedLineConfig } from '../../plots/plottedLine/qsTypes'
import { QsPlottedPointsConfig } from '../../plots/plottedPoints/qsTypes'
import { QsPlottedTextConfig } from '../../plots/plottedText/qsTypes'
import { QsRadialConfig } from '../../radialArc/radialArc/qsTypes'
import { QsRadialTextConfig } from '../../radialArc/radialArcText/qsTypes'
import { QsRadialAreaConfig } from '../../radialCentroid/radialCentroidArea/qsTypes'
import { QsRadialAxisConfig } from '../../radialCentroid/radialCentroidAxis/qsTypes'
import { QsRadialLineConfig } from '../../radialCentroid/radialCentroidLine/qsTypes'
import { QsRadialPointsConfig } from '../../radialCentroid/radialCentroidPoints/qsTypes'
import { QsRadialSpokesConfig } from '../../radialCentroid/radialCentroidSpokes/qsTypes'

interface ConfigStore {
  canvasConfig: QsCanvasConfig | undefined
  legendConfig: QsLegendConfig | undefined
  linearAreaConfig: QsAreaConfig | undefined
  linearAxisConfigTop: QsAxisConfig | undefined
  linearAxisConfigBottom: QsAxisConfig | undefined
  linearAxisConfigLeft: QsAxisConfig | undefined
  linearAxisConfigRight: QsAxisConfig | undefined
  linearBarConfig: QsBarConfig | undefined
  linearBarGroupConfig: QsBarGroupConfig | undefined
  linearBarStackConfig: QsBarStackedConfig | undefined
  linearLineConfig: QsLineConfig | undefined
  linearPointsConfig: QsPointsConfig | undefined
  linearTextConfig: QsTextConfig | undefined
  plottedLineConfig: QsPlottedLineConfig | undefined
  plottedPointsConfig: QsPlottedPointsConfig | undefined
  plottedTextConfig: QsPlottedTextConfig | undefined
  radialArcConfig: QsRadialConfig | undefined
  radialArcTextConfigRotated: QsRadialTextConfig | undefined
  radialArcTextConfigHorizontal: QsRadialTextConfig | undefined
  radialArcTextConfigSpoke: QsRadialTextConfig | undefined
  radialArcTextConfigFollow: QsRadialTextConfig | undefined
  radialCentroidAreaConfig: QsRadialAreaConfig | undefined
  radialCentroidAxisConfig: QsRadialAxisConfig | undefined
  radialCentroidLineConfig: QsRadialLineConfig | undefined
  radialCentroidPointsConfig: QsRadialPointsConfig | undefined
  radialCentroidSpokesConfig: QsRadialSpokesConfig | undefined
}

const config: ConfigStore = {
  canvasConfig: undefined,
  legendConfig: undefined,
  linearAreaConfig: undefined,
  linearAxisConfigTop: undefined,
  linearAxisConfigBottom: undefined,
  linearAxisConfigLeft: undefined,
  linearAxisConfigRight: undefined,
  linearBarConfig: undefined,
  linearBarGroupConfig: undefined,
  linearBarStackConfig: undefined,
  linearLineConfig: undefined,
  linearPointsConfig: undefined,
  linearTextConfig: undefined,
  plottedLineConfig: undefined,
  plottedPointsConfig: undefined,
  plottedTextConfig: undefined,
  radialArcConfig: undefined,
  radialArcTextConfigRotated: undefined,
  radialArcTextConfigHorizontal: undefined,
  radialArcTextConfigSpoke: undefined,
  radialArcTextConfigFollow: undefined,
  radialCentroidAreaConfig: undefined,
  radialCentroidAxisConfig: undefined,
  radialCentroidLineConfig: undefined,
  radialCentroidPointsConfig: undefined,
  radialCentroidSpokesConfig: undefined,
}

export const getCanvasConfig = () => {
  return config.canvasConfig
}

export const setCanvasConfig = (value: QsCanvasConfig) => {
  config.canvasConfig = value
}

export const getLegendConfig = () => {
  return config.legendConfig
}

export const setLegendConfig = (value: QsLegendConfig) => {
  config.legendConfig = value
}

export const getLinearAreaConfig = () => {
  return config.linearAreaConfig
}

export const setLinearAreaConfig = (value: QsAreaConfig) => {
  config.linearAreaConfig = value
}

export const getLinearAxisConfigTop = () => {
  return config.linearAxisConfigTop
}

export const setLinearAxisConfigTop = (value: QsAxisConfig) => {
  config.linearAxisConfigTop = value
}

export const getLinearAxisConfigBottom = () => {
  return config.linearAxisConfigBottom
}

export const setLinearAxisConfigBottom = (value: QsAxisConfig) => {
  config.linearAxisConfigBottom = value
}

export const getLinearAxisConfigLeft = () => {
  return config.linearAxisConfigLeft
}

export const setLinearAxisConfigLeft = (value: QsAxisConfig) => {
  config.linearAxisConfigLeft = value
}

export const getLinearAxisConfigRight = () => {
  return config.linearAxisConfigRight
}

export const setLinearAxisConfigRight = (value: QsAxisConfig) => {
  config.linearAxisConfigRight = value
}

export const getLinearBarConfig = () => {
  return config.linearBarConfig
}

export const setLinearBarConfig = (value: QsBarConfig) => {
  config.linearBarConfig = value
}

export const getLinearBarGroupConfig = () => {
  return config.linearBarGroupConfig
}

export const setLinearBarGroupConfig = (value: QsBarGroupConfig) => {
  config.linearBarGroupConfig = value
}

export const getLinearBarStackConfig = () => {
  return config.linearBarStackConfig
}

export const setLinearBarStackConfig = (value: QsBarStackedConfig) => {
  config.linearBarStackConfig = value
}

export const getLinearLineConfig = () => {
  return config.linearLineConfig
}

export const setLinearLineConfig = (value: QsLineConfig) => {
  config.linearLineConfig = value
}

export const getLinearPointsConfig = () => {
  return config.linearPointsConfig
}

export const setLinearPointsConfig = (value: QsPointsConfig) => {
  config.linearPointsConfig = value
}

export const getLinearTextConfig = () => {
  return config.linearTextConfig
}

export const setLinearTextConfig = (value: QsTextConfig) => {
  config.linearTextConfig = value
}

export const getPlottedLineConfig = () => {
  return config.plottedLineConfig
}

export const setPlottedLineConfig = (value: QsPlottedLineConfig) => {
  config.plottedLineConfig = value
}

export const getPlottedPointsConfig = () => {
  return config.plottedPointsConfig
}

export const setPlottedPointsConfig = (value: QsPlottedPointsConfig) => {
  config.plottedPointsConfig = value
}

export const getPlottedTextConfig = () => {
  return config.plottedTextConfig
}

export const setPlottedTextConfig = (value: QsPlottedTextConfig) => {
  config.plottedTextConfig = value
}

export const getRadialArcConfig = () => {
  return config.radialArcConfig
}

export const setRadialArcConfig = (value: QsRadialConfig) => {
  config.radialArcConfig = value
}

export const getRadialArcTextConfigRotated = () => {
  return config.radialArcTextConfigRotated
}

export const setRadialArcTextConfigRotated = (value: QsRadialTextConfig) => {
  config.radialArcTextConfigRotated = value
}

export const getRadialArcTextConfigHorizontal = () => {
  return config.radialArcTextConfigHorizontal
}

export const setRadialArcTextConfigHorizontal = (value: QsRadialTextConfig) => {
  config.radialArcTextConfigHorizontal = value
}

export const getRadialArcTextConfigSpoke = () => {
  return config.radialArcTextConfigSpoke
}

export const setRadialArcTextConfigSpoke = (value: QsRadialTextConfig) => {
  config.radialArcTextConfigSpoke = value
}

export const getRadialArcTextConfigFollow = () => {
  return config.radialArcTextConfigFollow
}

export const setRadialArcTextConfigFollow = (value: QsRadialTextConfig) => {
  config.radialArcTextConfigFollow = value
}

export const getRadialCentroidAreaConfig = () => {
  return config.radialCentroidAreaConfig
}

export const setRadialCentroidAreaConfig = (value: QsRadialAreaConfig) => {
  config.radialCentroidAreaConfig = value
}

export const getRadialCentroidAxisConfig = () => {
  return config.radialCentroidAxisConfig
}

export const setRadialCentroidAxisConfig = (value: QsRadialAxisConfig) => {
  config.radialCentroidAxisConfig = value
}

export const getRadialCentroidLineConfig = () => {
  return config.radialCentroidLineConfig
}

export const setRadialCentroidLineConfig = (value: QsRadialLineConfig) => {
  config.radialCentroidLineConfig = value
}

export const getRadialCentroidPointsConfig = () => {
  return config.radialCentroidPointsConfig
}

export const setRadialCentroidPointsConfig = (value: QsRadialPointsConfig) => {
  config.radialCentroidPointsConfig = value
}

export const getRadialCentroidSpokesConfig = () => {
  return config.radialCentroidSpokesConfig
}

export const setRadialCentroidSpokesConfig = (value: QsRadialSpokesConfig) => {
  config.radialCentroidSpokesConfig = value
}
