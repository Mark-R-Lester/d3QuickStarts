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
  legendConfig?: QsLegendConfig
  linearAreaConfig?: QsAreaConfig
  linearAxisConfigTop?: QsAxisConfig
  linearAxisConfigBottom?: QsAxisConfig
  linearAxisConfigLeft?: QsAxisConfig
  linearAxisConfigRight?: QsAxisConfig
  linearBarConfig?: QsBarConfig
  linearBarGroupConfig?: QsBarGroupConfig
  linearBarStackConfig?: QsBarStackedConfig
  linearLineConfig?: QsLineConfig
  linearPointsConfig?: QsPointsConfig
  linearTextConfig?: QsTextConfig
  plottedLineConfig?: QsPlottedLineConfig
  plottedPointsConfig?: QsPlottedPointsConfig
  plottedTextConfig?: QsPlottedTextConfig
  radialArcConfig?: QsRadialConfig
  radialArcTextConfigRotated?: QsRadialTextConfig
  radialArcTextConfigHorizontal?: QsRadialTextConfig
  radialArcTextConfigSpoke?: QsRadialTextConfig
  radialArcTextConfigFollow?: QsRadialTextConfig
  radialCentroidAreaConfig?: QsRadialAreaConfig
  radialCentroidAxisConfig?: QsRadialAxisConfig
  radialCentroidLineConfig?: QsRadialLineConfig
  radialCentroidPointsConfig?: QsRadialPointsConfig
  radialCentroidSpokesConfig?: QsRadialSpokesConfig
}

export interface ConfigGetters {
  legend: {
    legendConfig: () => QsLegendConfig | undefined
  }
  linear: {
    areaConfig: () => QsAreaConfig | undefined
    axisConfigTop: () => QsAxisConfig | undefined
    axisConfigBottom: () => QsAxisConfig | undefined
    axisConfigLeft: () => QsAxisConfig | undefined
    axisConfigRight: () => QsAxisConfig | undefined
    barConfig: () => QsBarConfig | undefined
    barGroupConfig: () => QsBarGroupConfig | undefined
    barStackConfig: () => QsBarStackedConfig | undefined
    lineConfig: () => QsLineConfig | undefined
    pointsConfig: () => QsPointsConfig | undefined
    textConfig: () => QsTextConfig | undefined
  }
  plotted: {
    lineConfig: () => QsPlottedLineConfig | undefined
    pointsConfig: () => QsPlottedPointsConfig | undefined
    textConfig: () => QsPlottedTextConfig | undefined
  }
  radialArc: {
    arcConfig: () => QsRadialConfig | undefined
    textConfigRotated: () => QsRadialTextConfig | undefined
    textConfigHorizontal: () => QsRadialTextConfig | undefined
    textConfigSpoke: () => QsRadialTextConfig | undefined
    textConfigFollow: () => QsRadialTextConfig | undefined
  }
  radialCentroid: {
    areaConfig: () => QsRadialAreaConfig | undefined
    axisConfig: () => QsRadialAxisConfig | undefined
    lineConfig: () => QsRadialLineConfig | undefined
    pointsConfig: () => QsRadialPointsConfig | undefined
    spokesConfig: () => QsRadialSpokesConfig | undefined
  }
}

export interface ConfigSetters {
  legend: {
    legendConfig: (value: QsLegendConfig) => void
  }
  linear: {
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
  plotted: {
    lineConfig: (value: QsPlottedLineConfig) => void
    pointsConfig: (value: QsPlottedPointsConfig) => void
    textConfig: (value: QsPlottedTextConfig) => void
  }
  radialArc: {
    arcConfig: (value: QsRadialConfig) => void
    textConfigRotated: (value: QsRadialTextConfig) => void
    textConfigHorizontal: (value: QsRadialTextConfig) => void
    textConfigSpoke: (value: QsRadialTextConfig) => void
    textConfigFollow: (value: QsRadialTextConfig) => void
  }
  radialCentroid: {
    areaConfig: (value: QsRadialAreaConfig) => void
    axisConfig: (value: QsRadialAxisConfig) => void
    lineConfig: (value: QsRadialLineConfig) => void
    pointsConfig: (value: QsRadialPointsConfig) => void
    spokesConfig: (value: QsRadialSpokesConfig) => void
  }
}

export class ConfigStoreManager {
  private store: ConfigStore

  constructor() {
    this.store = {
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
  }

  public get getters(): ConfigGetters {
    return {
      legend: {
        legendConfig: () => this.store.legendConfig,
      },
      linear: {
        areaConfig: () => this.store.linearAreaConfig,
        axisConfigTop: () => this.store.linearAxisConfigTop,
        axisConfigBottom: () => this.store.linearAxisConfigBottom,
        axisConfigLeft: () => this.store.linearAxisConfigLeft,
        axisConfigRight: () => this.store.linearAxisConfigRight,
        barConfig: () => this.store.linearBarConfig,
        barGroupConfig: () => this.store.linearBarGroupConfig,
        barStackConfig: () => this.store.linearBarStackConfig,
        lineConfig: () => this.store.linearLineConfig,
        pointsConfig: () => this.store.linearPointsConfig,
        textConfig: () => this.store.linearTextConfig,
      },
      plotted: {
        lineConfig: () => this.store.plottedLineConfig,
        pointsConfig: () => this.store.plottedPointsConfig,
        textConfig: () => this.store.plottedTextConfig,
      },
      radialArc: {
        arcConfig: () => this.store.radialArcConfig,
        textConfigRotated: () => this.store.radialArcTextConfigRotated,
        textConfigHorizontal: () => this.store.radialArcTextConfigHorizontal,
        textConfigSpoke: () => this.store.radialArcTextConfigSpoke,
        textConfigFollow: () => this.store.radialArcTextConfigFollow,
      },
      radialCentroid: {
        areaConfig: () => this.store.radialCentroidAreaConfig,
        axisConfig: () => this.store.radialCentroidAxisConfig,
        lineConfig: () => this.store.radialCentroidLineConfig,
        pointsConfig: () => this.store.radialCentroidPointsConfig,
        spokesConfig: () => this.store.radialCentroidSpokesConfig,
      },
    }
  }

  public get setters(): ConfigSetters {
    return {
      legend: {
        legendConfig: (value: QsLegendConfig) => {
          this.store.legendConfig = value
        },
      },
      linear: {
        areaConfig: (value: QsAreaConfig) => {
          this.store.linearAreaConfig = value
        },
        axisConfigTop: (value: QsAxisConfig) => {
          this.store.linearAxisConfigTop = value
        },
        axisConfigBottom: (value: QsAxisConfig) => {
          this.store.linearAxisConfigBottom = value
        },
        axisConfigLeft: (value: QsAxisConfig) => {
          this.store.linearAxisConfigLeft = value
        },
        axisConfigRight: (value: QsAxisConfig) => {
          this.store.linearAxisConfigRight = value
        },
        barConfig: (value: QsBarConfig) => {
          this.store.linearBarConfig = value
        },
        barGroupConfig: (value: QsBarGroupConfig) => {
          this.store.linearBarGroupConfig = value
        },
        barStackConfig: (value: QsBarStackedConfig) => {
          this.store.linearBarStackConfig = value
        },
        lineConfig: (value: QsLineConfig) => {
          this.store.linearLineConfig = value
        },
        pointsConfig: (value: QsPointsConfig) => {
          this.store.linearPointsConfig = value
        },
        textConfig: (value: QsTextConfig) => {
          this.store.linearTextConfig = value
        },
      },
      plotted: {
        lineConfig: (value: QsPlottedLineConfig) => {
          this.store.plottedLineConfig = value
        },
        pointsConfig: (value: QsPlottedPointsConfig) => {
          this.store.plottedPointsConfig = value
        },
        textConfig: (value: QsPlottedTextConfig) => {
          this.store.plottedTextConfig = value
        },
      },
      radialArc: {
        arcConfig: (value: QsRadialConfig) => {
          this.store.radialArcConfig = value
        },
        textConfigRotated: (value: QsRadialTextConfig) => {
          this.store.radialArcTextConfigRotated = value
        },
        textConfigHorizontal: (value: QsRadialTextConfig) => {
          this.store.radialArcTextConfigHorizontal = value
        },
        textConfigSpoke: (value: QsRadialTextConfig) => {
          this.store.radialArcTextConfigSpoke = value
        },
        textConfigFollow: (value: QsRadialTextConfig) => {
          this.store.radialArcTextConfigFollow = value
        },
      },
      radialCentroid: {
        areaConfig: (value: QsRadialAreaConfig) => {
          this.store.radialCentroidAreaConfig = value
        },
        axisConfig: (value: QsRadialAxisConfig) => {
          this.store.radialCentroidAxisConfig = value
        },
        lineConfig: (value: QsRadialLineConfig) => {
          this.store.radialCentroidLineConfig = value
        },
        pointsConfig: (value: QsRadialPointsConfig) => {
          this.store.radialCentroidPointsConfig = value
        },
        spokesConfig: (value: QsRadialSpokesConfig) => {
          this.store.radialCentroidSpokesConfig = value
        },
      },
    }
  }
}
