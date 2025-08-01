import { QsLegendConfig } from '../../unbound/legend/qsTypes'
import { QsAreaConfig } from '../../orthogonal/orthogonalArea/qsTypes'
import { QsAxisConfig } from '../../orthogonal/orthogonalAxis/qsTypes'
import { QsBarConfig } from '../../orthogonal/orthogonalBar/qsTypes'
import { QsBarGroupConfig } from '../../orthogonal/orthogonalBarGroup/qsTypes'
import { QsBarStackedConfig } from '../../orthogonal/orthogonalBarStack/qsTypes'
import { QsLineConfig } from '../../orthogonal/orthogonalLine/qsTypes'
import { QsPointsConfig } from '../../orthogonal/orthogonalPoints/qsTypes'
import { QsTextConfig } from '../../orthogonal/orthogonalText/qsTypes'
import { QsPlottedLineConfig } from '../../plots/plottedLine/qsTypes'
import { QsPlottedPointsConfig } from '../../plots/plottedPoints/qsTypes'
import { QsPlottedTextConfig } from '../../plots/plottedText/qsTypes'
import { QsRadialArcConfig } from '../../radialArc/radialArc/qsTypes'
import { QsRadialArcTextConfig } from '../../radialArc/radialArcText/qsTypes'
import { QsRadialAreaConfig } from '../../radialCentroid/radialCentroidArea/qsTypes'
import { QsRadialAxisConfig } from '../../radialCentroid/radialCentroidAxis/qsTypes'
import { QsRadialLineConfig } from '../../radialCentroid/radialCentroidLine/qsTypes'
import { QsRadialPointsConfig } from '../../radialCentroid/radialCentroidPoints/qsTypes'
import { QsRadialSpokesConfig } from '../../radialCentroid/radialCentroidSpokes/qsTypes'
import { QsRadialTextConfig } from '../../radialCentroid/radialCentroidText/qsTypes'

export interface ConfigStore {
  legendConfig?: QsLegendConfig
  orthogonalAreaConfig?: QsAreaConfig
  orthogonalAxisConfigTop?: QsAxisConfig
  orthogonalAxisConfigBottom?: QsAxisConfig
  orthogonalAxisConfigLeft?: QsAxisConfig
  orthogonalAxisConfigRight?: QsAxisConfig
  orthogonalBarConfig?: QsBarConfig
  orthogonalBarGroupConfig?: QsBarGroupConfig
  orthogonalBarStackConfig?: QsBarStackedConfig
  orthogonalLineConfig?: QsLineConfig
  orthogonalPointsConfig?: QsPointsConfig
  orthogonalTextConfig?: QsTextConfig
  plottedLineConfig?: QsPlottedLineConfig
  plottedPointsConfig?: QsPlottedPointsConfig
  plottedTextConfig?: QsPlottedTextConfig
  radialArcConfig?: QsRadialArcConfig
  radialArcTextConfigRotated?: QsRadialArcTextConfig
  radialArcTextConfigHorizontal?: QsRadialArcTextConfig
  radialArcTextConfigSpoke?: QsRadialArcTextConfig
  radialArcTextConfigFollow?: QsRadialArcTextConfig
  radialCentroidAreaConfig?: QsRadialAreaConfig
  radialCentroidAxisConfig?: QsRadialAxisConfig
  radialCentroidLineConfig?: QsRadialLineConfig
  radialCentroidPointsConfig?: QsRadialPointsConfig
  radialCentroidSpokesConfig?: QsRadialSpokesConfig
  radialCentroidTextConfig?: QsRadialTextConfig
}

export interface ConfigGetters {
  legend: {
    legendConfig: () => QsLegendConfig | undefined
  }
  orthogonal: {
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
    arcConfig: () => QsRadialArcConfig | undefined
    textConfigRotated: () => QsRadialArcTextConfig | undefined
    textConfigHorizontal: () => QsRadialArcTextConfig | undefined
    textConfigSpoke: () => QsRadialArcTextConfig | undefined
    textConfigFollow: () => QsRadialArcTextConfig | undefined
  }
  radialCentroid: {
    areaConfig: () => QsRadialAreaConfig | undefined
    axisConfig: () => QsRadialAxisConfig | undefined
    lineConfig: () => QsRadialLineConfig | undefined
    pointsConfig: () => QsRadialPointsConfig | undefined
    spokesConfig: () => QsRadialSpokesConfig | undefined
    textConfig: () => QsRadialTextConfig | undefined
  }
}

export interface ConfigSetters {
  legend: {
    legendConfig: (value: QsLegendConfig) => void
  }
  orthogonal: {
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
    arcConfig: (value: QsRadialArcConfig) => void
    textConfigRotated: (value: QsRadialArcTextConfig) => void
    textConfigHorizontal: (value: QsRadialArcTextConfig) => void
    textConfigSpoke: (value: QsRadialArcTextConfig) => void
    textConfigFollow: (value: QsRadialArcTextConfig) => void
  }
  radialCentroid: {
    areaConfig: (value: QsRadialAreaConfig) => void
    axisConfig: (value: QsRadialAxisConfig) => void
    lineConfig: (value: QsRadialLineConfig) => void
    pointsConfig: (value: QsRadialPointsConfig) => void
    spokesConfig: (value: QsRadialSpokesConfig) => void
    textConfig: (value: QsRadialTextConfig) => void
  }
}

export class ConfigStoreManager {
  private store: ConfigStore

  constructor() {
    this.store = {
      legendConfig: undefined,
      orthogonalAreaConfig: undefined,
      orthogonalAxisConfigTop: undefined,
      orthogonalAxisConfigBottom: undefined,
      orthogonalAxisConfigLeft: undefined,
      orthogonalAxisConfigRight: undefined,
      orthogonalBarConfig: undefined,
      orthogonalBarGroupConfig: undefined,
      orthogonalBarStackConfig: undefined,
      orthogonalLineConfig: undefined,
      orthogonalPointsConfig: undefined,
      orthogonalTextConfig: undefined,
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
      radialCentroidTextConfig: undefined,
    }
  }

  public get getters(): ConfigGetters {
    return {
      legend: {
        legendConfig: () => this.store.legendConfig,
      },
      orthogonal: {
        areaConfig: () => this.store.orthogonalAreaConfig,
        axisConfigTop: () => this.store.orthogonalAxisConfigTop,
        axisConfigBottom: () => this.store.orthogonalAxisConfigBottom,
        axisConfigLeft: () => this.store.orthogonalAxisConfigLeft,
        axisConfigRight: () => this.store.orthogonalAxisConfigRight,
        barConfig: () => this.store.orthogonalBarConfig,
        barGroupConfig: () => this.store.orthogonalBarGroupConfig,
        barStackConfig: () => this.store.orthogonalBarStackConfig,
        lineConfig: () => this.store.orthogonalLineConfig,
        pointsConfig: () => this.store.orthogonalPointsConfig,
        textConfig: () => this.store.orthogonalTextConfig,
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
        textConfig: () => this.store.radialCentroidTextConfig,
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
      orthogonal: {
        areaConfig: (value: QsAreaConfig) => {
          this.store.orthogonalAreaConfig = value
        },
        axisConfigTop: (value: QsAxisConfig) => {
          this.store.orthogonalAxisConfigTop = value
        },
        axisConfigBottom: (value: QsAxisConfig) => {
          this.store.orthogonalAxisConfigBottom = value
        },
        axisConfigLeft: (value: QsAxisConfig) => {
          this.store.orthogonalAxisConfigLeft = value
        },
        axisConfigRight: (value: QsAxisConfig) => {
          this.store.orthogonalAxisConfigRight = value
        },
        barConfig: (value: QsBarConfig) => {
          this.store.orthogonalBarConfig = value
        },
        barGroupConfig: (value: QsBarGroupConfig) => {
          this.store.orthogonalBarGroupConfig = value
        },
        barStackConfig: (value: QsBarStackedConfig) => {
          this.store.orthogonalBarStackConfig = value
        },
        lineConfig: (value: QsLineConfig) => {
          this.store.orthogonalLineConfig = value
        },
        pointsConfig: (value: QsPointsConfig) => {
          this.store.orthogonalPointsConfig = value
        },
        textConfig: (value: QsTextConfig) => {
          this.store.orthogonalTextConfig = value
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
        arcConfig: (value: QsRadialArcConfig) => {
          this.store.radialArcConfig = value
        },
        textConfigRotated: (value: QsRadialArcTextConfig) => {
          this.store.radialArcTextConfigRotated = value
        },
        textConfigHorizontal: (value: QsRadialArcTextConfig) => {
          this.store.radialArcTextConfigHorizontal = value
        },
        textConfigSpoke: (value: QsRadialArcTextConfig) => {
          this.store.radialArcTextConfigSpoke = value
        },
        textConfigFollow: (value: QsRadialArcTextConfig) => {
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
        textConfig: (value: QsRadialTextConfig) => {
          this.store.radialCentroidTextConfig = value
        },
      },
    }
  }
}
