import {
  setCanvasConfig,
  setLegendConfig,
  setLinearAreaConfig,
  setLinearAxisConfigTop,
  setLinearAxisConfigBottom,
  setLinearAxisConfigLeft,
  setLinearAxisConfigRight,
  setLinearBarConfig,
  setLinearBarGroupConfig,
  setLinearBarStackConfig,
  setLinearLineConfig,
  setLinearPointsConfig,
  setLinearTextConfig,
  setPlottedLineConfig,
  setPlottedPointsConfig,
  setPlottedTextConfig,
  setRadialArcConfig,
  setRadialArcTextConfigRotated,
  setRadialArcTextConfigHorizontal,
  setRadialArcTextConfigSpoke,
  setRadialArcTextConfigFollow,
  setRadialCentroidAreaConfig,
  setRadialCentroidAxisConfig,
  setRadialCentroidLineConfig,
  setRadialCentroidPointsConfig,
  setRadialCentroidSpokesConfig,
} from '../core/config/configOverrides'
import { QsLegendConfig } from '../legend/qsTypes'
import { QsAreaConfig } from '../linear/linearArea/qsTypes'
import { QsAxisConfig } from '../linear/linearAxis/qsTypes'
import { QsBarConfig } from '../linear/linearBar/qsTypes'
import { QsBarGroupConfig } from '../linear/linearBarGroup/qsTypes'
import { QsBarStackedConfig } from '../linear/linearBarStack/qsTypes'
import { QsLineConfig } from '../linear/linearLine/qsTypes'
import { QsPointsConfig } from '../linear/linearPoints/qsTypes'
import { QsTextConfig } from '../linear/linearText/qsTypes'
import { QsPlottedLineConfig } from '../plots/plottedLine/qsTypes'
import { QsPlottedPointsConfig } from '../plots/plottedPoints/qsTypes'
import { QsPlottedTextConfig } from '../plots/plottedText/qsTypes'
import { QsRadialConfig } from '../radialArc/radialArc/qsTypes'
import { QsRadialTextConfig } from '../radialArc/radialArcText/qsTypes'
import { QsRadialAreaConfig } from '../radialCentroid/radialCentroidArea/qsTypes'
import { QsRadialAxisConfig } from '../radialCentroid/radialCentroidAxis/qsTypes'
import { QsRadialLineConfig } from '../radialCentroid/radialCentroidLine/qsTypes'
import { QsRadialPointsConfig } from '../radialCentroid/radialCentroidPoints/qsTypes'
import { QsRadialSpokesConfig } from '../radialCentroid/radialCentroidSpokes/qsTypes'
import { QsCanvasConfig } from './qsTypes'

interface CanvasConfigSetters {
  canvasConfig: (value: QsCanvasConfig) => void
}

interface LegendConfigSetters {
  legendConfig: (value: QsLegendConfig) => void
}

interface LinearConfigSetters {
  areaConfig: (value: QsAreaConfig) => void
  axisConfigTop: (value: QsAxisConfig) => void
  axisConfigBottom: (value: QsAxisConfig) => void
  axisConfigLeft: (value: QsAxisConfig) => void
  axisConfigRight: (value: QsAxisConfig) => void
  barConfig: (value: QsBarConfig) => void
  barGroupConfig: (value: QsBarGroupConfig) => void
  barStackConfig: (value: QsBarStackedConfig) => void
  lineConfig: (value: QsLineConfig) => void
  pointsConfig: (value: QsPointsConfig) => void
  textConfig: (value: QsTextConfig) => void
}

interface PlottedConfigSetters {
  lineConfig: (value: QsPlottedLineConfig) => void
  pointsConfig: (value: QsPlottedPointsConfig) => void
  textConfig: (value: QsPlottedTextConfig) => void
}

interface RadialArcConfigSetters {
  arcConfig: (value: QsRadialConfig) => void
  textConfigRotated: (value: QsRadialTextConfig) => void
  textConfigHorizontal: (value: QsRadialTextConfig) => void
  textConfigSpoke: (value: QsRadialTextConfig) => void
  textConfigFollow: (value: QsRadialTextConfig) => void
}

interface RadialCentroidConfigSetters {
  areaConfig: (value: QsRadialAreaConfig) => void
  axisConfig: (value: QsRadialAxisConfig) => void
  lineConfig: (value: QsRadialLineConfig) => void
  pointsConfig: (value: QsRadialPointsConfig) => void
  spokesConfig: (value: QsRadialSpokesConfig) => void
}

export interface ConfigSetters {
  canvas: CanvasConfigSetters
  legend: LegendConfigSetters
  linear: LinearConfigSetters
  plotted: PlottedConfigSetters
  radialArc: RadialArcConfigSetters
  radialCentroid: RadialCentroidConfigSetters
}

export const getConfigOverrides = (): ConfigSetters => {
  return {
    canvas: {
      canvasConfig: setCanvasConfig,
    },
    legend: {
      legendConfig: setLegendConfig,
    },
    linear: {
      areaConfig: setLinearAreaConfig,
      axisConfigTop: setLinearAxisConfigTop,
      axisConfigBottom: setLinearAxisConfigBottom,
      axisConfigLeft: setLinearAxisConfigLeft,
      axisConfigRight: setLinearAxisConfigRight,
      barConfig: setLinearBarConfig,
      barGroupConfig: setLinearBarGroupConfig,
      barStackConfig: setLinearBarStackConfig,
      lineConfig: setLinearLineConfig,
      pointsConfig: setLinearPointsConfig,
      textConfig: setLinearTextConfig,
    },
    plotted: {
      lineConfig: setPlottedLineConfig,
      pointsConfig: setPlottedPointsConfig,
      textConfig: setPlottedTextConfig,
    },
    radialArc: {
      arcConfig: setRadialArcConfig,
      textConfigRotated: setRadialArcTextConfigRotated,
      textConfigHorizontal: setRadialArcTextConfigHorizontal,
      textConfigSpoke: setRadialArcTextConfigSpoke,
      textConfigFollow: setRadialArcTextConfigFollow,
    },
    radialCentroid: {
      areaConfig: setRadialCentroidAreaConfig,
      axisConfig: setRadialCentroidAxisConfig,
      lineConfig: setRadialCentroidLineConfig,
      pointsConfig: setRadialCentroidPointsConfig,
      spokesConfig: setRadialCentroidSpokesConfig,
    },
  }
}
